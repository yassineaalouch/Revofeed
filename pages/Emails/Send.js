import Emails from '../Emails';
import { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    if (!session || session.user.role !== 'admin') {
      return {
        redirect: {
          destination: '/Login',
          permanent: false,
        },
      };
    }
  
    return {
      props: { session },
    };
  }

export default function Send() {
  const router = useRouter();
  const { Email, Subject } = router.query;
  const ReplaySubject = "Replay to your email: "+Subject
  const [subject, setSubject] = useState(Subject? ReplaySubject :'');
  const [destination, setDestination] = useState(Email||'');
  const [message, setMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [forAllOrNO,setForAllOrNO]= useState('')

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked)
  };
  async function getuser(){
    const users = await axios.get('/api/UserHandler')
      const userEmailsList = users.data.map(user => user.email);
      const yassine = {subject, toEmail:userEmailsList.join(', '), message };
      console.log(yassine)
  }
  if(isChecked){ 
    getuser()
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i;
    if(!isChecked){
        
        if(emailRegex.test(destination)){
          const data = { subject, toEmail: destination, message, forAllOrNO:"form some users"};
            try {
          await axios.post('/api/emailHandler', data);
          setSubject('');
          setDestination('');
          setMessage('');
          } catch (error) {
          console.error('Error sending email:', error.response?.data || error.message);
          alert('Failed to send email');
          }
        }
  
    }else{
      const users = await axios.get('/api/UserHandler')
      const userEmailsList = users.data.map(user => user.email);
      const data = {subject, toEmail:userEmailsList.join(', '), message, forAllOrNO:"to all users" };
      await axios.post('/api/emailHandler', data);
          setIsChecked(false)
          setSubject('');
          setDestination('');
          setMessage('');
    }}
  return (
    <Emails>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            id="name"
            name="name"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <div className="flex items-center">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mr-5">Destination</label>
                <div className="flex gap-1 text-xs text-gray-500">
                    (<input onChange={handleCheckboxChange} checked={isChecked} type='checkbox'></input>
                    <label>Send to all users</label>)
                </div>
          </div>
        {!isChecked?  
          <input
            type="text"
            id="email"
            name="email"
            value={destination} 
            onChange={(e) => setDestination(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            required
          />:<input
            type="email"
            id="email"
            name="email"
            value={"send to all users"}
            disabled  
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-slate-400"
            required
          />}

        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Envoyer
        </button>
      </form>
    </Emails>
  );
  
}
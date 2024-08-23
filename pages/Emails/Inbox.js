import axios from "axios";
import Emails from "../Emails";
import { useEffect, useState } from "react";
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

export default function Inbox(props){
    const [emailsList ,setEmailsList]= useState([])
    const [isShow ,setIsShow]= useState('')
    const router = useRouter();
    const emailsToRead = emailsList.filter(email => !email.isChecked).length;

    useEffect(() => {
        getEmails() 
    },[]);

    async function getEmails(){
        await axios.get('/api/usersEmailsHandler').then(result=>{
            const list =result.data
            setEmailsList(list.reverse())
        });
        
    }

    async function deleteEmail(email) {
        try {
          await axios.delete(`/api/usersEmailsHandler`, { data: { id: email._id } });
          getEmails();
        } catch (error) {
          console.error('Error deleting email:', error);
        }
      }
     function replayEmail(email){
        router.push({
        pathname: './Send',
        query: { Email:email.email , Subject : email.subject }
        });
      }

    async function showEmail(email){
        setIsShow(email._id)
        getEmails();
        await axios.put(`/api/usersEmailsHandler`, { id: email._id})
    }

    function hideEmail(){
        setIsShow('')
        getEmails() 
    }

    return <Emails >
        <div>
        <table className="basic max-w-4xl">
                <thead>
                    <tr>
                        <td >
                            <div className="flex justify-between items-center">
                                <b className="px-2">Emails received from users</b> 
                                {emailsToRead!=0 &&<div className="mr-6 min-h-5 min-w-5 bg-red-500 rounded-full flex justify-center items-center text-sm  font-bold text-white">{emailsToRead}</div>}
                            </div>
                        </td>
                    </tr>
                </thead>
                

                    {emailsList.length > 0 && emailsList.sort().map(email=> (
                        <div key={email.createdAt}>
                        <div  className=" shadow-md mb-2 flex items-center justify-between ">
                            <div className="max-h-12 overflow-y-hidden flex justify-between px-9 w-full" >
                                <a className="cursor-pointer " title={email.subject}>
                                {email.subject}
                                </a>
                                <a className="cursor-pointer items-center hidden md:flex" title="The date and time when the email was received">
                                    <div>
                                            {new Date(email.createdAt).toLocaleString('en-US', {
                                            year:'numeric', 
                                            month: 'long',
                                            weekday: 'long',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour24: true 
                                    })}
                                    </div>
                                    {!email.isChecked &&
                                        <div  className="h-5 w-5 ml-3 rounded-full bg-red-500">
                                        </div>
                                    }

                               </a>
                               <a className="cursor-pointer flex items-center md:hidden" title="The date and time when the email was received">
                                    <div>
                                        {new Date(email.createdAt).toLocaleString('en-US', {
                                            year: '2-digit', // ou 'numeric' pour l'année complète
                                            month: 'short', // 'numeric' pour le mois sous forme de nombre, 'short' pour abréger
                                            day: 'numeric'
                                        })}
                                    </div>
                                    {!email.isChecked &&
                                        <div  className="h-5 w-5 ml-3 rounded-full bg-red-500">
                                        </div>
                                    }
                                    
                               </a>
                            </div>
                            <div className="flex-col items-center">
                            {isShow!==email._id?
                                // <a title={isShow!==email._id? "show email content" : "hide email content"}>
                                    
                                            <svg onClick={()=>showEmail(email)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-slate-400 hover:text-slate-900">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                    
                                // </a>
                               :
                                
                                            <svg onClick={hideEmail} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-slate-400 hover:text-slate-900">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                    
                            }
                                
                                <svg onClick={()=>deleteEmail(email)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-slate-400 hover:text-red-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>

                                <svg onClick={()=>replayEmail(email)}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-slate-400 hover:text-green-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                </svg>


                            </div>
                        </div>
                        {isShow===email._id&&
                            <div className="bg-slate-50 overflow-auto shadow-md mb-4 flex-col w-full max-h-72 min-h-40">
                                    <div ><b className="mr-2">Subject:</b>{email.subject}</div> 
                                    <div>
                                        <b className="mr-2">Received at:</b>
                                        {new Date(email.createdAt).toLocaleString('en-US', {
                                            year:'numeric', 
                                            month: 'long',
                                            weekday: 'long',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour24: true 
                                        })}
                                    </div>                                    
                                    <div ><b className="mr-2">from:</b>{email.email}</div> 
                                    <div ><b className="mr-2">phone_number:</b>{email.phone_number}</div> 
                                    <div ><b className="mr-2">company_name:</b>{email.company_name}</div> 
                                    <div ><b className="mr-2 block">message:</b>{email.message}</div>
                            </div>
                        }
                        </div>
                    ))}
                
            </table>
        </div>

    </Emails>
}
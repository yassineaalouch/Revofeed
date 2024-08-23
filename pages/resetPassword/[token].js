import {useEffect, useState } from 'react';
import axios from 'axios';
import { getSession } from "next-auth/react";
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
    const session = await getSession(context);
    
    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  
    return {
      props: { session },
    };
  }


  
export default function SetPassword() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [verified, setVerified] = useState(false)
  const router = useRouter();
  const {token} = router.query;

  useEffect(()=>{
    const verifyToken = async () => {
        try {
            const response = await axios.post('/api/route', { token});
            setMessage('Password works');
            const userData = response.data;
            setVerified(true)
            setUser(userData)
            setError('');
          } catch (error) {
            setError(error.response?.data?.message || 'Failed to change password');
            setMessage('');
            setVerified(false)
          }
    }
    verifyToken()
  },[token])


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password) {
      setError('password is required.');
      return;
    }

    try {
      const response = await axios.post('/api/resetPassword', { password,email:user?.email });
      setMessage('Password has changed');
      setError('');
      router.push('/Login')
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to change password');
      setMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Reset Your Password</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
        <form className='mb-1' onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Enter new password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={error.length >0}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Reset Password 
          </button>
        </form>

      </div>
    </div>
  );
}

import { useState } from 'react';
import axios from 'axios';
import { getSession } from "next-auth/react";
import Link from 'next/link';

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


  
export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setError('Email is required.');
      return;
    }

    try {
      const response = await axios.post('/api/request-reset-password', { email });
      setMessage('Password reset link sent to your email address.');
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send password reset link.');
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Send Password Reset Link
          </button>
        </form>
        <Link className='text-xs' href={'/Login'}>
            Back to login page
        </Link>
      </div>
    </div>
  );
}

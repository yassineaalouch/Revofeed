import Link from 'next/link';
import React from 'react';

function Error({ statusCode }) {
  return (
    <div className="flex h-screen items-center justify-center bg-yellow-500">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white">{statusCode}</h1>
        <h2 className="mt-4 text-2xl text-white">
          {statusCode === 404
            ? 'Page Not Found'
            : 'Something went wrong on our end.'}
        </h2>
        <p className="mt-2 text-lg text-white">
          {statusCode === 500
            ? 'An internal server error occurred.'
            : 'Please check the URL and try again.'}
        </p>
        <Link 
          href="/" 
          className="mt-6 inline-block rounded-md bg-white px-4 py-2 text-yellow-500 font-semibold hover:bg-yellow-600 hover:text-white transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

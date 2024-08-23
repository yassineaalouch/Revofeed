// pages/auth/error.js
import Footer from '@/interfaceComponents/Footer';
import NavBarInterface from '@/interfaceComponents/Nav-bar-interface';
import { useRouter } from 'next/router';

export default function Error() {
  const router = useRouter();
  const { error } = router.query;

  let errorMessage = '';

  switch (error) {
    case 'CredentialsSignin':
      errorMessage = 'Invalid credentials, please try again.';
      break;
    case 'OAuthSignin':
      errorMessage = 'There was an error trying to sign in with the provider.';
      break;
    case 'OAuthCallback':
      errorMessage = 'There was an error during the callback of the OAuth provider.';
      break;
    case 'OAuthCreateAccount':
      errorMessage = 'There was an error creating the account with the OAuth provider.';
      break;
    case 'EmailCreateAccount':
      errorMessage = 'There was an error creating the account with your email.';
      break;
    case 'Callback':
      errorMessage = 'There was an error during the callback.';
      break;
    case 'OAuthAccountNotLinked':
      errorMessage = 'Please use the same sign-in method as when you first signed up.';
      break;
    case 'EmailSignin':
      errorMessage = 'There was an error sending the email.';
      break;
    case 'Default':
      errorMessage = 'There was an error, please try again.';
      break;
    default:
      errorMessage = 'An unknown error occurred, please try again.';
  }

  return (
    <>
    <NavBarInterface/>
    <div className="flex items-center justify-center min-h-screen bg-yellow-500">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-4">Sign In Error</h1>
        <p className="mb-4">{errorMessage}</p>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          onClick={() => router.push('/Login')}
        >
          Go back to sign in
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
}

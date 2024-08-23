import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import NavBarInterface from '@/interfaceComponents/Nav-bar-interface';
import Footer from '@/interfaceComponents/Footer';
import Loginform from '@/components/loginform';

export default function LoginForm({ children }) {
  const router = useRouter();
  // const { error } = router.query;
  const { data: session } = useSession();
  // const [registrationSwitch, setRegistrationSwitch] = useState(false);
  // const [emailExist, setEmailExist] = useState(false);
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [noUser, setNoUser] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  // const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i;

  // function switchToRegistrationLoginForm(el) {
  //   setRegistrationSwitch(el);
  //   setName('');
  //   setEmail('');
  //   setPassword('');
  //   setNoUser(false)
  // }



  // async function signInFunction(ev) {
  //   ev.preventDefault();
  //   const result = await signIn('credentials', {redirect:false,email, password});
  //   if (result.error) {
  //     setNoUser(true)
  //     setErrorMessage(result.error);
  //   } 
  //   else {
  //   setNoUser(false)
  //   }
  //   router.push('/account')
  // }

  // async function registerFunction(ev) {
  //   ev.preventDefault()
  //   const dataUser = { name, email, password };

  //   try {
  //     const response = await axios.get('/api/UserHandler', { params: { email } });

  //     if (response.data) {
  //       setEmailExist(true);
  //     } else {
  //       setEmailExist(false);
  //       await axios.post('/api/UserHandler', dataUser);
  //       setRegistrationSwitch(false); // Redirection après enregistrement réussi
  //     }
  //   } catch (error) {
  //     console.error('Error during registration:', error);
  //     setEmailExist(false); // Réinitialiser si une erreur se produit
  //   }
  // }

  if (!session) {
    return (
      <>
      <Loginform/>
      {/* <NavBarInterface/>
      <div className="bg-yellow-500 w-screen h-screen flex justify-center items-center">
        <div className="w-96 px-6 pt-6 pb-2 shadow-lg bg-white rounded-md">
          <h1 className="mb-2 text-3xl text-yellow-500 font-semibold text-center">
            {registrationSwitch ? 'Create Account' : 'Login'}
          </h1>
          {error && (
            <p style={{ color: 'red' }}>
              {error === 'OAuthAccountNotLinked'
                ? "Votre compte n'est pas lié."
                : 'Vous n’êtes pas autorisé à vous connecter.'}
            </p>
          )}
          <hr className="mb-5" />
          <div className="pl-3 pr-3">
            <form onSubmit={registrationSwitch ? registerFunction : signInFunction}>
              {registrationSwitch && (
                <>
                  <label htmlFor="name" className="block text-base mb-1">name</label>
                  <input
                    required
                    type="text"
                    id="namme"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-black rounded-md p-2 w-full"
                  />
                </>
              )}

              <label htmlFor="email" className="block text-base mb-1 mt-3">Email</label>
              <input
                required
                type="email"
                id="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-black rounded-md p-2 w-full"
              />
              {emailExist && registrationSwitch && (
                <div>
                  <span className='text-red-500 text-xs'>Cet email est déjà utilisé</span>
                </div>
              )}
              {noUser&&!registrationSwitch&&
                <div>
                  <span className='text-red-500 text-xs'>{errorMessage}</span>
                </div>
              }

              <label htmlFor="password" className="block text-base mb-1 mt-3">Password</label>
              <input
                required
                type="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-black rounded-md p-2 w-full"
              />
              <br />
              {
              // !
              registrationSwitch&&
              //  ? (
              //   <div className="block">
              //     <input type="checkbox" className="mr-2" />
              //     <label className="text-xs">Remember me.</label>
              //   </div>
              // ) : (
                <div className="block">
                  <input id='terms' required type="checkbox" className="mr-2" />
                  <label htmlFor='terms' className="text-xs">
                    I agree all{' '}
                    <Link href={'/conditions'} target="_blank" className="w-fit">
                      <span className="text-xs text-blue-500 mt-0 font-bold">terms and conditions.</span>
                    </Link>
                  </label>
                </div>
              // )
              }
              <div className="w-full text-center">
                <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 py-1 px-3 rounded-md text-black font-medium shadow-md mt-3 mb-2 w-2/5">Send</button>
              </div>
            </form>

            <div className="w-full text-center">
              <div className="w-full flex flex-col items-center">
                {!registrationSwitch && (
                  <Link href={emailRegex.test(email)?`/passwordReset?email=${email}`:'/login'} 
                    className="block p-0 mb-0 w-fit text-blue-500 text-sm">
                    <>I forgot the password</>
                  </Link>
                )}
                {!registrationSwitch && (
                  <button onClick={() => switchToRegistrationLoginForm(true)} className="block w-fit">
                    <span className="text-xs text-blue-500 mt-0 font-bold">Create account</span>
                  </button>
                )}
                {registrationSwitch && (
                  <button onClick={() => switchToRegistrationLoginForm(false)} className="block w-fit">
                    <span className="text-xs text-blue-500 mt-0 font-bold">Back to login</span>
                  </button>
                )}
              </div>
            </div>
            <hr />
            <div className="w-full flex justify-between px-11">
              <button className="bg-white border hover:bg-gray-200 border-black p-2 px-4 rounded-lg mt-3" onClick={() => signIn('google')}>
                Google
              </button>
              <button className="bg-white border hover:bg-gray-200 border-black p-2 px-4 rounded-lg mt-3" onClick={() => signIn('facebook')}>
                Facebook
              </button>
            </div>
            <br />
          </div>
        </div>
      </div>
      <Footer className="!mt-0"/> */}
      </>
    );
  }else if(session && session.user.role==='admin'){
  router.push('/dashbordAdmine')
  }else if(session && session.user.role==='user'){
  router.push('/account')
  }
  
  // return (

  //   <div className="bg-green-500 min-h-screen flex">
  //     <Nav />
  //         <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
  //             {children}
  //         </div>
  //   </div>
  // );
}


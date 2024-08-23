import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loginform from '@/components/loginform';

export default function LoginForm({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user.role === 'admin') {
        router.push('/dashbordAdmine');
      } else if (session.user.role === 'user') {
        router.push('/account');
      }
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    // Eviter de rendre quelque chose si on redirige
    return null;
  }

  return (
    <>
      <Loginform />
    </>
  );
}

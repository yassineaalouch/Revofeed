import Layout from "../components/Layout";
import { signOut, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import Image from "next/image";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log("Session:", session);

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

export default function Dashboard() {
  const {data:session}=useSession()
  if (!session) {
    // Handle the case where session is undefined
    return <p>Loading...</p>;
  }
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-full overflow-hidden">
          {session?.user?.image && (
            <Image src={session?.user?.image} width={50} height={50} alt="" className="rounded-full w-6 h-6" />
          )}
          <span className="pl-2">{session?.user?.name}</span>
          <button onClick={() => signOut({ callbackUrl: '/' })}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
            </svg>
          </button>
        </div>
      </div>
    </Layout>
  );
}


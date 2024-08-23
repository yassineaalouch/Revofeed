import Footer from "@/interfaceComponents/Footer";
import NavBarInterface from "@/interfaceComponents/Nav-bar-interface";
import SideBarUserAccount from "@/interfaceComponents/sideBarUserAcount";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signOut } from 'next-auth/react';
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    if (!session || session.user.role !== 'user') {
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

export default function UserAccount({ children }) {
  const { data: session } = useSession();

  return (
    <>
      <NavBarInterface />
      <div className="min-h-screen block md:flex justify-start pr-2 pb-2 mt-14">
        <div className="px-4 h-auto mb-10">
          <SideBarUserAccount/>
        </div>
        <div className="flex-grow  bg-white border-2">
          <div className="border-b pt-6 px-6 flex justify-between">
            <h1 className="">Hi ,{session?.user?.name}</h1>
           
            <button className="flex gap-1 hover:text-yellow-900" onClick={() => signOut({ callbackUrl: '/' })}>
              logout
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
              </svg>
            </button>
          </div>
          <div className="mt-2 p-6  w-fu">
              {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

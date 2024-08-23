"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Nav from "./Nav";

  
export default function Layout({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/Login');
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated" && session.user.role !== 'admin') {
    router.push('/Login');
    return null;
  }
    return (
          <div className=" bg-green-500 min-h-screen flex">
          <Nav/> {/*le menu dans le gauche dans le admine dashbord */}
          <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
              {children}{/*cette element doit se changer a chaque fois on clique sur un element dans le menu dans le dashbord : c'est lelement ou s'affiche le info ... */}
          </div>
          
         </div>
    );
}
//Revofeed123
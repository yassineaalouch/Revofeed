import Layout from "@/components/Layout";
import SettingsNavBar from "@/components/SettingsNavBar";
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

export default function Setting({children}){
    const navList = [
        { url: '/Settings/home', titre: 'Home' },
        { url: '/about', titre: 'About' },
        { url: '/contact', titre: 'Contact' }
    ];
    return(
        <Layout>
            <SettingsNavBar list={navList}/>
            <div className=" flex-grow mt-10">
                {children}          
            </div>
            </Layout>
    );
}
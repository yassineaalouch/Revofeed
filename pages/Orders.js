import Layout from "@/components/Layout";
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
export default function Orders(){
    return(
        <Layout>
            hi I am Order page nice to meet you
        </Layout>
    );
}
  
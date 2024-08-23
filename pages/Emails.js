import Layout from "@/components/Layout";
import Sub_bar from "@/components/Sub-bar";
import Send from "./Emails/Send";
import { useState ,useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";

export default function Emails({children}){
    const [emailsList ,setEmailsList]= useState([])
    useEffect(() => {
        getEmails() 
    },[children]);


    async function getEmails(){
        await axios.get('/api/usersEmailsHandler').then(result=>{
            const list =result.data
            setEmailsList(list.reverse())
        });
        
    }
    const emailsToRead = emailsList.filter(email => !email.isChecked).length;
    return(
        <Layout>
            <div>
                <Sub_bar emailsToRead={emailsToRead}/>
                <div className=" flex-grow mt-10">
                    {children ? children:<Send></Send>}          
                </div>
            </div>
        </Layout>
    )
}
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
  

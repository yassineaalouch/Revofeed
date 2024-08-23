import { useState } from "react";
import Layout from "../../components/Layout";
import ProductForm from "@/components/ProductForm";
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

export default function NewProduct(){
    

    return (
    <Layout>
        <h1 className="this">Add product</h1>
        <ProductForm />
    </Layout>
    );
}
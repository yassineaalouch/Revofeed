import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
export default function EditProductPage(){
    const [productInfo,setProductInfo]= useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/api/products?id='+id)
        .then(response=>{
            setProductInfo(response.data)
        });
    },[id])
    return(
        <Layout>
            <h1 className="this">edit product</h1>
            {productInfo && (<ProductForm {...productInfo}/>)}
            {/* {isLoading && <p className>Veuillez patienter...</p>} */}  {/*sert a afficher un message durant le loading */}
        </Layout>
    );
}
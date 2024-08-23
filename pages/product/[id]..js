import { useState,useEffect } from 'react';
import Footer from '@/interfaceComponents/Footer';
import NavBarInterface from '@/interfaceComponents/Nav-bar-interface';
import Image from 'next/image';
import CommentBlock from '@/components/Commentaire';
import Etoiles from '../../components/rating';
import RatingSummaryCard from '@/components/RatingSummaryCard ';
import axios from 'axios';
import { getSession } from "next-auth/react";
import Link from 'next/link';
import { Product } from '@/models/Product';
import mongooseConnect from "@/lib/mongoose";

export async function getServerSideProps(context) {
    const session = await getSession(context);
    await mongooseConnect();

    const { id } = context.params;
    const product = await Product.findById(id).lean();

    if (session?.user?.id){
      return {
        props: {
          Session: JSON.parse(JSON.stringify(session)),
          product: JSON.parse(JSON.stringify(product)),
        }
      };
    }else{
      return {
        props: {
          product: JSON.parse(JSON.stringify(product)),
        }
    }
}}


export default function ProductPage({Session,product}) {
  const [mainImage, setMainImage] = useState(product?.images[0]||"/No_Image_Available.jpg");

  const ImageChange = (src) => {
    setMainImage(src);
  };

  const [cursor,setCursor] = useState(5)
  const [message,setMessage] = useState('')
  const [commentsList,setCommentsList] = useState([])
  const [update, setUpdate] = useState(false);
  const [dejaRating,setDejaRating] = useState (false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [ratingList,setRatingList] = useState({})
  const [totalRating,setTotalRating] = useState({})
  const [listOfRatingCarts,setListOfRatingCarts] = useState([])
  const [customerReview,setCustomerReview] = useState('')



  useEffect(()=>{
    fetchData()
  },[update])
 
  async function fetchData() {
    try {
      const [commentsResponse, ratingResponse,ratingCarts] = await Promise.all([
        axios.get('/api/comment', { params: { id:product?._id} }),
        axios.get('/api/rating', { params: { id:product?._id} }),
        axios.get('/api/rating', { params: { id:product?._id,limit:20} })
      ]);
      setListOfRatingCarts(ratingCarts)
      setCommentsList(commentsResponse.data);
      setRatingList(ratingResponse.data);
      const totalRating = TotalRatingCalculator(ratingResponse.data);
      setTotalRating(totalRating);
    } catch (error) {
      console.error('Error fetching comments and ratings:', error);
    }
  }

  
  function TotalRatingCalculator(object) {
    const sommeRating = object.un * 1 + object.deux * 2 + object.trois * 3 + object.quatre * 4 + object.cinque * 5;
    const numberRating = object.un + object.deux + object.trois + object.quatre + object.cinque;
    if (numberRating === 0) {
        return { averageRating: 0, numberRating: 0 };
    }
    const averageRating = sommeRating / numberRating;
        return { averageRating, numberRating };
    }



  function updateFunction(){
    setUpdate(!update)
  }
  function cancel(){
    setUpdate(!update)
    setMessage('')
  }

  async function addComment(ev){
    ev.preventDefault()
    if (Session){
      const data = {
        name:Session?.user?.name,
        email:Session?.user?.email,
        productID:product?._id,
        comment: message
      }
      await axios.post('/api/comment',data)
      setMessage('')
      setUpdate(!update)
    }else{
      setShowLoginMessage(true)
      setTimeout(() => {
      setShowLoginMessage(false);
    }, 3000);
    }
  }



  async function sentStars (e) {
    e.preventDefault()
    if(Session){
      const response = await axios.get('/api/products',{params:{ id:product?._id,rating:'rating'}})
      let list = response.data.IdOfRatingUsers|| [];
      const data = {
          name:Session?.user?.name,
          email:Session?.user?.email,
          IdOfRatingUsers: [...list, Session.user?.id],
          rating: cursor,
          _id:product?._id,
          customerReview:customerReview
        }
      setDejaRating(true)
      if(list.includes(Session.user?.id)){
        await axios.put('/api/rating',data)
        setTimeout(() => {
          setDejaRating(false);
        }, 1000);
      }else{
        await axios.post('/api/rating',data)
        setTimeout(() => {
          setDejaRating(false);
        }, 1000);
      } 
      setUpdate(!update)
      setCustomerReview('')

    }
  }

  

  return (
    <>
      <NavBarInterface showLoginMessage={showLoginMessage}/>

      <div className="min-h-screen bg-gray-100 px-2 pt-6">
        <div className="mx-auto mt-8 bg-white p-6 shadow-md rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex place-content-center gap-2 ">
                <div className='md:relative place-content-start block'>
                    <div className='flex md:sticky md:top-16 items-center max-h-80 p-0 overflow-y-auto border-2 rounded-lg max-w-20 flex-col'>
                        {product?.images.map((src, index) => (
                        <div key={index} className="border-2  relative">
                            <Image
                            onClick={() => ImageChange(src)}
                            src={src}
                            alt={`Product image ${index + 1}`}
                            layout="responsive"
                            width={100}
                            height={100}
                            quality={10}
                            className="rounded-lg p-1 cursor-pointer"
                            />
                        </div>
                        ))}
                    </div>
                </div>
              <div className='md:relative w-full block '>
                <div className='md:sticky flex md:top-16  justify-center border-2 rounded-lg'>
                    <Image
                        src={mainImage}
                        alt={product?.title}
                        loading='lazy'
                        layout="responsive"
                        width={500}
                        height={500}
                        className=" rounded-lg"
                    />
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">{product?.title}</h1>
              <p className="text-xl font-bold text-yellow-500 mt-2">${product?.price}</p>
              <div className=" space-y-3">
                <div className="mt-4 flex items-center">
                  <div className="flex items-center">

                       <Etoiles number={totalRating.averageRating} />

                  </div>
                  <p className="text-gray-600 ml-2">({totalRating.numberRating} reviews)</p>
                </div>
                <p className="text-gray-600">{product?.description}</p>
              </div> 
                <div className="mt-8">
                  <div className="mt-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-700">Categories</h3>
                    <hr className='border-black mb-3 mt-1'></hr>
                    <div className='mb-6'>
                      <p className="text-gray-600">Here you can manage discounts. This section allows you to create and manage discount codes that can be applied to orders.</p>
                      <ul className="mt-2 list-disc list-inside">
                        <li>Create Discount Codes</li>
                        <li>Set Discount Amounts</li>
                        <li>Configure Expiration Dates</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4   rounded-lg ">
                    <h3 className="text-xl font-semibold text-gray-700">Discounts</h3>
                    <hr className='border-black mb-3 mt-1'></hr>
                    <div className='mb-6'>
                      <p className="text-gray-600">Here you can manage discounts. This section allows you to create and manage discount codes that can be applied to orders.</p>
                      <ul className="mt-2 list-disc list-inside">
                        <li>Create Discount Codes</li>
                        <li>Set Discount Amounts</li>
                        <li>Configure Expiration Dates</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4   rounded-lg ">
                    <h3 className="text-xl font-semibold text-gray-700">Discounts</h3>
                    <hr className='border-black mb-3 mt-1'></hr>
                    <div className='mb-6'>
                      <p className="text-gray-600">Here you can manage discounts. This section allows you to create and manage discount codes that can be applied to orders.</p>
                      <ul className="mt-2 list-disc list-inside">
                        <li>Create Discount Codes</li>
                        <li>Set Discount Amounts</li>
                        <li>Configure Expiration Dates</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 bg-gray-50   rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-700">Menu & Content</h3>
                    <p className="text-gray-600">Manage the menu and content sections of the application. This includes updating menu items and configuring content displayed on the pages.</p>
                    <ul className="mt-2 list-disc list-inside">
                      <li>Update Menu Items</li>
                      <li>Edit Page Content</li>
                      <li>Configure Navigation</li>
                    </ul>
                  </div>
                </div>
            </div>

          </div>
          <hr className='mt-6'/>

          <div className='grid md:grid-cols-2 gap-1 mt-6'>

              <div className='border-2 w-full border-gray-300 rounded-lg bg-white mx-auto px-6 pt-6 pb-1 shadow-lg max-w-md'>
                {!dejaRating?
                  <form onSubmit={(e)=>sentStars(e)}>
                      <h1 className='text-xl font-semibold text-gray-800'>Did you use our product before?</h1>
                      <p className='text-gray-600 text-sm'>Share your feedback. </p>
                      <div className=' pt-3 flex justify-center px-8'>
                        <textarea 
                          rows="3" 
                          value={customerReview}
                          required 
                          onChange={(e)=>setCustomerReview(e.target.value)} 
                          placeholder='Your feedback ....' 
                          className='bg-slate-100 resize-none rounded-md text-xs p-1 w-full'
                        />
                      </div>
                      <div className='mt-3 flex  justify-center gap-6 relative'>
                        
                        <div className='relative flex items-center'>
                          <Etoiles number={cursor} />
                          <input 
                            type="range" 
                            min="1" 
                            max="5" 
                            className='absolute inset-0 bg-slate-200 opacity-0 cursor-pointer' 
                            value={cursor} 
                            onChange={(e) => {
                              setCursor(e.target.value);
                            }}
                          />
                        </div>
                        
                      </div>
                      <button type='submit' className='mt-1 float-end text-yellow-500 border-2 border-yellow-500 rounded-lg px-2  hover:bg-yellow-500 hover:text-white duration-300'>
                        Send
                      </button>
                  </form>
                  :
                  <div >
                    <h2 className='text-2xl font-semibold text-green-600'>Thank You!</h2>
                    <p className='text-gray-800 text-lg mt-2'>We appreciate your feedback and your time.</p>
                    <p className='text-gray-600 text-sm mt-2'>
                      Your feedback is invaluable in our ongoing efforts to deliver high-quality products and exceptional service. 
                    </p>
                  </div>
                }
                
              </div>

              <div className=''>
                <RatingSummaryCard ratingList={ratingList}/>
              </div>
          </div>

          <hr className='mt-6 '/>
          {listOfRatingCarts?.data?.length > 0&&
          <div>
          <div className='mt-6 overflow-auto flex gap-5 bg-slate-100 p-3'>
          {listOfRatingCarts.data.length > 0 && listOfRatingCarts.data.map((ele)=>(

                    <div key={ele.email} className='border-2 h-full border-gray-300 rounded-lg bg-white mx-auto p-6 shadow-md w-80'>
                          <div className='flex flex-col'>  
                              <h1 className='text-xl flex justify-center font-semibold text-gray-800 mb-2'>{ele.name}</h1>
                              <div className='flex flex-col justify-center gap-2 items-center'>
                                <p>{ele.customerReview}</p>
                                <Etoiles number={ele.rating} />
                              </div>
                          </div>
                  </div>
          ))

          }
          </div>
          <hr className='mt-6'/>
          </div>
          }

          
          {product.comments?
          <div>
            <div className='bg-white p-4 rounded-lg shadow-sm mt-6'>
              <form onSubmit={(ev)=>addComment(ev)} className='flex items-start space-x-4'>

                    <div className='flex-grow'>
                        <textarea
                            className='w-full bg-gray-100 rounded-lg p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500'
                            rows='2'
                            placeholder='Add a public comment...'
                            value={message}
                            required
                            onChange={e=>setMessage(e.target.value)}
                        ></textarea>

                        {showLoginMessage&&
                          <div className='text-sm justify-center items-center flex gap-2 border-2 px-1 rounded-md border-red-500 text-red-500'>
                            <div>you have to login first!!:</div>
                            <Link className='text-blue-950 hover:underline' href={'/Login'}>login</Link>
                          </div>
                        }


                        <div className='flex items-center space-x-2 mt-2'>
                            <button type='submit' className='bg-yellow-500 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-yellow-600'>
                                Add Comment
                            </button>
                            <button type='button' onClick={cancel} className='text-gray-600 hover:text-gray-800'>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
          </div>

            
            
                <div className='w-full'>
                  {commentsList.length > 0 && commentsList.map((comment)=>(
                    ((comment.isReply === false) &&
                      <CommentBlock key={comment._id} review = {comment} session={Session} id={product?._id} fetchData={updateFunction}/>
                    )
                  ))}

                </div>
                
              </div>
              :
              <div className="border-2 h-full border-gray-300 rounded-lg bg-white mx-auto p-6 mt-6 w-full">
                <div className="flex justify-center items-center">
                  <div>
                    <p className="text-gray-600 text-sm mt-2">
                      Comments for this product are currently disabled. Please check back later.
                    </p>
                  </div>
                </div>
              </div>
            }

        </div>
      </div>
    
      <Footer/>
    </>
  );
}

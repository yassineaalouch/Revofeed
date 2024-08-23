import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import AddComment from "./addComment";

export default function CommentBlock({review, session, fetchData,id}) {
  const Id = session?.user?.id;
  const [reply, setReply] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showReplies, setShowReplies] = useState((!review.isReply && review?.repliesList?.length > 0) ? false : true);
  const [isLiked, setIsLiked] = useState(review?.likes?.includes(Id));
  const [likesCount, setLikesCount] = useState(review?.likes?.length || 0);

  async function addLike() {
    if (session) {
      setIsLoading(true);
      const previousLikes = [...review.likes];

      if (isLiked) {
        setLikesCount(likesCount - 1);
        setIsLiked(false);
        review.likes = review.likes.filter(item => item !== Id);
      } else {
        setLikesCount(likesCount + 1);
        setIsLiked(true);
        review.likes = [...review.likes, Id];
      }

      try {
        await axios.put('/api/comment', { _id: review._id, likes: review.likes });
      } catch (error) {
        // In case of an error, revert the state
        setIsLiked(previousLikes.includes(Id));
        setLikesCount(previousLikes.length);
      } finally {
        setIsLoading(false);
      }
    } else {
      setShowLoginMessage(true);
      setShowLoginMessage(true)
    }
    fetchData();
  }

  function cancelForm() {
    setReply(false);
  }

  async function Reply() {
    if(session){
      setReply(true);
    }else{
      setShowLoginMessage(true)
    }
    fetchData();
  }

  async function Delete() {
    try {
      await axios.delete('/api/comment', { data: { _id: review._id}}).then(()=>{
        fetchData();
      })
    } catch (error) {
      alert('error')
    }
  }

  return (
    <div>
      <div className={review?.isReply ? "bg-slate-50 border-[1px] p-3 text-sm overflow-auto rounded-lg my-2 max-w-7xl" : "bg-slate-50 border-[1px] p-3 pr-1 overflow-auto rounded-lg shadow-md my-4 max-w-7xl mx-auto"}>
        <div className="flex items-center space-x-4">
          <div className="flex justify-between w-full items-center">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">{review?.name || "User"}</h4>
              {session?.user?.role ==='admin'&&<h4 className="text-xs  text-gray-800">{review?.email || "User"}</h4>}
            </div>
            <p className="text-xs text-gray-500">{review?.createdAt?.split('T')[0] || "August 15, 2024"}</p>
          </div>
        </div>
        <div className="mt-4 text-gray-700">
          <p>{review?.comment || "This is a sample comment"}</p>
        </div>
        <div className="mt-4 flex space-x-4 text-sm text-gray-500">
          <button className="hover:text-yellow-500" onClick={Reply}>Reply</button>
          <button 
            className={isLiked ? "hover:text-yellow-500 text-black " : "hover:text-yellow-500"} 
            onClick={addLike} 
            disabled={isLoading}
          >
            {likesCount} Likes
          </button>
          {session?.user?.role ==='admin'&&<button onClick={Delete} className="text-red-400 hover:text-red-500">Delete</button>}
        </div>
        {showLoginMessage &&
          <div className='text-sm justify-center items-center flex gap-2 border-2 px-1 rounded-md border-red-500 text-red-500'>
            <div>You have to login first!!:</div>
            <Link className='text-blue-950 hover:underline' href={'/Login'}>Login</Link>
          </div>
        }
        {!review.isReply && review?.repliesList?.length > 0 &&
          <div className="w-full mt-2 flex justify-center items-end underline">
            <button className="text-xs md:text-sm" onClick={() => { setShowReplies(!showReplies); fetchData() }}>
              {showReplies ? "Hide replies" : "Show replies"}
            </button>
          </div>
        }
        {reply && <AddComment fetchData={fetchData} session={session} id={id} review={review} cancelForm={cancelForm}/>}
      </div>

      <div className="border-l-2 border-gray-500/50 rounded-bl-lg relative ml-6 pl-2">
        {((showReplies && review?.repliesList?.length > 0)||(review.isReply && review?.repliesList?.length > 0)) && review?.repliesList.map((reply) => (
          <CommentBlock key={reply._id} review={reply} session={session} fetchData={fetchData}/>
        ))}
      </div>
    </div>
  );
}






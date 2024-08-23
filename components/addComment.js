import { useState } from "react";
import axios from "axios";
const AddComment = ({session,fetchData,review,cancelForm,id}) => {
    const [message,setMessage] = useState('')
    const [showLoginMessage, setShowLoginMessage] = useState(false);


    function cancel(){
        fetchData()
        setMessage('')
        cancelForm()
      }

      async function addComment(ev){
        ev.preventDefault()
        if (session){
          const data = {
            name:session?.user?.name,
            email:session?.user?.email,
            productID:id,
            comment: message,
            replyTo: review._id
          }
          await axios.post('/api/comment',data)
          setMessage('')
          fetchData()
        }else{
          setShowLoginMessage(true)
        }
      }

    return (
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
    );
}

export default AddComment;

import { useState,useEffect } from "react";
import Setting from "../Settings";
import axios from "axios";
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
  
export default function Home(){
    const [developerMode,setDeveloperMode]=useState(false)
    const [showWarning, setShowWarning] = useState(false);
    const [isLoading,setIsLoading]=useState(false)
    const [titleCode,setTitleCode] = useState('')
    const [code,setCode] = useState('')

    const [list, setList] = useState([
        { title: "t1", code: "c1" },
        { title: "t2", code: "c2" },
        { title: "t3", code: "c3" }
      ]);
      
      useEffect(() => {
        getThemes() 
    },[]);
    async function getThemes(){
        await axios.get('/api/code').then(result=>{
            setList(result.data)
        });
    }

    async function makeTheme(ev){
        ev.preventDefault()
        setIsLoading(true)
        await axios.post('/api/code',{title:titleCode,code})
        .then(()=>{
            setCode('')
            setTitleCode('')
            setIsLoading(false)
            getThemes()
        })

    }

    const handleMouseEnter = () => {
        setShowWarning(true);
    };

    const handleMouseLeave = () => {
        setShowWarning(false);
    };

    function handleCheckbox(){
        setDeveloperMode(!developerMode)
    }

    const DynamicHTML = ({ htmlContent }) => {
        return (
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        );
    };
    function Themes({ question, answer }) {
        const [isOpen, setIsOpen] = useState(false);
    
        return (
            <div className="mb-4 border-b pb-4 border-yellow-950">
                <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <h2 className="md:text-xl text-base font-semibold text-yellow-950">{question}</h2>
                    <span className={`transform transition-transform ${isOpen ? 'rotate-0' : 'rotate-180'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </div>
                {isOpen && <p className="text-xs md:text-base bg-slate-700  mt-4 p-2 min-h-[70vh] overflow-auto text-slate-200">{answer}</p>}
            </div>
        );
    }
    
    return<>
    <Setting>
    <div className="bg-gray-100flex flex-col justify-center items-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="checkbox"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onChange={handleCheckbox}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor="checkbox"
              className="ml-3 text-blue-700 font-semibold cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Developer Mode
            </label>
          </div>

          {showWarning && (
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-800 p-4 rounded-md shadow-md w-72 md:w-96 lg:w-[33rem]">
              <h2 className="text-lg font-bold mb-2">Warning: Advanced Feature (will replace the code of the home page)</h2>
              <p className="text-sm">
                Activating this feature allows you to add custom HTML CSS JS code directly. 
                This is a powerful tool, but it can also be dangerous if used incorrectly. 
                Please do not activate this mode unless you are fully confident in your coding abilities.
              </p>
              <p className="mt-2 text-sm">
                Incorrect usage may cause unexpected behavior or break the site. Proceed with caution!
              </p>
            </div>
          )}
        </div>
    </div>

{!developerMode ?
 <div className=" bg-gray-400 py-4 px-2 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 px-4 gap-6">
              <div>
                <label className="block font-semibold text-gray-700">Title</label>
                <input className="w-full p-2 mt-1 border border-gray-300 rounded-md" />

                <label className="block font-semibold text-gray-700 mt-4">Description</label>
                <input className="w-full p-2 mt-1 border border-gray-300 rounded-md" />

                <label className="block font-semibold text-gray-700 mt-4">Button Text</label>
                <input className="w-full p-2 mt-1 border border-gray-300 rounded-md" />

                <label className="block font-semibold text-gray-700 mt-4">Icons</label>
                <div className="space-y-2 mt-2">
                  <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Facebook" />
                  <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Instagram" />
                  <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Twitter X" />
                </div>
              </div>

              <div className="flex justify-center items-center bg-gray-200 rounded-lg">
                <label className="flex flex-col justify-center items-center text-gray-500 hover:text-gray-700 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12 mb-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  Upload Image
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

            
<div className="text-center mt-5 flex bg-slate-200 justify-center items-center">
  <hr className="w-1/3 border-yellow-400" />
  <h1 className="font-bold text-yellow-500 text-2xl lg:text-4xl p-6">
    <div className="flex flex-col items-start">
      <label className="text-sm font-medium text-gray-700">Section 1 title</label>
      <input 
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" 
        placeholder="Enter title"
      />
    </div>
  </h1>
  <hr className="w-1/3 border-yellow-400" />
</div>




 <div className="bg-gray-400px-3 place-items-center gap-2 grid grid-cols-1 py-4 md:grid-cols-2 xl:grid-cols-4 px-4">

         <div className="border px-5 w-full max-w-[60%] md:w-[70%] md:h-full xl:max-w-[100%] xl:w-full py-2 bg-zinc-200 shadow-lg rounded-xl animate-move-to-Up  text-center">
             <div className="w-full flex justify-center items-center mb-1 mt-1 " >
                 <div >
                     <label>icon</label>
                     <input className=" w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                 </div>                        
             </div>
             <div className="space-y-3 mt-5">
                 <h2 className="font-bold">
                     <div>
                         <label>titre</label>
                         <input className=" w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                     </div>
                 </h2>
                 <div className="text-sm w-full pb-2">
                     <div>
                         <label>description</label>
                         <textarea className=" w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                     </div>
                 </div>
             </div>
         </div>

         <div className="border px-5 w-full max-w-[60%] md:w-[70%] md:h-full xl:max-w-[100%] xl:w-full py-2 bg-zinc-200 shadow-lg rounded-xl animate-move-to-Up  text-center">
             <div className="w-full flex justify-center items-center mb-1 mt-1 " >
                 <div >
                     <label>icon</label>
                     <input className=" w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                 </div>                        
             </div>
             <div className="space-y-3 mt-5">
                 <h2 className="font-bold">
                     <div>
                         <label>titre</label>
                         <input className=" w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                     </div>
                 </h2>
                 <div className="text-sm w-full pb-2">
                     <div>
                         <label>description</label>
                         <textarea className=" w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                     </div>
                 </div>
             </div>
         </div>

         <div className="border px-5 w-full max-w-[60%] md:w-[70%] md:h-full xl:max-w-[100%] xl:w-full py-2 bg-zinc-200 shadow-lg rounded-xl animate-move-to-Up  text-center">
             <div className="w-full flex justify-center items-center mb-1 mt-1 " >
                 <div >
                     <label>icon</label>
                     <input className=" w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                 </div>                        
             </div>
             <div className="space-y-3 mt-5">
                 <h2 className="font-bold">
                     <div>
                         <label>titre</label>
                         <input className=" w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                     </div>
                 </h2>
                 <div className="text-sm w-full pb-2">
                     <div>
                         <label>description</label>
                         <textarea className=" w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                     </div>
                 </div>
             </div>
         </div>

         <div className="border px-5 w-full max-w-[60%] md:w-[70%] md:h-full xl:max-w-[100%] xl:w-full py-2 bg-zinc-200 shadow-lg rounded-xl animate-move-to-Up  text-center">
             <div className="w-full flex justify-center items-center mb-1 mt-1 " >
                 <div >
                     <label>icon</label>
                     <input className=" w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                 </div>                        
             </div>
             <div className="space-y-3 mt-5">
                 <h2 className="font-bold">
                     <div>
                         <label>titre</label>
                         <input className=" w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                     </div>
                 </h2>
                 <div className="text-sm w-full pb-2">
                     <div>
                         <label>description</label>
                         <textarea className=" w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                     </div>
                 </div>
             </div>
         </div>

   
 </div>










 <div className="text-center mt-5 flex bg-slate-200 justify-center items-center">
  <hr className="w-1/3 border-yellow-400" />
  <h1 className="font-bold text-yellow-500 text-2xl lg:text-4xl p-6">
    <div className="flex flex-col items-start">
      <label className="text-sm font-medium text-gray-700">Section 2 title</label>
      <input 
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" 
        placeholder="Enter title"
      />
    </div>
  </h1>
  <hr className="w-1/3 border-yellow-400" />
</div>



 <div className="bg-gray-400 pt-5 px-4 grid grid-cols-1 md:grid-cols-2 place-items-center gap-2 lg:grid-cols-4">

         <div className="border bg-zinc-200 px-3 w-full max-w-[60%] md:w-[70%] md:h-full xl:max-w-[100%] xl:w-full py-2 shadow-lg rounded-xl animate-move-to-Up  text-center">
             <div className="space-y-3 mt-5">
                 <h2 className="font-bold ">
                     <div className="flex flex-col">
                         <label>titre</label>
                         <input className="w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                     </div>
                 </h2>
                 <div className="text-sm  pb-2">
                     <div>
                         <label>description</label>
                         <textarea className=" w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                     </div>
                 </div>
             </div>
         </div> 
        

         <div className="border bg-zinc-200 px-3 w-full max-w-[60%] md:w-[70%] md:h-full xl:max-w-[100%] xl:w-full py-2 shadow-lg rounded-xl animate-move-to-Up  text-center">
             <div className="space-y-3 mt-5">
                 <h2 className="font-bold ">
                     <div className="flex flex-col">
                         <label>titre</label>
                         <input className="w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                     </div>
                 </h2>
                 <div className="text-sm  pb-2">
                     <div>
                         <label>description</label>
                         <textarea className=" w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                     </div>
                 </div>
             </div>
         </div> 


         <div className="border bg-zinc-200 px-3 w-full max-w-[60%] md:w-[70%] md:h-full xl:max-w-[100%] xl:w-full py-2 shadow-lg rounded-xl animate-move-to-Up  text-center">
             <div className="space-y-3 mt-5">
                 <h2 className="font-bold ">
                     <div className="flex flex-col">
                         <label>titre</label>
                         <input className="w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                     </div>
                 </h2>
                 <div className="text-sm  pb-2">
                     <div>
                         <label>description</label>
                         <textarea className=" w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                     </div>
                 </div>
             </div>
         </div> 

         <div className="border bg-zinc-200 px-3 w-full max-w-[60%] md:w-[70%] md:h-full xl:max-w-[100%] xl:w-full py-2 shadow-lg rounded-xl animate-move-to-Up  text-center">
             <div className="space-y-3 mt-5">
                 <h2 className="font-bold ">
                     <div className="flex flex-col">
                         <label>titre</label>
                         <input className="w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                     </div>
                 </h2>
                 <div className="text-sm  pb-2">
                     <div>
                         <label>description</label>
                         <textarea className=" w-full p-2 mt-1 border border-gray-300 rounded-md"/>
                     </div>
                 </div>
             </div>
         </div> 
 </div>

 <div className="text-center bg-slate-200 mt-5 flex justify-center items-center">
  <hr className="w-1/3 border-yellow-400" />
  <h1 className="font-bold text-yellow-500 text-2xl lg:text-4xl p-6">
    <div className="flex flex-col items-start">
      <label className="text-sm font-medium text-gray-700">Section 3 title</label>
      <input 
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" 
        placeholder="Enter title"
      />
    </div>
  </h1>
  <hr className="w-1/3 border-yellow-400" />
</div>


<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-400 rounded-lg">
    <div className="space-y-6">

        
        <div className="space-y-4">
            <div>
                <label className="block font-semibold text-gray-700">Title</label>
                <input className="w-full p-2 mt-1 border border-gray-300 rounded-md" />
            </div>
            <div>
                <label className="block font-semibold text-gray-700">Sub Title</label>
                <input className="w-full p-2 mt-1 border border-gray-300 rounded-md" />
            </div>
            <div>
                <label className="block font-semibold text-gray-700">Paragraph</label>
                <input className="w-full p-2 mt-1 border border-gray-300 rounded-md" />
            </div>
            <div>
                <label className="block font-semibold text-gray-700">List</label>
                <input className="w-full p-2 mt-1 border border-gray-300 rounded-md" />
            </div>
        </div>
    </div>
    
    <div className="flex justify-center items-center bg-gray-200 rounded-lg p-4">
        <label className="flex flex-col justify-center items-center text-gray-500 hover:text-gray-700 cursor-pointer">
            <svg 
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 mb-2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
            </svg>
            Upload Image
            <input type="file" className="hidden" />
        </label>
    </div>
</div>

 <div className="text-center mt-5 flex justify-center items-center">
  <hr className="w-1/3 border-yellow-400" />
  <h1 className="font-bold text-yellow-500 text-2xl lg:text-4xl p-6">
    <div className="flex flex-col items-start">
      <label className="text-sm font-medium text-gray-700">Section 4 title</label>
      <input 
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" 
        placeholder="Enter title"
      />
    </div>
  </h1>
  <hr className="w-1/3 border-yellow-400" />
</div>



<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-400 rounded-lg">
        
    <div className="flex justify-center items-center bg-gray-200 rounded-lg p-4">
        <label className="flex flex-col justify-center items-center text-gray-500 hover:text-gray-700 cursor-pointer">
            <svg 
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 mb-2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
            </svg>
            Upload Image
            <input type="file" className="hidden" />
        </label>
    </div>  
    <div className="space-y-6">
        
        <div className="space-y-4">
            <div>
                <label className="block font-semibold text-gray-700">Title</label>
                <input className="w-full p-2 mt-1 border border-gray-300 rounded-md" />
            </div>
            <div>
                <label className="block font-semibold text-gray-700">Sub Title</label>
                <input className="w-full p-2 mt-1 border border-gray-300 rounded-md" />
            </div>
            <div>
                <label className="block font-semibold text-gray-700">Paragraph</label>
                <input className="w-full p-2 mt-1 border border-gray-300 rounded-md" />
            </div>
            <div>
                <label className="block font-semibold text-gray-700">List</label>
                <input className="w-full p-2 mt-1 border border-gray-300 rounded-md" />
            </div>
        </div>
    </div>

</div>





</div>
:
<>
    <div className="bg-green-300 p-4 rounded-lg shadow-lg">
        <form onSubmit={makeTheme} className="space-y-4">
            <label className="block text-lg font-semibold mb-2">
                Enter a title for this theme
            </label>
            <input
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                required type="text" 
                value={titleCode} 
                onChange={(e)=>setTitleCode(e.target.value)}>
            </input>
            <label className="block text-lg font-semibold mb-2">
                Enter code HTML CSS JS here(no framework just this 3 languages)
            </label>
            <textarea 
                type="text" 
                required
                value={code}
                onChange={(e)=>setCode(e.target.value)}
                className="w-full min-h-[100vh] bg-zinc-800 text-slate-200 border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Write your code here..."
            />
            <div className="flex gap-4">
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {isLoading? "Sending ...":"Send"}
                </button>

                <button 
                    type="button" 
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    Reset
                </button>
            </div>
        </form>
    </div>

    <div className="mt-5">
        <div className="max-w-4xl mt-16 mb-12 mx-auto p-6">
                    <h1 className="md:text-3xl text-xl font-bold mb-16 justify-center gap-2 text-black flex border-b-2">List of themes</h1>
                    {list.map((ele, index) => (
                        <Themes key={index} question={ele.title} answer={ele.code} />
                    ))}
        </div>
    </div>
</>

}


    </Setting>
    </>
}
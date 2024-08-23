import Footer from "@/interfaceComponents/Footer";
import NavBarInterface from "@/interfaceComponents/Nav-bar-interface";
import axios from "axios";
import { useState , useEffect} from "react";

export default function Q_and_A() {
    const [question ,setQuestion]=useState('')
    const [isLoading,setIsLoading]=useState(false)
    const [Q_A_List ,setQ_A_List]= useState([])

    useEffect(() => {
        getQuestions() 
    },[]);
    async function getQuestions(){
        await axios.get('/api/Question_Answer').then(result=>{
            const list =result.data
            setQ_A_List(list.filter(element=>element.isAnswered===true).reverse())
        });
    }

    async function SendQuestion(ev){
        ev.preventDefault()
        const answer = null;
        setIsLoading(true)
        await axios.post('/api/Question_Answer',{question,answer:null})
        .then(()=>{
            setQuestion('')
            setIsLoading(false)
        })

    }
    return (
        <>
            <NavBarInterface />
            <div className="max-w-4xl mt-16 mb-12 mx-auto p-6">
                <h1 className="md:text-3xl text-xl font-bold mb-16 justify-center gap-2 text-yellow-500 flex"><div className="h-10 w-1 bg-yellow-500"></div>Frequently Asked Questions</h1>
                {Q_A_List.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
            <div className="w-screen bg-orange-500 relative">
                <div className="text-center absolute left-1/2 top-1/2 rounded-lg transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 p-4 text-white">
                    <h1 className="font-semibold text-lg ">
                        Add your question here.
                    </h1>
                    <form onSubmit={SendQuestion} >
                        <input
                            type="text" 
                            onChange={e=>setQuestion(e.target.value)}
                            value={question} 
                            required
                            placeholder="Add your question here.." 
                            className=" block rounded-[5px] mt-4 md:min-w-96 py-1 text-black px-2 focus:outline-none focus:ring-yellow-500"
                        />
                        <button disabled={isLoading} type=" submit" className="border-2 mt-2 px-2 rounded-md hover:bg-yellow-600 hover:px-3 hover:font-semibold transition-all duration-300">
                            {isLoading? "Sending ...":"Send"}
                        </button>
                     </form>
                </div>
            </div>
            <div className=" w-screen h-16 bg-slate-900"></div>
            <Footer className="w-screen !mt-0" />
        </>
    );
}

function FAQItem({ question, answer }) {
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
            {isOpen && <p className="text-xs md:text-base mt-4 pl-5 text-yellow-950">{answer}</p>}
        </div>
    );
}

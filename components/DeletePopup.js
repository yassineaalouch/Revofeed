import axios from "axios";

export default function DeletePopup({link,_id,cancelCode,fetchCategories}){
    function goBack(){
        cancelCode();
    }
    async function Delete(){
        await axios.delete(link, { data: { _id } });
        fetchCategories();
        cancelCode();
    };
    return(
        <div onClick={()=>{goBack()}} className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
            <div onClick={(e) => { e.stopPropagation(); }} className="bg-white p-6 rounded-lg shadow-lg z-51">
                <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                <p className="mb-4">Are you sure you want to delete this item?</p>
                <div className="flex justify-center">
                    <button onClick={()=>{Delete()}} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Delete</button>
                    <button onClick={()=>{goBack()}} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                </div>
            </div>
        </div>
    );
}

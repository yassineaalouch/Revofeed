import Layout from "@/components/Layout"
import { useEffect, useState } from 'react';
import axios from "axios";
import DeletePopup from "@/components/DeletePopup";


export default function Properties(){
    const [editingMode, setEditingMode] = useState(false);
    const [properties,setProperties]=useState([])
    const [propName, setPropName] = useState('');
    const [propValue, setPropValue] = useState('');
    const [property_id,setProperty_id] = useState('')
    const [cancelCode, setCancelCode] = useState(true);
    const [error, setError] = useState(false);
    const [update, setUpdate] = useState(false);



  
    useEffect(()=>{
        fetchProperties()
    },[update])

    async function fetchProperties() {
        
            axios.get('/api/properties').then(result => {
                setProperties(result.data);
            });
    }    
    
    function editProperty(property){
        setPropName(property.name)
        setPropValue(property.values.join(','))
        setEditingMode(true)
        setProperty_id(property._id)
    }

    function deleteProperty(property) {
        setProperty_id(property._id);
        setCancelCode(false);
    }

    function HandlCancel() {
        setCancelCode(true);
        setUpdate(!update)

    };

    function isListNull(list){
        for (let i = 0; i < list.length; i++) {
            if(list[i].trim()===''){
                return false
            }
        }
        return true
    }
    async function addProperty() {
        const data = {
            name:propName,
            values:propValue.split(','),
        };
        const name = data.name
        const values = data.values
        console.log(values)
        const namesList = properties.map(ele => (ele.name));
        if((name.trim()!='' && isListNull(values))){
            if(!editingMode && !namesList.includes(name)){
                await axios.post('/api/properties', data);
                setPropName('');
                setPropValue('');
                setUpdate(!update)
                setEditingMode(false)
                setError(false)
            }else if (editingMode) {
                await axios.put('/api/properties', { ...data, _id:property_id});
                setPropName('');
                setPropValue('');
                setUpdate(!update)
                setEditingMode(false)
                setError(false)
            }else{
                setError(true)
            }
        }else{
            setError(true)
        }
    };
    return(
        <Layout>
            <div className="min-h-screen bg-white  ">
                <h1 className="text-2xl font-bold mb-4">Add Property</h1>
                <div className="flex gap-5">
                    <div className="mb-4 w-full">
                    <label className="block text-gray-700 font-semibold mb-2">Property Name</label>
                    <input
                        type="text"
                        value={propName}
                        onChange={(e) => setPropName(e.target.value)}
                        className={!error? "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" : "w-full px-4 py-2 border rounded-lg border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"}
                        placeholder="e.g., color"
                    />
                    </div>
                    <div className="mb-4 w-full">
                    <label className="block text-gray-700 font-semibold mb-2">Property Value</label>
                    <input
                        type="text"
                        value={propValue}
                        required
                        onChange={(e) => setPropValue(e.target.value)}
                        className={!error? "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" : "w-full px-4 py-2 border rounded-lg border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"}
                        placeholder="e.g., red"
                    />
                    </div>
                </div>
                <button
                onClick={addProperty}
                className=" btn btn-primary py-1"
                >
                Save
                </button>
                <h2 className="text-xl font-bold mt-6">Properties List</h2>
                <hr className="mt-3"></hr>
                {!editingMode && (
                <table className="basic">
                    <thead>
                        <tr>
                            <td><b>Property name</b></td>
                            <td><b>Property values</b></td>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.length > 0 && properties.map(property => (
                            <tr key={property.name}>
                                <td>{property.name}</td>
                                <td>{property.values.join(',')}</td>
                                <td className="flex gap-2">
                                    <button className="edit-btn" onClick={() => editProperty(property)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                        Edit
                                    </button>

                                    <button className="delete-btn" onClick={() => deleteProperty(property)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            </div>
            {!cancelCode && <DeletePopup link="/api/properties" _id={property_id} cancelCode={HandlCancel} fetchCategories={fetchProperties} />}
        </Layout>
    )
}
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import CommentBlock from "./Commentaire";
import Image from "next/image";

export default function ProductForm({_id, title: existingTitle, comments:existingComments, description: existingDescription, price: existingPrice, images: existingImages, category: existingCategory, properties: assignedProperties, purchasePrice: existingPurchasePrice, supplier: existingSupplier, stockQuantity: existingStockQuantity, dimensions: existingDimensions, countryOfProduction: existingCountryOfProduction, deliveryTime: existingDeliveryTime, SKU: existingSKU, barcode: existingBarcode, customerReviews: existingCustomerReviews, averageCustomerRating: existingAverageCustomerRating, materials: existingMaterials, careInstructions: existingCareInstructions, allergens: existingAllergens, expirationDate: existingExpirationDate, certificatesAndLabels: existingCertificatesAndLabels, recyclingInformation: existingRecyclingInformation, returnAndWarrantyConditions: existingReturnAndWarrantyConditions, promotionsOrDiscounts: existingPromotionsOrDiscounts, complementaryProducts: existingComplementaryProducts, productFAQ: existingProductFAQ }){

    const [title, setTitle] = useState(existingTitle || '');
    const [category, setCategory] = useState(existingCategory || '')
    const [images, setImages] = useState(existingImages || []);
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [purchasePrice, setPurchasePrice] = useState(existingPurchasePrice || '');
    const [supplier, setSupplier] = useState(existingSupplier || '');
    const [stockQuantity, setStockQuantity] = useState(existingStockQuantity || '');
    const [dimensions, setDimensions] = useState(existingDimensions || { length: '', width: '', height: '' });
    const [countryOfProduction, setCountryOfProduction] = useState(existingCountryOfProduction || '');
    const [deliveryTime, setDeliveryTime] = useState(existingDeliveryTime || '');
    const [SKU, setSKU] = useState(existingSKU || '');
    const [barcode, setBarcode] = useState(existingBarcode || '');
    const [customerReviews, setCustomerReviews] = useState(existingCustomerReviews || []);
    const [averageCustomerRating, setAverageCustomerRating] = useState(existingAverageCustomerRating || '');
    const [materials, setMaterials] = useState(existingMaterials || []);
    const [careInstructions, setCareInstructions] = useState(existingCareInstructions || '');
    const [allergens, setAllergens] = useState(existingAllergens || []);
    const [expirationDate, setExpirationDate] = useState(existingExpirationDate?.split('T')[0] || '');
    const [certificatesAndLabels, setCertificatesAndLabels] = useState(existingCertificatesAndLabels || []);
    const [recyclingInformation, setRecyclingInformation] = useState(existingRecyclingInformation || '');
    const [returnAndWarrantyConditions, setReturnAndWarrantyConditions] = useState(existingReturnAndWarrantyConditions || '');
    const [promotionsOrDiscounts, setPromotionsOrDiscounts] = useState(existingPromotionsOrDiscounts || '');
    const [complementaryProducts, setComplementaryProducts] = useState(existingComplementaryProducts || []);
    const [productFAQ, setProductFAQ] = useState(existingProductFAQ || []);

    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [properties, setProperties] = useState([]);
    const [products, setProducts] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [comments , setComments] = useState(existingComments || true)

    const [productProperties, setProductProperties] = useState(assignedProperties || {});
    const [errorTitle, setErrorTitle] =  useState(false);
    const [addSuccessfully, setAddSuccessfully] =  useState(true);
    const [listOfNewImage, setListOfNewImage] = useState('');
    const router = useRouter();
    useEffect(()=>{
        const request1 = axios.get('/api/categories');
        const request2 = axios.get('/api/properties');
        const request3 = axios.get('/api/products');
        const request4 = axios.get('/api/discount');
        
        axios.all([request1, request2, request3,request4])
          .then(axios.spread((response1, response2, response3, response4) => {
            setCategories(response1.data)
            setProperties(response2.data);
            setProducts( response3.data);
            setDiscounts(response4)
          }))
          .catch(errors => {
            alert(errors);
          });
    },[])

    async function saveProduct(ev){
        ev.preventDefault();
        const data = {title, description, price, comments,images, category, properties:productProperties,purchasePrice,supplier,stockQuantity,stockQuantity,dimensions,countryOfProduction,deliveryTime,SKU,barcode,careInstructions,expirationDate,recyclingInformation,returnAndWarrantyConditions};
        if(title.trim()!=""){
            if(_id){
                await axios.put('/api/products',{...data,_id});
            }else{
                await axios.post('/api/products', data);
            }
            setGoToProducts(true);
            setErrorTitle(false);
            setAddSuccessfully(true);
        }else{
            setErrorTitle(true);
            setAddSuccessfully(false);
        }
    }

    if (goToProducts){
         router.push('/Products')
    }

    async function uploadImages(ev){
        const files = ev.target?.files;
        if(files?.length > 0){
            setIsUploading (true);
            const data = new FormData();
            for (const file of files) {
                data.append('file',file);
            }
            const res = await axios.post('/api/upload',data)
            setImages(oldImages => {
                setListOfNewImage(listOfNewImage=>[...listOfNewImage,...res.data.links])
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false)
        }
    }

    function updatedImagesOrder(images){
        setImages(images)
    }

    async function deleteImage(linkToDelete){
        console.log(images)
        console.log(linkToDelete)
        const baseUrl = "https://revofeed.s3.amazonaws.com/";
        const fileKey = linkToDelete.replace(baseUrl, "");
        console.log(fileKey); 
        axios.delete('/api/upload', { 
            headers: {
                'Content-Type': 'application/json'
            },
            data: { key: fileKey }
        })
        .then(() => {
            setImages(oldImages => oldImages.filter(link => link !== linkToDelete));
        })
        .catch(err => { 
            console.error('Error deleting image:', err);
        });
    }
   
    // const propertiesToFill = [];
    // if(categories.length > 0 && category) {
    //     let catInfo = categories.find(({_id}) => _id === category);
    //     if (catInfo) {
    //       propertiesToFill.push(...catInfo.properties);
    //       while (catInfo?.parent?._id) {
    //         const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
    //         if (parentCat) {
    //           propertiesToFill.push(...parentCat.properties);
    //           catInfo = parentCat;
    //         } else {
    //           break; 
    //         }
    //       }
    //     }
    // }

    function setProductProp(propName,value) {
        setProductProperties(prev => {
          const newProductProps = {...prev};
          newProductProps[propName] = value;
          return newProductProps;
        });
    }

    function Cancel (){
        if(listOfNewImage.length > 0){
            listOfNewImage.forEach(ele => deleteImage(ele));
        }
        router.push('/Products')
    }

    return(
    <>
        {!addSuccessfully && <div className="bg-red-200 w-full h-12 fixed  inset-0 flex justify-center  items-center text-3xl font-bold text-red-600"> 
            Error
        </div>}        

        <form onSubmit ={saveProduct}>
            <label className="this">Product name</label>
            <input 
                className="this"
                type="text" 
                placeholder="Product name" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                required
            />

            {errorTitle && <p className="text-red-600 text-xs pl-1">The title isn`t valid</p> } 

            <label className="this">Category</label>
            <select className="this mt-1" value={category} onChange={ev=>{setCategory(ev.target.value)}}>
                <option value="">Uncategorized</option>
                {categories.length > 0 && categories.map(c=> (
                        <option key={c._id} value={c._id}>{c.name} </option>
                ))}
            </select>

            {/* {propertiesToFill.length > 0 && propertiesToFill.map(p => (
                    <div key={p.name} className="pl-10 ">
                        <label className="this !text-sm">{p.name[0].toUpperCase()+p.name.substring(1)}</label>
                        <div className="flex">
                        <select className="this !text-sm" value={productProperties[p.name]} onChange={ev => setProductProp(p.name,ev.target.value)}>
                            {p.values.map(v => (
                                <option key={v} value={v}>{v}</option>
                            ))}
                        </select>
                        </div>
                    </div>
            ))} */}

            <label className="this">Photos</label>
            <div className="mb-2 flex flex-wrap gap-2 overflow-x-scroll">

                <label className="w-24 h-24 border flex justify-center rounded-lg flex-col items-center text-sm text-gray-500 hover:text-gray-900 bg-slate-200 hover:bg-slate-100 cursor-pointer">   
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    Upload
                    {!images?.length && (
                    <div className="pt-2 text-xs text-center">No images for this Product</div>
                    )}
                    <input type="file" onChange={uploadImages} className="hidden"></input>
                </label>

                <ReactSortable
                    list={images} 
                    className="flex flex-wrap gap-1"
                    setList={updatedImagesOrder}>
                    {!!images?.length && images.map((link, index) => (
                        <div key={index} className="relative h-24 w-24 bg-slate-400/10 flex justify-center items-center rounded-lg overflow-hidden">
                            <button
                                type="button" 
                                onClick={() => deleteImage(link)} 
                                className="absolute top-1 right-1 text-red-600 font-bold z-10 bg-white rounded-full w-5 h-5 flex items-center justify-center">X
                            </button>
                            <Image
                                src={link}
                                alt={title || "product"}
                                width={100} 
                                quality={50}
                                height={100}
                                className="object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </ReactSortable>

                {isUploading && (
                    <div className="flex justify-center items-center rounded-lg w-24 h-24">
                        <Spinner color="#00FF00" speed ={2} size = "60px"/> {/*color must be hexa code exp: "#00FF00" */}
                    </div>
                )}

            </div>

            <label className="this">Description</label>
            <textarea  
                className="this"
                placeholder="Description" 
                value={description} 
                onChange={e => setDescription(e.target.value)}
            />

            <label className="this">Price</label>
            <input 
                className="this"
                type="number" 
                placeholder=" Price" 
                value={price} 
                onChange={e => setPrice(e.target.value)}
                required
            />

            <label className="this">Category</label>
            <select className="this mt-1" value={category} onChange={ev=>{setCategory(ev.target.value)}}>
                <option value="">Uncategorized</option>
                {categories.length > 0 && categories.map(c=> (
                        <option key={c._id} value={c._id}>{c.name} </option>
                ))}
            </select>


            <label className="this">Comments</label>
            <select
                className="this"
                type=""
                placeholder="Purchase Price"
                value={comments}
                onChange={e => setComments(e.target.value)}
            >
                <option value={true}>Authorize</option>
                <option value={false}>Block</option>
            </select>


            <label className="this">Purchase Price (USD)</label>
            <input
                className="this"
                type="number"
                placeholder="Purchase Price"
                value={purchasePrice}
                onChange={e => setPurchasePrice(e.target.value)}
            />

            <label className="this">Supplier</label>
            <input
                className="this"
                type="text"
                placeholder="Supplier"
                value={supplier}
                onChange={e => setSupplier(e.target.value)}
            />

            <label className="this">Stock Quantity</label>
            <input
                className="this"
                type="number"
                placeholder="Stock Quantity"
                value={stockQuantity}
                onChange={e => setStockQuantity(e.target.value)}
            />

            <label className="this">Dimensions (cm)</label>
            <div className="flex gap-2">
                <input
                    className="this w-1/3"
                    type="number"
                    placeholder="Length"
                    value={dimensions.length}
                    onChange={e => setDimensions({ ...dimensions, length: e.target.value })}
                />
                <input
                    className="this w-1/3"
                    type="number"
                    placeholder="Width"
                    value={dimensions.width}
                    onChange={e => setDimensions({ ...dimensions, width: e.target.value })}
                />
                <input
                    className="this w-1/3"
                    type="number"
                    placeholder="Height"
                    value={dimensions.height}
                    onChange={e => setDimensions({ ...dimensions, height: e.target.value })}
                />
            </div>

            <label className="this">Country of Production</label>
            <input
                className="this"
                type="text"
                placeholder="Country of Production"
                value={countryOfProduction}
                onChange={e => setCountryOfProduction(e.target.value)}
            />

            <label className="this">Delivery Time (days)</label>
            <input
                className="this"
                type="number"
                placeholder="Delivery Time"
                value={deliveryTime}
                onChange={e => setDeliveryTime(e.target.value)}
            />

            <label className="this">SKU</label>
            <input
                className="this"
                type="text"
                placeholder="SKU"
                value={SKU}
                onChange={e => setSKU(e.target.value)}
            />

            <label className="this">Barcode</label>
            <input
                className="this"
                type="text"
                placeholder="Barcode"
                value={barcode}
                onChange={e => setBarcode(e.target.value)}
            />

            <label className="this">Average Customer Rating</label>
            <input
                className="this"
                type="number"
                step="0.1"
                placeholder="Average Customer Rating"
                value={averageCustomerRating}
                onChange={e => setAverageCustomerRating(e.target.value)}
            />

            <label className="this">Care Instructions</label>
            <textarea
                className="this resize-none"
                placeholder="Care Instructions"
                value={careInstructions}
                onChange={e => setCareInstructions(e.target.value)}
            />

            <label className="this">Expiration Date</label>
            <input
                className="this"
                type="date"
                placeholder="Expiration Date"
                value={expirationDate}
                onChange={e => setExpirationDate(e.target.value)}
            />

            <label className="this">Recycling Information</label>
            <textarea
                className="this resize-none"
                placeholder="Recycling Information"
                value={recyclingInformation}
                onChange={e => setRecyclingInformation(e.target.value)}
            />

            <label className="this">Return and Warranty Conditions</label>
            <textarea
                className="this resize-none"
                placeholder="Return and Warranty Conditions"
                value={returnAndWarrantyConditions}
                onChange={e => setReturnAndWarrantyConditions(e.target.value)}
            />

            <div className="flex gap-2 justify-center py-2">
                <button type="button" onClick={Cancel} className="bg-gray-200 px-2 rounded-lg hover:bg-gray-300">Cancel</button>
                <button type="submit" className="btn-primary">Save</button>
            </div>
        </form>
        <hr/>
        <div>
            {customerReviews?.map((review)=>{
                <CommentBlock review ={review} />
            })}
        </div>
    </>
)
}
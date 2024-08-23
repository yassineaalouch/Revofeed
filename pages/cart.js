import Footer from "@/interfaceComponents/Footer";
import NavBarInterface from "@/interfaceComponents/Nav-bar-interface";
import { useContext,useEffect } from "react";
import { CartContext } from "@/components/cartContext";
import Image from "next/image";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoAddSharp } from "react-icons/io5";
import { IoRemove } from "react-icons/io5";
import Link from "next/link";

export default function CartPage() {
    let total_Price= 0
    const { cartProducts, setCartProducts } = useContext(CartContext);

    const handleQuantityChange = (id, delta) => {
        setCartProducts((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { 
                        ...item, 
                        quantity: Math.max(1, item.quantity + delta),
                        totalPrice: (Math.max(1, item.quantity + delta)) * item.price // Mise à jour du prix total
                    }
                    : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartProducts((prevItems) => prevItems.filter((item) => item.id !== id));

    };
    const totalPrice = cartProducts.reduce((acc, item) => acc + item.totalPrice, 0);
    return (
        <>
            <NavBarInterface />
            <div className="lg:flex justify-between md:justify-around min-h-screen pt-14 bg-gray-100 p-6">
                <div className="">
                    <div className="max-w-4xl mx-auto mb-4 lg:mb-4 bg-white p-4 shadow-md rounded-lg">
                        <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
                        {cartProducts.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {cartProducts.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center bg-gray-200 p-4 md:w- rounded-lg shadow-sm"
                                    >
                                        <div className="w-28 h-28 mr-4 overflow-hidden flex justify-center items-cente">
                                            <Image 
                                                src={item.image}
                                                alt={item.title}
                                                width={100}
                                                height={100}
                                                quality={10}
                                                className=" border rounded-md "
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-lg font-medium">{item.title}</h2>
                                            <p className="text-sm text-gray-600">${item.totalPrice}</p>
                                            <div className="flex items-center mt-2">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    className="px-2 py-1  font-bold bg-gray-200 rounded-md hover:bg-gray-300"
                                                    disabled={item.quantity === 1}
                                                >
                                                    <IoRemove size={20}/>
                                                </button>
                                                <span className="px-4">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                    className="px-2 py-1 font-bold bg-gray-200 rounded-md hover:bg-gray-300"
                                                >
                                                    <IoAddSharp size={20} />
                                                </button>
                                            </div>
                                            
                                        </div>
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="ml-4 text-sm text-red-500 hover:text-red-700"
                                        >
                                            <RiDeleteBin6Fill size={25}/>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div >
                                <p className="text-gray-600 mb-4 min-w-96 mt-10">Your cart is empty.</p>
                                <Link href={'/shope'} className="bg-yellow-300 p-2 rounded-lg hover:bg-yellow-500">Visit Our Store</Link>
                            </div>

                        )}
                    </div>
                    {cartProducts.length > 0 &&
                        <div className="max-h-60 flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
                            <button className="bg-yellow-300 p-2 rounded-lg hover:bg-yellow-500">
                                Continue to checkout
                            </button>
                            <div className="flex justify-end">
                                Total Price: ${totalPrice.toFixed(2)}
                            </div>
                        </div>
                    }
                </div>


            </div>
            <Footer />
        </>
    );
}

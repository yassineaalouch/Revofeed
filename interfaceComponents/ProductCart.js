import { CartContext } from '@/components/cartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState  } from 'react'; 
import { FaCartShopping } from "react-icons/fa6";

const ProductCard = ({ product }) => {
  const {setCartProducts , cartProducts} = useContext(CartContext)
  const [animation ,setAnimation] = useState(false)
  const timer = setTimeout(() => {
    setAnimation(false)
  }, 1000);

  const addToCart = (product) => {
    
  
    const existingProductIndex = cartProducts.findIndex(item => item.id === product._id);
    
    
    if (existingProductIndex >= 0) {

    } else {
      // Si le produit n'existe pas dans le panier, ajoutez-le
      const newProduct = {
        id: product._id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        totalPrice: product.price,
        quantity: 1,  // Commencez avec une quantité de 1
        
      };
      setAnimation(true)
      clearTimeout(timer);
      setCartProducts(prevItems => [...prevItems, newProduct]);


    }
  };
  
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      <div className='rounded-t-lg flex justify-center items-center '>
        <Link href={'/product/'+product._id}>
            <div className='size-52 relative flex items-end'>
              <Image
                src={product?.images[0]}
                alt={product?.title}
                layout='responsive'
                quality={70}
                width={200}
                height={50}
                className={"cover rounded-t-lg"}
              />
              <Image
                src={product?.images[0]}
                alt={product?.title}
                layout='responsive'
                quality={70}
                width={200}
                height={50}
                className={animation?"cover z-50 absolute inset-0 rounded-t-lg animated":"cover z-30 hidden absolute inset-0 rounded-t-lg" }
              />
            </div>
        </Link>
      </div>

      <div className="mt-4">
        <Link href={'/product/'+product._id}>
          <h3 className="text-lg font-semibold line-clamp-2 text-gray-800">{product?.title}</h3>
        </Link>
        <p className="text-gray-500 mt-2">${product?.price}</p>
        <button
          className="mt-4 w-full bg-yellow-500 flex justify-around items-center text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
          onClick={() => addToCart(product)}
        >
          Add To Cart <FaCartShopping size={25}/>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
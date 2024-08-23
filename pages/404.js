import Footer from "@/interfaceComponents/Footer";
import NavBarInterface from "@/interfaceComponents/Nav-bar-interface";
import Link from "next/link";

export default function Error(){
    return(
    <>
    <NavBarInterface/>
    <div className="flex min-h-screen items-center justify-center bg-yellow-500">
      <div className="text-center">
        <h1 className="text-4xl md:text-7xl lg:text-9xl font-bold text-white">404</h1>
        <h2 className="mt-4 text-lg md:text-xl lg:text-2xl text-white">Page Not Found</h2>
        <p className="mt-2 text-sm md:text-base lg:text-lg text-white">
          Oops! The page you are looking for does not exist.
        </p>
        <Link 
          href="/" 
          className="mt-6 text-sm md:text-base lg:text-lg inline-block rounded-md bg-white px-4 py-2 text-yellow-500 font-semibold hover:bg-yellow-600 hover:text-white transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
    <Footer className="!mt-0"/>
    </>
    );
}
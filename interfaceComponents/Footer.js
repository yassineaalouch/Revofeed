import { FaFacebook } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
export default function Footer(props){
    return(
        <>
        <footer className={`bg-gray-900 mt-0 text-white py-8 ${props.className}`} >
      <div className="container mx-auto px-4">
        <div className="flex justify-center flex-wrap">
          {/* About Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8 sm:mb-0">
            <h2 className="font-bold text-lg mb-4">About Us</h2>
            <p className="text-gray-400">
              We provide the best solutions to achieve energy autonomy.
            </p>
          </div>

          {/* Links Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8 sm:mb-0">
            <h2 className="font-bold text-lg mb-4">Quick Links</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-yellow-500">Home</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-yellow-500">About</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-yellow-500">Services</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-yellow-500">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8 sm:mb-0">
            <h2 className="font-bold text-lg mb-4">Contact Us</h2>
            <p className="text-gray-400">
              123 Energy Street<br />
              Autonomy City, AC 12345<br />
              (123) 456-7890
            </p>
          </div>

          {/* Social Media Section */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4">
            <h2 className="font-bold text-lg mb-4">Follow Us</h2>
            <div className="flex ">
              <ul className="flex gap-10 !space-x-0">
                  <li>
                    <a href="https://www.dadant.com/">
                      <FaFacebook className="text-white hover:text-blue-500 transition-colors duration-200" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <TiSocialInstagram className="text-white hover:text-pink-500 transition-colors duration-200" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaXTwitter className="text-white hover:text-blue-400 transition-colors duration-200" />
                    </a>
                  </li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
        </>
    );
}
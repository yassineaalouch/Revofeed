import Footer from "@/interfaceComponents/Footer";
import Formulair from "@/interfaceComponents/Formulair";
import Nav_bar_interface from "@/interfaceComponents/Nav-bar-interface";

export default function ContactUs(){
    return(
        <>
        <Nav_bar_interface/>
        <div className="bg-[url('/miel_bg_1.webp')] bg-bottom bg-fixed md:h-[145vh] md:mt-[-25px] lg:h-[150vh]">
        <div className="bg-slate-900 h-full bg-cover pt-28 md:pt-0 bg-opacity-45">
        <div className=" relative">
              <div className="w-full md:absolute lg:left-0 md:top-28 lg:top-36" >
                <div className="bg-yellow-500 bg-opacity-75 pt-16 border md:pt-0 md:border-none text-center md:text-start shadow-lg p-8 md:pl-2 lg:pl-8 xl:pl-36 sm:flex-col">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Contact Information</h2>
                    <div className="grid sm:grid-cols-3 md:block sm:border sm:pl-6">
                        <p className="text-white text-sm md:text-lg mb-4">
                        <strong>Address:</strong><br />
                        <span className="text-black text-xs md:text-sm pl-5">123 Energy Street</span> <br/>
                        <span className="text-black text-xs md:text-sm pl-5">Autonomy City, AC 12345</span>
                        </p>
                        <p className="text-white text-sm md:text-lg mb-4">
                        <strong>Phone:</strong><br />
                        <span className="text-black text-xs md:text-sm  pl-5">(+212) 456-7890</span>
                        </p>
                        <p className="text-gray-700 mb-4">
                        <strong className="text-white text-sm md:text-lg mb-4">Email:</strong><br />
                        <span className="text-black text-xs md:text-sm pl-5">Revofeed.Revofeed@gmail.com</span>
                        </p>
                    </div>
                </div>
              </div>
               
            
            <div className="flex justify-center mt-5 ">
                    <Formulair className="md:absolute lg:right-36 md:right-5 md:top-12 lg:top-16 !z-20 !mt-0"/>
            </div>
            
        </div>
        </div>
        </div>
        <Footer className="!mt-0"/>
        </>
    );
}
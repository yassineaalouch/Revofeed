import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaUserAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";


export default function NavBarInterface() {
    const router = useRouter();
    const  {data:session} = useSession()

    const [menuIsShow,setMenuIsShow]=useState(false)
    const [showUserMenu , setShowUserMenu]=useState(false)
    function goToLoginPage() {
        router.push('/Login');
    }
    function showMenu(){
        setMenuIsShow(!menuIsShow)
    }


    return (
        <div className="fixed top-0 left-0 w-screen py-1 bg-yellow-950 bg-opacity-50 z-30 border-b">
            <div className="flex justify-between items-center px-2 md:px-4 lg:px-10">
                <div className="block px-3 pr-5 md:hidden lg:hidden">
                    <svg onClick={showMenu} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white font-bold cursor-pointer size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    {menuIsShow &&
                        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[2.4px] bg-black/70">
                            <div className=" absolute left-5 z-30 top-3">
                                <svg onClick={showMenu} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white cursor-pointer hover:size-[1.6rem] transition-all font-bold">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <ul className="grid gap-1 w-full py-6 bg-white/15 backdrop-blur-[2px]">
                                <Link href='/'className="text-white text-opacity-75 hover:text-opacity-100 hover:border-y-[2.5px] font-semibold hover:tracking-[0.2em] transition-all cursor-pointer text-center w-full py-4">Home</Link>
                                <Link href="/A&Q" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-y-[2.5px] font-semibold hover:tracking-[0.2em] transition-all cursor-pointer text-center w-full py-4">Q&A</Link>
                                <Link href="/shope" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-y-[2.5px] font-semibold hover:tracking-[0.2em] transition-all cursor-pointer text-center w-full py-4">Shop</Link>
                                <Link href="/contact" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-y-[2.5px] font-semibold hover:tracking-[0.2em] transition-all pb-1 cursor-pointer text-center w-full py-4">Contact us</Link>
                            </ul>
                        </div>
                        
                    }


                </div>
                <div className="bg-yellow-50 p-1 rounded-full font-bold">
                    <Link href="/"><img src="../logo.png" className="h-8 w-8 !p-0" alt="logo" /></Link>
                </div>
                <ul className="hidden md:flex ml-3 md:gap-4 lg:gap-9">
                    <li><Link href="/" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-b-[2.5px] font-semibold transition-all pb-1 cursor-pointer">Home</Link></li>
                    <li><Link href="A&Q" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-b-[2.5px] font-semibold transition-all pb-1 cursor-pointer">A&Q</Link></li>
                    <li><Link href="/shope" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-b-[2.5px] font-semibold transition-all pb-1 cursor-pointer">Shop</Link></li>
                    <li><Link href="/contact" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-b-[2.5px] font-semibold transition-all pb-1 cursor-pointer">Contact us</Link></li>

                </ul>
                <div className="flex items-center gap-2 md:gap-4">
                    <Link href={'/product_Page'} className="group hover:bg-yellow-600 bg-white p-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-yellow-950 group-hover:text-white h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                        </svg>
                    </Link>
                    {!session?
                        <button onClick={goToLoginPage} className={"bg-yellow-600 rounded-xl px-3 py-1  border-yellow-50 border-[1.2px] text-white font-semibold hover:bg-white hover:text-yellow-900"}>
                            Login
                        </button>
                    :
                    <div>
                        <button onClick={()=>setShowUserMenu(!showUserMenu)} className="flex justify-center bg-yellow-600 gap-1 text-white  rounded-full overflow-hidden">
                            <span className=" text-sm p-2 relative"><FaUserAlt/></span>
                        </button>
                        {showUserMenu&&
                            <div className=" absolute top-12 right-3 md:right-14 lg:right-20 text-black font-bold flex flex-col rounded-lg  justify-start bg-zinc-50 border-x-2 border-yellow-500 border-t-2">
                                <h1 className="text-center border-b-2 border-yellow-400 p-1">Hi,{session?.user?.image}{session?.user?.name}</h1>
                                <button className="border-b-2 border-yellow-400 p-2 hover:bg-zinc-200 "  onClick={() => signOut({ callbackUrl: '/' })}>
                                    <span className="flex gap-3 items-center justify-between">
                                        Logout
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                                        </svg>
                                    </span>
                                </button>
                                <button className="border-b-2 rounded-b-lg border-yellow-400 p-2 hover:bg-zinc-200 " onClick={goToLoginPage}>
                                    <span className="flex gap-3 items-center justify-between">
                                        {session.user.role==='user'? 'Account': 'Dashboard'}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        }
                  </div>
                    }
                </div>
            </div>
        </div>
    );
}

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut } from 'next-auth/react';

export default function SideBarUserAccount() {
  const [activeTab, setActiveTab] = useState('orders');
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <div className="flex">
       
      {/* Sidebar for large screens */}

      <aside className="md:block flex w-fit  text-black h-fit border-l border-r border-gray-300">
        <div className="p-4 border-b border-t border-gray-300">
          <h2 className="text-xl font-semibold">Mon Compte</h2>
        </div>
        <ul className="mt-4 grid grid-cols-5 md:block" >
          <li className='border-b border-gray-300'>
            <Link 
              href={'/user/commands'}
              className={`block w-full text-left px-4 py-2 ${
                activeTab === 'orders' ? 'bg-yellow-500 text-white' : 'hover:bg-gray-800'
              }`}
              onClick={() => setActiveTab('orders')}
            >
              My orders
            </Link>
          </li>
          <li className='border-b border-gray-300'>
            <Link
              href={'/user/account'}
              className={`block w-full text-left px-4 py-2 ${
                activeTab === 'account' ? 'bg-yellow-500 text-white' : 'hover:bg-gray-800'
              }`}
              onClick={() => setActiveTab('account')}
            >
              Mon compte
            </Link>
          </li>
          <li className='border-b border-gray-300'>
            <Link
              href={'/user/page3'}
              className={`block w-full text-left px-4 py-2 ${
                activeTab === 'addresses' ? 'bg-yellow-500 text-white' : 'hover:bg-gray-800'
              }`}
              onClick={() => setActiveTab('addresses')}
            >
              Page3
            </Link>
          </li>
          <li className='border-b border-gray-300'>
            <Link
              href={'/user/page4'}
              className={`block w-full text-left px-4 py-2 ${
                activeTab === 'wishlist' ? 'bg-yellow-500 text-white' : 'hover:bg-gray-800'
              }`}
              onClick={() => setActiveTab('wishlist')}
            >
              Page4
            </Link>
          </li>
          <li className='border-b border-gray-300'>
            <Link
              href={'/'}
              className={`flex items-center gap-3 w-full text-left px-4 py-2 ${
                activeTab === 'logout' ? 'bg-yellow-500 text-white' : 'hover:bg-gray-800'
              }`}
              onClick={() => { setActiveTab('logout'); signOut({ callbackUrl: '/Login' }); }}
            >
              <RiLogoutBoxLine size={25} />
              Logout
            </Link>
          </li>
        </ul>
      </aside>



    </div>
  );
}

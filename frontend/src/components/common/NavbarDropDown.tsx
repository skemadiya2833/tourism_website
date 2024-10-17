import React, { useEffect, useState } from 'react';
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import Link from 'next/link';
import {logout} from '../../Redux/slices/authSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import router from 'next/router';
import { RootState } from '../../Redux/store';
import { fetchUserByIdRequest } from '@/Redux/slices/userSlice';
import Cookies from 'js-cookie'

const Dropdown = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const user = useAppSelector((state: RootState) => state.user.user)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleLogout = () => {
    console.log( 'this is logout')
    dispatch(logout()); 
    router.push('/')
  };
  useEffect(() => {
    const userId = Cookies.get('userId');
    
    if (userId && !user) {
      dispatch(fetchUserByIdRequest({id: userId}));
    }
  }, [user, dispatch]);

  return (
    <div className="relative inline-flex">
      <button
        id="dropdown-button"
        type="button"
        className="flex items-center gap-x-2 p-1 text-sm font-medium rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Dropdown"
        onClick={toggleDropdown}
      >
        <span>Hi {user?.username}</span><svg
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        className={`absolute z-100 right-0 mt-12 min-w-[160px] bg-white shadow-md rounded-lg p-1 space-y-0.5 ${isOpen ? 'block opacity-100' : 'hidden opacity-0'}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="dropdown-button"
        style={{zIndex: 20}}
      >
       
        <div className="py-2 space-y-1 ">
          <Link
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
            href="/dashboard/profile"
          >
           <MdOutlineDashboard />
            Dashboard
          </Link>
          <a
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-red-100 focus:outline-none focus:bg-red-100 dark:text-red-400 dark:hover:bg-red-700 dark:hover:text-red-300 dark:focus:bg-red-700"
            onClick={handleLogout}
          >
         <IoIosLogOut />
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

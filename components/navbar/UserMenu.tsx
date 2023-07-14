"use client";

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import MenuItem from './MenuItem';
import LoginModal from '../modals/LoginModal';
import useLoginModal from '@/app/hooks/useLoginModal';


function UserMenu() {
  
  const [isOpen, setisOpen] = useState(false);
  
  const toggleOpen = useCallback(()=>{
    setisOpen((value)=>!value);
  },[])

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  return (
    <div className='relative'>
      <div className='flex__row__center gap-3'>
        <div onClick={()=>{}}
        className='nav_font hidden md:block py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
            Airbnb your home
        </div>
        <div className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center justify-center gap-3 rounded-full cursor-pointer hover:shadow-md transition' onClick={toggleOpen}>
            <AiOutlineMenu/>
            <div className='hidden md:block'>
                <Image alt="default" src="/default.jpg" width={30} height={30} className='rounded-full'/>
            </div>
        </div>
      </div>

      {/* after click finished  close of */}

      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
            <div className='flex flex-col cursor-pointer'>
                <>
                    <MenuItem label='singout' onClick={loginModal.onOpen}/>
                    <MenuItem label='singin' onClick={registerModal.onOpen}/>
                </>
            </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu

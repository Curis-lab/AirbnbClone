"use client";

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import MenuItem from './MenuItem';
import LoginModal from '../modals/LoginModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import useRentModal from '@/app/hooks/useRentModal';

interface UserMenuProps{
  currentUser?: User | null;
}

function UserMenu({currentUser}: UserMenuProps) {
  
  const [isOpen, setisOpen] = useState(false);
  
  const toggleOpen = useCallback(()=>{
    setisOpen((value)=>!value);
  },[])

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const onRent = useCallback(()=>{
    if(!currentUser){
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  },[ currentUser, loginModal, rentModal]);

  return (
    <div className='relative'>
      <div className='flex__row__center gap-3'>
        <div onClick={onRent}
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
                {currentUser
                ?(
                  <>
                    <MenuItem label='My trips' onClick={()=>{}}/>
                    <MenuItem label='My Favorites' onClick={()=>{}}/>
                    <MenuItem label='My reservations' onClick={()=>{}}/>
                    <MenuItem label='My properties' onClick={()=>{}}/>
                    <MenuItem label='Airbnb my home' onClick={rentModal.onOpen}/>
                    <hr/>
                    <MenuItem label='Logout' onClick={()=>signOut()}/>
                </>
                )
                :(
                  <>
                    <MenuItem label='singout' onClick={loginModal.onOpen}/>
                    <MenuItem label='singin' onClick={registerModal.onOpen}/>
                </>
                )}
            </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu

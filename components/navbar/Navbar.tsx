'use client';

import Image from 'next/image';
import React from 'react'
import Searchbar from './Searchbar';
import UserMenu from './UserMenu';
import Categories from './Categories';
import { User } from '@prisma/client';

interface NavbarProps{
  currentUser?: User | null;
}

function Navbar({currentUser}: NavbarProps) {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <div className='container__main'>
            <div className='flex__row__between'>
                <Image src='/airbnb1.png' width={50} height={50} alt='logo'/>
                <Searchbar/>
                <UserMenu currentUser={currentUser}/>
            </div>
        </div>
      </div>
      <Categories/>
    </div>
  )
}

export default Navbar

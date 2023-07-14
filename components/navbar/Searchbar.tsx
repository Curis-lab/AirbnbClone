"use client";

import React from 'react'


function Searchbar() {
  return (
    <div className='border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'>
        <div className='flex__row__center'>
            <div className='nav_font'>
                Anywhere
            </div>
            <div className='nav_font'>Any Week</div>
            <div className='nav_font flex__row__center'>
                <div>Add Guess</div>
                <div>
                    icon
                </div>
            </div>
        </div>
    </div>
  )
}


export default Searchbar

"use client";

import { ButtonProps } from '@/types'
import React from 'react'

function Button({label, onClick, disabled, outline, small, icon:Icon}: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={`border-2 relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition ${outline? `bg-white border-black`:`bg-rose-500 border-rose-500`} w-full ${small? `py-1 text-sm font-light`:`py-3 text-md font-semibold`}`}>
      {Icon && (
        <Icon 
        size={24} className='absolute left-4 top-3'/>
      )}
      {label}
    </button>
  )
}

export default Button

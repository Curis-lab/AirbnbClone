"use client";

import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps{
    id: string,
    label: string,
    type?: string,
    disabled?: boolean,
    formatPrices?: boolean,
    required?: boolean,
    errors: FieldErrors,
    register: UseFormRegister<FieldValues>
}

function Input({id, label, type="text", disabled, formatPrices, register, required, errors}: InputProps) {
  return (
    <div className='w-full relative'>
      {formatPrices && (
        <BiDollar
        size={20}
        className='text-neutral-700 absolute top-5 left-2'/>
      )}
      <input id={id} { ...register(id, {required})} placeholder=' ' disabled={disabled} type={type} className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70`}/>
      <label className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${formatPrices ? `left-9`:`left-4`} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus: -translate-y-4 ${errors[id]? 'text-rose-500': 'text-zinc-400'}`}>{label}</label>
    </div>
  )
}

export default Input

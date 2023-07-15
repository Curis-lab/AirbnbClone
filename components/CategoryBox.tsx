import React from 'react'
import { IconType } from 'react-icons'

interface CategoryBoxProps{
    icon: IconType,
    label: string,
    selected?: boolean
}

function CategoryBox({icon: Icon, label, selected}: CategoryBoxProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition  ${selected? 'border-b-neutral-800 text-neutral-800': 'border-transparent text-neutral-500'}`}>
      <Icon size={26}/>
      <div className='font-medium text-sm'>
        {label}
      </div>
    </div>
  )
}

export default CategoryBox

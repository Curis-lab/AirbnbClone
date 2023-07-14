"use client";

import React from 'react'

import {TbBeach, TbMountain, TbPool} from 'react-icons/tb';
import {GiIsland, GiWindmill} from 'react-icons/gi';
import {MdOutlineVilla} from 'react-icons/md'
import CategoryBox from '../CategoryBox';
export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This propery is close the beach!'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description:'This propery has windmills'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This propery is modern!'
    },
    {
        label:'Countryside',
        icon: TbMountain,
        description: 'This propery is in the countryside'
    },
    {
        label:'Pools',
        icon: TbPool,
        description: 'This propery has a pool!'
    },
    {
        label:'Islands',
        icon: GiIsland,
        description: 'This propery has pool!'
    }
]


function Categories() {
  return (
    <div className='container__main'>
      <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {
          categories.map((item)=>(
            <CategoryBox key={item.label} label={item.label} icon={item.icon}/>
          ))
        }
      </div>
    </div>
  )
}

export default Categories

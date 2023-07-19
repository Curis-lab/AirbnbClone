"use client";

import { SafeListing, SafeUser } from '@/app/types';
import ListingHead from '@/components/listings/ListingHead';
import ListingInfo from '@/components/listings/ListingInfo';
import { categories } from '@/components/navbar/Categories';
import { Reservation } from '@prisma/client'
import React, { useMemo } from 'react'

interface ListingClientProps{
    reservations?: Reservation[];
    listing: SafeListing & {
        user: SafeUser
    },
    currentUser?: SafeUser | null;
}

function ListingClient({
    listing, currentUser
}: ListingClientProps) {

    const category = useMemo(()=>{
        return categories.find((item)=>
        item.label == listing.category);
    },[listing.category])
  
    return (
    <div className='container__main pt-28'>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
            <ListingHead title={listing.title} imageSrc={listing.imageSrc} locationValue={listing.locationValue} id={listing.id} currentUser={currentUser}/>
            <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
              <ListingInfo
              user={listing.user}
              category={category}
              description = {listing.description}
              roomCount = {listing.roomCount}
              guestCount = {listing.guestCount}
              bathroomCount = {listing.bathroomCount}
              locationValue = {listing.locationValue}
              />
            </div>
        </div>
      </div>
    </div>
  )
}

export default ListingClient
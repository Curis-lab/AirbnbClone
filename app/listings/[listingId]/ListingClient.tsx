"use client";

import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeListing, SafeUser } from '@/app/types';
import ListingHead from '@/components/listings/ListingHead';
import ListingInfo from '@/components/listings/ListingInfo';
import ListingReservation from '@/components/listings/ListingReservation';
import { categories } from '@/components/navbar/Categories';
import { Reservation } from '@prisma/client'
import axios from 'axios';
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps{
    reservations?: Reservation[];
    listing: SafeListing & {
        user: SafeUser
    },
    currentUser?: SafeUser | null;
}

function ListingClient({
    listing, currentUser, reservations = []
}: ListingClientProps) {

  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(()=>{
    let dates: Date[] = [];
    reservations.forEach((reservations:any)=>{
      const range = eachDayOfInterval({
        start: new Date(reservations.startDate),
        end: new Date(reservations.endDate)
      });

      dates = [...dates, ...range];

    })
    return dates
  },[reservations]);


  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const onCreateReservation = useCallback(()=>{
    if(!currentUser){
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios.post(`/api/reservations`,{
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id
    }).then(()=>{
      setDateRange(initialDateRange);
      router.refresh();
    }).catch((error)=>{
      console.log('something went worng');
    }).finally(()=>{setIsLoading(false)});
  },[
    totalPrice,
    dateRange,
    listing?.id,
    router,
    currentUser,
    loginModal
  ]);


  useEffect(()=>{
    if(dateRange.startDate && dateRange.endDate){
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if(dayCount && listing.price){
        setTotalPrice(dayCount * listing.price);
      }else{
        setTotalPrice(listing.price);
      }
    }
  },[dateRange, listing.price])
  
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
              <div className='order-first mb-10 md:order-last md:col-span-3'>
                <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate = {(value)=> setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates = {disabledDates}/>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ListingClient

"use client";

import React, { useCallback, useState } from 'react'
import { SafeReservations, SafeUser } from '../types'
import Heading from '@/components/Heading'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ListingCard from '@/components/listings/ListingCard';


interface TripsClientProps{
    reservations: SafeReservations[],
    currentUser?: SafeUser | null
}

function TripsClient({reservations, currentUser}: TripsClientProps) {
  const router = useRouter();
  const [deletingid, setDeletingId] = useState('');

  const onCancel = useCallback((id:string)=>{
    setDeletingId(id);
    axios.delete(`/api/reservations/${id}`)
    .then(()=>{console.log('goog')})
    .catch((error)=>{console.log(error)})
    .finally(()=>{
        setDeletingId('');
    });
  },[router])
  
    return (
    <div className='container__main mt-28'>
      <Heading title='Trips' subtitle="Where you've been and where you're going"/>
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {reservations.map((reservation)=>(
            <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingid === reservation.id}
            actionLabel='Cancel reservation'
            currentUser={currentUser}
            />
        ))}
      </div>
    </div>
  )
}

export default TripsClient

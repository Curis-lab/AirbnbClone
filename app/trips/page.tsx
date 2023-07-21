import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import { ClientOnly } from '@/components';
import EmptyState from '@/components/EmptyState';
import getReservations from '../actions/getReservations';
import TripsClient from './TripsClient';

async function TripsPage() {

    const currentUser = await getCurrentUser();
  
    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                title='Unauthorized'
                subtitle='Please login'/>
            </ClientOnly>
        )
    }
    
    const reservations = await getReservations({
        userId: currentUser.id
    });
    if(reservations?.length === 0){
        return(
            <ClientOnly>
                <EmptyState title='No trips found' subtitle='Look like you havent reserved any trips.'/>
            </ClientOnly>
        )
    }
    
    return(
        <ClientOnly>
            <TripsClient
                reservations = {reservations}
                currentUser = {currentUser}
            />
        </ClientOnly>
    )
}

export default TripsPage

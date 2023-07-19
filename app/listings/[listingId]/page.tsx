import getlistingById from '@/app/actions/getlistingById';
import { ClientOnly } from '@/components';
import EmptyState from '@/components/EmptyState';
import React from 'react'
import ListingClient from './ListingClient';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams{
  listingId?: string,
}

async function ListingPage({params}: {params: IParams}) {
  
  const listing = await getlistingById(params);
  const currentUser = await getCurrentUser();
  if(!listing){
    return(
      <ClientOnly>
        <EmptyState/>
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser}/>
    </ClientOnly>
  )
}

export default ListingPage;

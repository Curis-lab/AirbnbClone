import { Prisma } from "@prisma/client";
import { quartersInYear } from "date-fns";

interface IParams{
    listingId?: string,
    userId?: string,
    authorId?: string
}

export default async function getReservations(
    params: IParams
){
    try{
    const {listingId, userId, authorId} = params;

    const query: any = {};

    if(listingId){
        query.listingId = listingId;
    }

    if(userId){
        query.listing = {userId: authorId}
    }

    const reservations = await prisma?.reservation.findMany({
        where: query,
        include:{
            listing: true
        },
        orderBy:{
            createdAt:'desc'
        }
    });
    const safeReservations = reservations?.map((reservations)=>({
        ...reservations,
        createdAt: reservations.createdAt.toISOString(),
        startDate: reservations.startDate.toISOString(),
        endDate: reservations.endDate.toISOString(),
        listing:{
            ...reservations.listing,
            createAt: reservations.listing.createAt.toISOString()
        }
    }));
    return safeReservations;}
    catch(error:any){
        throw new Error(error);
    }
}
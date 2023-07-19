import { useParams } from "next/navigation";
import { parseCommandLine } from "typescript";
import client from "../libs/prismadb";

interface IParams{
    listingId?: string
}

export default async function getlistingById(params: IParams ){
    try{
        const {listingId} = params;

        const listing = await client.listing.findUnique({
            where:{
                id: listingId
            },
            include:{
                user: true
            }
        });

        if(!listing){
            return null;
        }

        return {
            ...listing,
            createdAt: listing.createAt.toISOString(),
            user:{
                ...listing.user,
                createdAt: listing.user.createAt.toISOString(),
                updatedAt: listing.user.updateAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null
            }            
        }
    }catch(error){
        throw new Error(`Invalid error value`);
    }
}
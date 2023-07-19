import { list } from "postcss";

interface IParams{
    listingId?: string
}

export default async function getlistingById(params: IParams ){
    try{
        const {listingId} = params;

        console.log(listingId);
        
        console.log('this is routeing on getlist Byid');

        const listing = await prisma?.listing.findUnique({
            where:{
                id: listingId
            },
            include:{
                user: true
            }
        });
        if(!listing){
            return null;
        }else{
            console.log(listing);
        }
        return{
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
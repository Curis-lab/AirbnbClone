import getCurrentUser from "@/app/actions/getCurrentUser"
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams{
    listingId?: string
}

export default async function POST(request: Request, {params}:{params: IParams}){
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }

    const {listingId} = params;

    if(!listingId || typeof listingId !== 'string'){
        throw new Error('Invalid Id');
    }
    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(listingId);

    const user = await client.user.update({
        where:{
            id: currentUser.id
        },
        data:{
            favoriteIds
        }
    })

    return NextResponse.json(user);
}

export async function DELETE(
    request: Request,
    {params}:{params: IParams}
){
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }
    const {listingId} = params;
    if(!listingId || typeof listingId !== 'string'){
        throw new Error('Invalid ID');
    }
    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id)=>id !== listingId);

    const user = await client.user.update({
        where:{
            id: currentUser.id
        },
        data:{
            favoriteIds
        }
    });
    return NextResponse.json(user);
}
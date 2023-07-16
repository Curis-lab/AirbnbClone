import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST( request: Request){
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price
    } = body;

    Object.keys(body).forEach((value: any)=>{
        if(!body[value]){
            NextResponse.error();
        }
    });

    const listing = await prisma?.listing.create({
        data:{
            title,
            imageSrc,
            description,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userid: currentUser.id
        }
    })
    return NextResponse.json(listing);
}
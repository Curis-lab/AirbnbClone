import client from '@/app/libs/prismadb';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request){
    const body = await request.json();
    const {email, name, password} = body;
    const hashPassword = await bcrypt.hash(password, 12);
    
    const user = await client.user.create({
        data:{
            email,
            name,
            hashPassword
        }
    });

    return NextResponse.json(user);
}
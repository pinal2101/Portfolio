import User from "../../../editTopic/[id]/libs/models/user";
import bcryptjs from 'bcryptjs';
import connectMongoDB from "../../../editTopic/[id]/libs/mongodb";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

connectMongoDB();

export const GET = async (NextRequest) => {
    console.log( "POST");
    
     try {
        

       const response = NextResponse.json({ message: "logout successfull", success:true });

       response.cookies.set('token', "", { httpOnly: true, expires: new Date(0) });
       return response;
    }catch (error) {
        console.log(error);
        return new Response(" Something went wrong", { status:500 })
     }
}
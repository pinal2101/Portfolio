import User from "../../../editTopic/[id]/libs/models/user";
import bcryptjs from 'bcryptjs';
import connectMongoDB from "../../../editTopic/[id]/libs/mongodb";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

connectMongoDB();

export const POST = async (req) => {
    try {
        const body = await req.json();
        const { username, password } = body;

        if (!username || !password) {
            return new Response("Username and password are required", { status: 401 });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return new Response("Username does not exist", { status: 400 });
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return new Response("Incorrect Password", { status: 400 });
        }

        const tokenData = {
            username: user.username,
            id: user._id
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, { expiresIn: '1d' });

        const response = NextResponse.json({ success: true, message: "Login successful", token });

        // Set token in HTTP-only cookie
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return response;
        
    } catch (error) {
        console.error("Login Error:", error);
        return new Response("Something went wrong", { status: 500 });
    }
};

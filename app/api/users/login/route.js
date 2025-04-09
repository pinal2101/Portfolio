
import User from "../../../editTopic/[id]/libs/models/user";
import bcryptjs from 'bcryptjs';
import connectMongoDB from "../../../editTopic/[id]/libs/mongodb";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        await connectMongoDB(); // Ensure DB connection inside the function

        // Set CORS headers
        const headers = new Headers();
        headers.set("Access-Control-Allow-Origin", "*");
        headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
        headers.set("Access-Control-Allow-Headers", "Content-Type");

        // Handle CORS preflight request
        if (req.method === "OPTIONS") {
            return new NextResponse(null, { status: 204, headers });
        }

        const body = await req.json();
        const { username, password } = body;
        console.log('Received:', username, password);

        if (!username || !password) {
            console.log('Username or password missing');
            return new NextResponse("Username and password are required", { status: 401, headers });
        }

        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found');
            return new NextResponse("Username does not exist", { status: 400, headers });
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            console.log('Incorrect password for user:', username);
            return new NextResponse("Incorrect Password", { status: 400, headers });
        }

        const tokenData = { username: user.username, id: user._id };

        if (!process.env.JWT_SECRETKEY) {
            return new NextResponse("JWT secret key missing", { status: 500, headers });
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, { expiresIn: '1d' });

        // Response with token and cookie
        const response = new NextResponse(JSON.stringify({ success: true, message: "Login successful", token }), {
            status: 200,
            headers: headers
        });

        // Set token in cookie
        response.headers.set("Set-Cookie", `token=${token}; HttpOnly; Path=/; Secure; SameSite=Strict`);

        return response;
    } catch (error) {
        console.error("Login Error:", error);
        return new NextResponse("Something went wrong", { status: 500 });
    }
};

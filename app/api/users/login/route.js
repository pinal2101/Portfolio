// import User from "../../../editTopic/[id]/libs/models/user";
// import bcryptjs from 'bcryptjs';
// import connectMongoDB from "../../../editTopic/[id]/libs/mongodb";
// import jwt from 'jsonwebtoken';
// import { NextResponse } from "next/server";

// connectMongoDB();

// export const POST = async (req) => {
//     try {
//         const body = await req.json();
//         const { username, password } = body;
//         console.log(username,password);
        

//         if (!username || !password) {
//             return new Response("Username and password are required", { status: 401 });
//         }

//         const user = await User.findOne({ username });
//         if (!user) {
//             return new Response("Username does not exist", { status: 400 });
//         }

//         const validPassword = await bcryptjs.compare(password, user.password);
//         if (!validPassword) {
//             return new Response("Incorrect Password", { status: 400 });
//         }

//         const tokenData = {
//             username: user.username,
//             id: user._id
//         };

//         const token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, { expiresIn: '1d' });

//         const response = NextResponse.json({ success: true, message: "Login successful", token });

//         // Set token in HTTP-only cookie
//         response.cookies.set('token', token);

//         return response;
        
//     } catch (error) {
//         console.error("Login Error:", error);
//         return new Response("Something went wrong", { status: 500 });
//     }
// };


import User from "../../../editTopic/[id]/libs/models/user";
import bcryptjs from 'bcryptjs';
import connectMongoDB from "../../../editTopic/[id]/libs/mongodb";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

// Connect to MongoDB
connectMongoDB();

export const POST = async (req) => {
    try {
        const body = await req.json();
        const { username, password } = body;
        console.log('Received:', username, password);

        // Check if username and password are provided
        if (!username || !password) {
            console.log('Username or password missing');
            return new Response("Username and password are required", { status: 401 });
        }

        // Fetch user from DB
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found');
            return new Response("Username does not exist", { status: 400 });
        }

        // Validate password
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            console.log('Incorrect password for user:', username);
            return new Response("Incorrect Password", { status: 400 });
        }

        // Create JWT Token
        const tokenData = {
            username: user.username,
            id: user._id
        };

        // Verify secret key is available
        console.log('JWT Secret:', process.env.JWT_SECRETKEY);
        if (!process.env.JWT_SECRETKEY) {
            return new Response('JWT secret key missing', { status: 500 });
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, { expiresIn: '1d' });

        // Create response with token
        const response = NextResponse.json({ success: true, message: "Login successful", token });

        // Set token in HTTP-only cookie
        response.cookies.set('token', token);

        return response;
        
    } catch (error) {
        console.error("Login Error:", error);
        return new Response("Something went wrong", { status: 500 });
    }
};

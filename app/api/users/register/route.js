import User from "../../../editTopic/[id]/libs/models/user";
import bcryptjs from 'bcryptjs';
import connectMongoDB from "../../../editTopic/[id]/libs/mongodb";
connectMongoDB();

export const POST = async (NextRequest) => {
    console.log( "POST");
    
     try {
        const body = await NextRequest.json();

        const { name, username, password } = body;

        if (!name|| !username|| !password ) {
            return new Response("name, username and password is required", {status: 401 })
        }

       const users = await User.findOne({ username });
       if (users) {
        return new Response("Username already exist", { status: 400 });
       }

       const salt = await bcryptjs.genSalt(12);
       const hashedPassword = await bcryptjs.hash(password, salt);

       const newUsers = new User({
        name,
        username,
        password: hashedPassword
       })

       const usersData = await newUsers.save();

       console.log(usersData);
       return new Response("user saved successfully",{ status: 200 })
     } catch (error) {
        console.log(error);
        
     }
}


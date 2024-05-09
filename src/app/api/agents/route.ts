import User from '@models/user';
import { connectToDB } from '@utils/database';

export const GET = async (req, res) => {
    try {
        await connectToDB();

        const users = await User.find({});
        return new Response(JSON.stringify(users), {status:200});
    }catch (error) {
        return new Response(error.message, {status:500});
    }
}

export const POST = async (req) => {
    const { name, email, avatar} = await req.json();
    try {
        await connectToDB();
        const userExists = await User.findOne({email});
        if(userExists) {
            return new Response('User already exists', {status:400});
        }
        const newUser = await User.create({name, email, avatar});
        console.log("new user created")
      
        return new Response(JSON.stringify(newUser), {status:200});
    }catch (error) {
        return new Response(error.message, {status:500});
    }
}

import User from '@models/user';
import { connectToDB } from '@utils/database';



export const GET = async () => {
    try {
        await connectToDB();

        const users = await User.find({});
        return new Response(JSON.stringify(users), {status:200});
    }catch (error: any) {
        return new Response(error.message, {status:500});
    }
}

export const POST = async (req: Request) => {
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
    }catch (error: any) {
        return new Response(error.message, {status:500});
    }
}

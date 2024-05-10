import User from '@models/user';
import { connectToDB } from '@utils/database';


export const GET = async (req, {params}) => {
  try {
    await connectToDB();
    const user = await User.findById(params.id).populate('allProperties');

    if(user) {
        return new Response(JSON.stringify(user), {status:200});
      } else {
        return new Response('User not found', {status:404});
      
      }
    } catch (error) {
        return new Response(error.message, {status:500});
  
    }
  }; 
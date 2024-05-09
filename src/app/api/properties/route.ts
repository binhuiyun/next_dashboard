import Property from '@models/property'
import { connectToDB } from '@utils/database'
import mongoose from 'mongoose';
import User from '@models/user';

import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const GET = async (req, res) => {
  
    try {
       // const { _end, _order, _start, _sort, title_like = "", propertyType = "" } = query;
        await connectToDB();
     //   const query = {};
        // if (propertyType !== "") {
        //     query.propertyType = propertyType;
        // }
        // if (title_like){
        //     query.title = { $regex: title_like, $options: 'i' };
        // }
      //  const count = await Property.countDocuments();
        // const properties = await Property
        // .find(query)
        // .limit(_end)
        // .skip(_start)
        // .sort({ [_sort]: _order });
        const properties = await Property.find();

      //  res.header('X-Total-Count', count);
      //  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
   
        return new Response(JSON.stringify({ properties}), { status: 200 });
    } catch (error: any) {
        return new Response(error.message, { status: 500 });
    }
}

export const POST = async (req) => {
    const { title, description, price, propertyType, location, photo, email} = await req.json();
    try {
        await connectToDB();
        const session = await mongoose.startSession();
    session.startTransaction();
  
    const user = await User.findOne({ email }).session(session);
  
    if(!user) throw new Error('User not found');
  
    const photoUrl = await cloudinary.uploader.upload(photo);
  
    const newProperty = await Property.create({
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoUrl.url,
      creator: user._id
    });
  
    user.allProperties.push(newProperty._id);
    await user.save({ session });
  
    await session.commitTransaction();
  
      
    return new Response('Property created', { status: 201 });
    } catch (error: any) {
        return new Response(error.message, { status: 500 });
    }
}
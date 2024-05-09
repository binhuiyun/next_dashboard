import Property from "@models/property";
import { connectToDB } from "@utils/database";

import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const GET = async (req, {params}) => {
  await connectToDB();
  const propertyExists = await Property.findOne({ _id: params.id}).populate(
    "creator"
  );

  if (propertyExists) {
    return new Response(JSON.stringify(propertyExists), { status: 200 });
  } else {
    return new Response(error.message, { status: 500 });
  }
};

export const PATCH = async (req,{params}) => {

  const { title, description, price, propertyType, location, photo } = await req.json();
  try {
    await connectToDB();
    const photoUrl = await cloudinary.uploader.upload(photo);
    await Property.findByIdAndUpdate(
      { _id: params.id },
      {
        title,
        description,
        price,
        propertyType,
        location,
        photo: photoUrl.url || photo,
      }
    );
    return new Response("Property updated", { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

export const DELETE = async (req, {params}) => {
 
  try {
    await connectToDB();
    const properyToDelete = await Property.findByIdAndDelete(params.id).populate(
      "creator"
    );
    if (!properyToDelete) {
      return new Response("Property not found", { status: 404 });
    }

    properyToDelete.creator.allProperties.pull(properyToDelete);
    await properyToDelete.creator.save();
    console.log("delete=====================");
    return new Response("Property deleted", { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

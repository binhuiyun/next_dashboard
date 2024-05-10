import Property from "@models/property";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";
import User from "@models/user";
import { NextApiRequest, NextApiResponse } from "next";

import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { SortOrder } from "mongoose";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface SortOptions {
  [key: string]: SortOrder;
}

export const GET = async (req, res: NextApiResponse) => {
  //req.query is undefined, so here using URLSearchParams
  const { searchParams } = new URL(req.url);
  const _start = parseInt(searchParams.get("_start")) || 0;
  const _end = parseInt(searchParams.get("_end")) || 10;
  const _sort = searchParams.get("_sort") || "";
  const _order = searchParams.get("_order") || "";

  const title_like = searchParams.get("title_like") || "";
  const propertyType = searchParams.get("propertyType") || "";
  const sortOptions: SortOptions = {};
  if (_sort !== "") {
    sortOptions[_sort] = _order === "asc" ? 1 : -1;
  }
  try {
    await connectToDB();
    const query: any = {};

    if (propertyType !== "") {
      query.propertyType = propertyType;
    }
    if (title_like) {
      query.title = { $regex: title_like, $options: "i" };
    }
    //  console.log("query............",query);
    const count = await Property.countDocuments(query);
    //  console.log("count............",count);
    const properties = await Property.find(query)
      .limit(_end)
      .skip(_start)
      .sort(sortOptions);

    //  res.header('X-Total-Count', count.toString());
    //   res.header('Access-Control-Expose-Headers', 'X-Total-Count');

    return new Response(JSON.stringify({ properties, count }), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
};

export const POST = async (req) => {
  const { title, description, price, propertyType, location, photo, email } =
    await req.json();
  try {
    await connectToDB();
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("User not found");

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newProperty = await Property.create({
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoUrl.url,
      creator: user._id,
    });

    user.allProperties.push(newProperty._id);
    await user.save({ session });

    await session.commitTransaction();

    return new Response("Property created", { status: 201 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
};

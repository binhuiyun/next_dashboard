import authOptions from "@app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import React from "react";
import { connectToDB } from "@utils/database";
import User from "@models/user";

export default async function LoginLayout({
  children,
}: React.PropsWithChildren) {
  const data = await getData();

  if (data.session?.user) {
    return redirect("/");
  }
   
  return <>{children}</>;
}

async function getData() {
  const session = await getServerSession(authOptions);
  try{
     await connectToDB();
      // check if user already exists
      const user = session?.user;
      if (user){
      const userExists = await User.findOne({ email: user.email });
      // if not, create a new document and save user in MongoDB
      if (!userExists) {
        console.log("User does not exist, creating new user...");
        await User.create({
          email: user.email,
          name: user.name,
          avatar: user.image,
        });
      }
    }
  }catch (error:any) {
    console.log("Error checking if user exists: ", error.message);
  }
  return {
    session,
  };
}



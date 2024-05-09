"use client";

import {useOne} from "@refinedev/core";
import { Profile } from '@components';
import {useSession } from "next-auth/react";

const MyProfile = () => {
  const {data: session} = useSession();

  const { data, isLoading, isError } = useOne({
    resource: "agents",
    id: session?.user?.id,
})
  console.log("data", data?.data);

  const myProfile = data?.data ?? [];

  if(isLoading) return <div>loading...</div>
  if(isError) return <div>error...</div>

  return (
    <>
    <Profile
      type="My"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
 
  </>
  )
}

export default MyProfile
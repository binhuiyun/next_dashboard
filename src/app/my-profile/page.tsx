"use client";

import {useGetIdentity, useOne} from "@refinedev/core";
import { Profile } from '@components';


const MyProfile = () => {

 const {data: user} = useGetIdentity();
 console.log("profile user", user);
  

  const { data, isLoading, isError } = useOne({
    resource: "agents",
    id: user?.email,
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
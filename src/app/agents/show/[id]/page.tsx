"use client";

import { useShow} from "@refinedev/core";

import { Profile } from '@components';

const AgentProfile = () => {
  const { queryResult } = useShow();
  const { data, isLoading, isError } = queryResult;
  

  console.log("agent profile", data);

  const myProfile = data?.data ?? [];

  if(isLoading) return <div>loading...</div>
  if(isError) return <div>error...</div>

  return (
    <Profile
      type="Agent"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  )
}

export default AgentProfile
import authOptions from "@app/api/auth/[...nextauth]/options";
import { ThemedLayout } from "@components/themed-layout-old";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({ children }: React.PropsWithChildren) {
  const data = await getData();
  console.log("profile data", data);

  if (!data.session?.user) {
    return redirect("/login");
  }

  return <ThemedLayout>{children}</ThemedLayout>;
}

async function getData() {
  const session = await getServerSession(authOptions);
  return {
    session,
  };
}

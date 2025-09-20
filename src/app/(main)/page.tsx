"use client";

import { useUserStore } from "@/store/userStore";
import HomePage from "./home/page";
// import { useEffect } from "react";

export default function Home() {
  // const fetchUser = useUserStore((state) => state.fetchUser);
  const user = useUserStore((state) => state.user);

  console.log(user);

  // useEffect(() => {
  //   const user = fetchUser();
  //   console.log(user);
  // }, [fetchUser]);
  return (
    <div className="">
      <HomePage />
    </div>
  );
}

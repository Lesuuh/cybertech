"use client";

import { useUserStore } from "@/store/userStore";
import HomePage from "./home/page";
import { useProfileStore } from "@/store/profileStore";


export default function Home() {
  const user = useUserStore((state) => state.user);
  console.log("user", user);
  const profile = useProfileStore((state) => state.profile);
  console.log("profile:", profile);

  return (
    <div className="">
      <HomePage />
    </div>
  );
}

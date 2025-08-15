"use client";

import { useUserStore } from "@/store/userStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, pathname, router]);

  return <>{user && children}</>;
}




// then wrap the protected routes around it
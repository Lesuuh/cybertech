// "use client";

// import { useUserStore } from "@/store/userStore";
// import { useRouter, usePathname } from "next/navigation";

// export default function AuthGuard({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const user = useUserStore((state) => state.user);
//   const loading = useUserStore((state) => state.loading);

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center text-gray-600">
//         Checking authentication...
//       </div>
//     );
//   }

//   if (!user) {
//     router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
//     return null;
//   }

//   return <>{children}</>;
// }

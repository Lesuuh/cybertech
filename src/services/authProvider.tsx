// "use client";

// import { useEffect } from "react";
// import { supabase } from "@/lib/supabase";
// import { useUserStore } from "@/store/userStore";
// import { fetchProfile } from "./profileService";

// export default function AuthProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const setUser = useUserStore((state) => state.setUser);

//   useEffect(() => {
//     // 1️⃣ On mount: get current session
//     supabase.auth.getSession().then(async ({ data: { session } }) => {
//       const user = session?.user ?? null;
//       setUser(user, false);

//       // 👇 Fetch profile if user exists
//       if (user) {
//         await fetchProfile(user.id);
//       }
//     });

//     // 2️⃣ Listen for auth state changes
//     const { data: subscription } = supabase.auth.onAuthStateChange(
//       async (_event, session) => {
//         const user = session?.user ?? null;
//         setUser(user, false);

//         // 👇 Also refetch when logged in/out
//         if (user) {
//           await fetchProfile(user.id);
//         } else {
//           // Clear profile if logged out
//           const { setProfile } = (
//             await import("@/store/profileStore")
//           ).useProfileStore.getState();
//           setProfile(null);
//         }

//         console.log("Auth event:", _event);
//       }
//     );

//     return () => subscription?.subscription?.unsubscribe();
//   }, [setUser]);

//   return <>{children}</>;
// }

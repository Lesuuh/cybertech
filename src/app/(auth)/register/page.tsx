// "use client";

// import type React from "react";

// import { useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import {
//   Zap,
//   Eye,
//   EyeOff,
//   Mail,
//   Lock,
//   User,
//   Phone,
//   Chrome,
// } from "lucide-react";
// import { toast } from "sonner";
// import { useForm } from "react-hook-form";
// import { useUserStore } from "@/store/userStore";
// import { useRouter } from "next/navigation";
// import { createProfile } from "@/services/profileService";

// type RegisterProps = {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   phoneNumber: number;
//   confirmPassword: string;
//   agree: boolean;
//   newsletter: boolean;
// };

// export default function RegisterPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isGoogleLoading, setIsGoogleLoading] = useState(false);

//   const router = useRouter();
//   const registerUser = useUserStore((state) => state.register);
//   const [authError, setAuthError] = useState<string | null>(null);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm<RegisterProps>({ mode: "onBlur" });

//   const onSubmit = async (data: RegisterProps) => {
//     setAuthError(null);

//     const {
//       email,
//       password,
//       confirmPassword,
//       firstName,
//       lastName,
//       phoneNumber,
//       agree,
//       newsletter,
//     } = data;

//     try {
//       if (password !== confirmPassword) {
//         setAuthError("Password must match");
//         return;
//       }

//       const user = await registerUser(email, password);
//       if (user) {
//         await createProfile(
//           user.id,
//           email,
//           firstName,
//           lastName,
//           phoneNumber,
//           agree,
//           newsletter
//         );
//       }
//       toast.success("Your registration was successful");
//       router.push("/login");
//     } catch (err: any) {
//       console.error(err);
//       const errorMessage =
//         err.message ||
//         "Something went wrong with registration, please try again later";
//       setAuthError(errorMessage);
//     }
//   };

//   const password = watch("password");

//   // Google Sign in
//   const handleGoogleSignup = async () => {
//     setIsGoogleLoading(true);

//     // Simulate Google OAuth flow
//     setTimeout(() => {
//       setIsGoogleLoading(false);
//       toast.success("Google Account Created", {
//         description:
//           "Welcome to TechHub! Your account has been created successfully.",
//       });
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <Link href="/" className="inline-flex items-center gap-2 mb-6">
//             <Zap className="h-8 w-8 text-black" />
//             <span className="text-2xl font-bold text-black">Cyber</span>
//           </Link>
//         </div>

//         <Card className="bg-white border-gray-200 shadow-lg">
//           <CardHeader className="space-y-1">
//             <CardTitle className="text-2xl text-center text-black">
//               Create Account
//             </CardTitle>
//             <CardDescription className="text-center text-gray-600">
//               Fill in your details to get started
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="w-full bg-white hover:bg-gray-50 text-black border-gray-300 font-medium"
//                 onClick={handleGoogleSignup}
//                 disabled={isGoogleLoading}
//               >
//                 <Chrome className="mr-2 h-4 w-4" />
//                 {isGoogleLoading
//                   ? "Creating account with Google..."
//                   : "Sign up with Google"}
//               </Button>

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <span className="w-full border-t border-gray-300" />
//                 </div>
//                 <div className="relative flex justify-center text-xs uppercase">
//                   <span className="bg-white px-2 text-gray-500">
//                     Or create account with email
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
//               <div className="grid grid-cols-2 gap-4">
//                 {/* First Name */}
//                 <div className="space-y-2">
//                   <Label htmlFor="firstName" className="text-black">
//                     First Name
//                   </Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-4 h-4 w-4 text-gray-500" />
//                     <Input
//                       id="firstName"
//                       type="text"
//                       placeholder="John"
//                       {...register("firstName", {
//                         required: "First name is required",
//                         minLength: {
//                           value: 3,
//                           message: "Name must be at least 3 characters",
//                         },
//                       })}
//                       className="pl-10 py-6 bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black"
//                     />
//                   </div>
//                   {errors.firstName && (
//                     <p className="text-red-500 text-sm">
//                       {errors.firstName.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Last Name */}
//                 <div className="space-y-2">
//                   <Label htmlFor="lastName" className="text-black">
//                     Last Name
//                   </Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-4 h-4 w-4 text-gray-500" />
//                     <Input
//                       id="lastName"
//                       type="text"
//                       placeholder="Doe"
//                       {...register("lastName")}
//                       className="pl-10 py-6 bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black"
//                     />
//                   </div>
//                   {errors.lastName && (
//                     <p className="text-red-500 text-sm">
//                       {errors.lastName.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-black">
//                   Email
//                 </Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-4 h-4 w-4 text-gray-500" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="john@example.com"
//                     {...register("email", {
//                       required: "Email is required",
//                       pattern: {
//                         value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                         message: "Enter a valid email address",
//                       },
//                     })}
//                     className="pl-10 py-6 bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black"
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="text-red-500 text-sm">{errors.email.message}</p>
//                 )}
//               </div>

//               {/* Phone */}
//               <div className="space-y-2">
//                 <Label htmlFor="phone" className="text-black">
//                   Phone Number
//                 </Label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-4 h-4 w-4 text-gray-500" />
//                   <Input
//                     id="phone"
//                     type="tel"
//                     placeholder="+1 (555) 123-4567"
//                     {...register("phoneNumber", {
//                       required: "Phone Number is required",
//                       pattern: {
//                         value: /^\+?[0-9]\d{7,14}$/,
//                         message: "Enter a valid phone number",
//                       },
//                     })}
//                     className="pl-10 py-6 bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black"
//                   />
//                 </div>
//                 {errors.phoneNumber && (
//                   <p className="text-red-500 text-sm">
//                     {errors.phoneNumber.message}
//                   </p>
//                 )}
//               </div>

//               {/* Password */}
//               <div className="space-y-2">
//                 <Label htmlFor="password" className="text-black">
//                   Password
//                 </Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-4 h-4 w-4 text-gray-500" />
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Create a strong password"
//                     {...register("password", {
//                       required: "Password is required",
//                       minLength: {
//                         value: 8,
//                         message: "Password must be at least 8 characters",
//                       },
//                       pattern: {
//                         value:
//                           /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).+$/,
//                         message:
//                           "Password must include uppercase, lowercase, number, and special character",
//                       },
//                     })}
//                     className="pl-10 pr-10 py-6 bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-4 text-gray-500 hover:text-black"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-red-500 text-sm">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>

//               {/* Confirm Password */}
//               <div className="space-y-2">
//                 <Label htmlFor="confirmPassword" className="text-black">
//                   Confirm Password
//                 </Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-4 h-4 w-4 text-gray-500" />
//                   <Input
//                     id="confirmPassword"
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="Confirm your password"
//                     {...register("confirmPassword", {
//                       required: "Confirm Password is required",
//                       validate: (value) =>
//                         value === password || "Passwords do not match",
//                     })}
//                     className="pl-10 pr-10 py-6 bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-4 text-gray-500 hover:text-black"
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </button>
//                 </div>
//                 {errors.confirmPassword && (
//                   <p className="text-red-500 text-sm">
//                     {errors.confirmPassword.message}
//                   </p>
//                 )}
//               </div>

//               {/* Checkboxes */}
//               <div className="space-y-3">
//                 <div className="flex items-center space-x-2">
//                   <input
//                     id="terms"
//                     type="checkbox"
//                     {...register("agree", {
//                       required: "You must agree before continuing",
//                     })}
//                     className="border-gray-300 data-[state=checked]:bg-black"
//                   />
//                   <Label htmlFor="terms" className="text-sm text-gray-600">
//                     I agree to the{" "}
//                     <Link
//                       href="/terms"
//                       className="text-black hover:text-gray-600"
//                     >
//                       Terms of Service
//                     </Link>{" "}
//                     and{" "}
//                     <Link
//                       href="/privacy"
//                       className="text-black hover:text-gray-600"
//                     >
//                       Privacy Policy
//                     </Link>
//                   </Label>
//                 </div>
//                 {errors.agree && (
//                   <p className="text-red-500 text-sm">{errors.agree.message}</p>
//                 )}

//                 <div className="flex items-center space-x-2">
//                   <input
//                     id="newsletter"
//                     type="checkbox"
//                     {...register("newsletter")}
//                     className="border-gray-300 data-[state=checked]:bg-black"
//                   />
//                   <Label htmlFor="newsletter" className="text-sm text-gray-600">
//                     Subscribe to our newsletter for the latest tech deals
//                   </Label>
//                 </div>
//               </div>

//               {authError && (
//                 <p className="text-red-500 text-sm text-center w-full bg-red-100 border border-red-100 py-2 rounded-sm">
//                   {authError}
//                 </p>
//               )}

//               {/* Submit Button */}
//               <Button
//                 type="submit"
//                 className="w-full py-6 bg-black hover:bg-gray-800 text-white"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? "Creating Account..." : "Create Account"}
//               </Button>
//             </form>

//             <div className="mt-6 text-center">
//               <p className="text-gray-600">
//                 Already have an account?{" "}
//                 <Link
//                   href="/login"
//                   className="text-black hover:text-gray-600 font-medium"
//                 >
//                   Sign in here
//                 </Link>
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

import React from "react";

const Register = () => {
  return <div>Register</div>;
};

export default Register;

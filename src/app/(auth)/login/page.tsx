"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Zap, Eye, EyeOff, Mail, Lock, Chrome } from "lucide-react";
import { toast } from "sonner";
import { useUserStore } from "@/store/userStore";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchProfile } from "@/services/profileService";

type LoginProps = {
  email: string;
  password: string;
};
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginProps>();

  const login = useUserStore((state) => state.login);
  const user = useUserStore((state) => state.user);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const router = useRouter();

  const onSubmit = async (data: LoginProps) => {
    const { email, password } = data;
    console.log(email, password);
    try {
      await login(email, password);

      toast.success("Login was successful");
      if (user) {
        await fetchProfile(user.id);
      }
      router.push(redirect);
    } catch (error: any) {
      const message = error?.message || "Something went wrong during login";
      toast.error(message);
      setAuthError(message);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);

    // Simulate Google OAuth flow
    setTimeout(() => {
      setIsGoogleLoading(false);
      toast.success("Google Login Successful", {
        description: "Welcome back to TechHub!",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-between ">
      <div className="w-4xl px-16 text-white bg-blue-900 h-screen  flex flex-col items-center justify-center text-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold  mb-2">Login</h1>
          <p className="text-gray-100">
            Sign in to your account to continue shopping with cybertech shop
          </p>
        </div>

        <div className="w-full ">
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 w-full mt-6"
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="">
                  Email
                </Label>
                <div className="relative w-full">
                  <Mail className="absolute left-3 top-4 h-4 w-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="janedoe@yourmail.com"
                    {...register("email", { required: "Email is required" })}
                    className="pl-10 py-6 w-full bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-4 h-4 w-4 text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="pl-10 py-6 pr-10 bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-4 text-gray-500 hover:text-black"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    // checked={formData.rememberMe}
                    // onCheckedChange={(checked) =>
                    //   setFormData((prev) => ({
                    //     ...prev,
                    //     rememberMe: checked as boolean,
                    //   }))
                    // }
                    className="border-gray-300 data-[state=checked]:bg-black"
                  />
                  <Label htmlFor="remember" className="text-sm ">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm  hover:text-gray-100"
                >
                  Forgot password?
                </Link>
              </div>

              {authError && (
                <p className="text-red-500 text-sm text-center w-full bg-red-100 border border-red-100 py-2 rounded-sm">
                  {authError}
                </p>
              )}
              <Button
                type="submit"
                className="w-full py-6 bg-black hover:bg-gray-800 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-white hover:text-gray-100 font-medium"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white">
        {/* <img src="/login_image.jpeg" alt="" className="" /> */}
      </div>
    </div>
  );
}

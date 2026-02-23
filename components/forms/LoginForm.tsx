"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { loginAction } from "@/app/actions/loginAction";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Client-side validation
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const result = await loginAction(formData);

      if (result.success) {
        toast.success(result.message);
        router.push("/");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-[90%] sm:w-[80%]">
      <div>
        <Label htmlFor="email" className="block text-md mb-1">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter Your Email"
          className="w-full px-3 h-11"
          required
        />
      </div>

      <div>
        <Label htmlFor="password" className="block text-md mb-1">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            className="w-full px-3 h-11"
            required
          />
          <span
            className="absolute top-3 right-4 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </span>
        </div>
      </div>

      <div className="mt-1 flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember-me" name="remember-me" value="true" />
          <p className="text-color">Remember Password</p>
        </div>
        <div>
          <Link
            href="/forgot-password"
            className="text-sm hover:underline text-red-600"
          >
            Forgot Password
          </Link>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}

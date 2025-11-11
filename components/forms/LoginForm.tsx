"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Form from "next/form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

export default function LoginForm() {
  const [password, setPassword] = useState(false);
  const router = useRouter();
  const redirect = useSearchParams()?.get("redirect");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {};
  return (
    <Form action="/login" className="space-y-5 w-[80%]" onSubmit={handleSubmit}>
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
        />
      </div>

      <Label htmlFor="password" className="block text-md mb-1">
        Password
      </Label>
      <div className="relative">
        <Input
          id="password"
          name="password"
          type={password ? "password" : "text"}
          placeholder="Enter Your Password"
          className="w-full  px-3 h-11 "
        />
        <span
          className="absolute top-3 right-4 cursor-pointer"
          onClick={() => setPassword(!password)}
        >
          {password ? <EyeOff /> : <Eye />}
        </span>
      </div>
      <div className="text-right mt-1 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember-me" name="remember-me" value="true" />
          <p className="text-color">Remember Password</p>
        </div>
        <Link
          href="/forgot-password"
          className="text-sm hover:underline text-red-600"
        >
          Forgot Password
        </Link>
      </div>

      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </Form>
  );
}

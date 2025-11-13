"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import Form from "next/form";
import { Button } from "../ui/button";

export default function NewPassword() {
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {};
  return (
    <Form
      action="/login"
      className="space-y-5 sm:w-[80%]"
      onSubmit={handleSubmit}
    >
      <Label htmlFor="newPassword" className="block text-md mb-1">
        Password
      </Label>
      <div className="relative">
        <Input
          id="newPassword"
          name="newPassword"
          type={password ? "password" : "text"}
          placeholder="Enter Your Password"
          className="w-full  px-3 h-11  "
        />
        <span
          className="absolute top-3 right-4 cursor-pointer"
          onClick={() => setPassword(!password)}
        >
          {password ? <EyeOff /> : <Eye />}
        </span>
      </div>
      <Label htmlFor="password" className="block text-md mb-1">
        Confirm Password
      </Label>
      <div className="relative">
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type={confirmPassword ? "password" : "text"}
          placeholder="Enter Your Password"
          className="w-full  px-3 h-11  "
        />
        <span
          className="absolute top-3 right-4 cursor-pointer"
          onClick={() => setConfirmPassword(!confirmPassword)}
        >
          {confirmPassword ? <EyeOff /> : <Eye />}
        </span>
      </div>

      <Button type="submit" className="w-full ">
        Reset Password
      </Button>
    </Form>
  );
}

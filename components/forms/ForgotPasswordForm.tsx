"use client";

import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Form from "next/form";
import { Button } from "../ui/button";

export default function ForgotPasswordForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {};
  return (
    <Form
      action="/forgot-password"
      className="space-y-5 w-[80%]"
      onSubmit={handleSubmit}
    >
      <div>
        <Label htmlFor="email" className="block text-md mb-1">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter Your Email"
          className="w-full  px-3 h-11"
        />
      </div>

      <Button type="submit" className="w-full py-2 cursor-pointer">
        Continue
      </Button>
    </Form>
  );
}

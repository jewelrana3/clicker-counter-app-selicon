"use client";

import { Eye, EyeOff } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { changePasswordAction } from "@/app/actions/changePasswordAction";
import { Loader2 } from "lucide-react";

export default function ChangePassword() {
  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);

  const toggleVisibility = (field: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget); // ✅ use the form element

    const currentPassword = data.get("currentPassword");
    const newPassword = data.get("newPassword");
    const confirmPassword = data.get("confirmPassword");

    const payload = {
      currentPassword,
      newPassword,
      confirmPassword,
    };

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const result = await changePasswordAction(payload);
      if (result.success) {
        toast.success(result.message);
        formRef.current?.reset();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className=" mx-auto w-[50%] space-y-6 "
    >
      {/* Current Password */}
      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">
          Current Password
        </label>
        <div className="relative">
          <Input
            name="currentPassword"
            type={showPassword.current ? "text" : "password"}
            placeholder="Enter Password"
            className="w-full px-4 h-12 rounded-full border focus:outline-none"
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
            onClick={() => toggleVisibility("current")}
          >
            {showPassword.current ? <Eye /> : <EyeOff />}
          </span>
        </div>
      </div>

      {/* New Password */}
      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">
          New Password
        </label>
        <div className="relative">
          <Input
            name="newPassword"
            type={showPassword.new ? "text" : "password"}
            placeholder="Enter Password"
            className="w-full px-4 h-12 rounded-full border focus:outline-none"
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
            onClick={() => toggleVisibility("new")}
          >
            {showPassword.new ? <Eye /> : <EyeOff />}
          </span>
        </div>
      </div>

      {/* Re-Type Password */}
      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <Input
            name="confirmPassword"
            type={showPassword.confirm ? "text" : "password"}
            placeholder="Enter Password"
            className="w-full px-4 h-12 rounded-full border focus:outline-none"
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
            onClick={() => toggleVisibility("confirm")}
          >
            {showPassword.confirm ? <Eye /> : <EyeOff />}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 h-11 rounded-full text-lg font-medium"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Password"
          )}
        </Button>
      </div>
    </form>
  );
}

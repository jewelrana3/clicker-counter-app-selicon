"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Form from "next/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProfileFormData = {
  name: string;
  email: string;
  gender: string;
  image?: string;
  contact: string;
  date: string;
  address: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<ProfileFormData | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>("/profile.jpg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    file && setFile(file);

    if (file) {
      const url = URL.createObjectURL(file);

      setImage(url);
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) =>
      prev
        ? {
            ...prev,
            [name]: name === "age" ? parseInt(value) || 0 : value,
          }
        : null
    );
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="mt-[4%]">
      <Form action="/profile" onSubmit={handleSubmit}>
        {/* Profile Image */}
        <div className="flex justify-center mb-10 relative">
          <div className="w-[150px] h-[150px] relative rounded-full overflow-hidden border-2 border-teal-700">
            {image ? (
              <Image
                src={image}
                alt="profile"
                fill
                priority
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>

          {/* Edit Icon */}
          <div
            className="absolute bottom-2 right-[calc(50%-64px)] bg-white p-2 rounded-full border shadow-sm cursor-pointer"
            onClick={handleImageUpload}
          >
            <Pencil className="w-5 h-5 text-teal-700" />
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className="text-sm ">Name</Label>
            <Input
              name="name"
              value={profile?.name || ""}
              onChange={handleChange}
              placeholder="Enter your name"
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm ">Destination</Label>
            <Input
              name="email"
              value={profile?.email || ""}
              placeholder="Enter your email"
              className="mt-1"
              disabled
            />
          </div>

          <div>
            <Label className="text-sm ">Contact</Label>
            <Input
              name="contact"
              type="number"
              value={profile?.contact || ""}
              onChange={handleChange}
              className="mt-1"
              placeholder="Enter your contact number"
            />
          </div>

          <div>
            <Label className="text-sm ">Email</Label>
            <Input
              name="email"
              type="text"
              value={profile?.email || ""}
              onChange={handleChange}
              className="mt-1"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Label className="text-sm ">Date of Birth</Label>
            <Input
              name="date"
              type="date"
              value={profile?.date || ""}
              onChange={handleChange}
              className="mt-1"
              placeholder="Enter your date of birth"
            />
          </div>

          <div>
            <Label className="text-sm ">Gender</Label>
            <Select>
              <SelectTrigger className="w-full rounded-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm ">Address</Label>
            <Input
              name="address"
              type="text"
              value={profile?.address || ""}
              onChange={handleChange}
              className="mt-1"
              placeholder="Enter your address"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <Button
            type="submit"
            className="common-bg-color text-white w-full h-10 cursor-pointer"
          >
            Save & Change
          </Button>
        </div>
      </Form>
    </div>
  );
}

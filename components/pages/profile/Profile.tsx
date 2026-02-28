"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil, Loader2 } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProfileAction } from "@/app/actions/getProfileAction";
import { updateProfileAction } from "@/app/actions/updateProfileAction";
import { getImageUrl } from "@/lib/GetImageUrl";
import toast from "react-hot-toast";

type ProfileFormData = {
  name: string;
  email: string;
  gender: string;
  image?: string;
  dob: string;
  address: string;
  bio: string;
  role: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<ProfileFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getProfileAction();
        if (result.success) {
          setProfile(result.data);
          if (result.data.image) {
            setImagePreview(getImageUrl(result.data.image));
          }
          console.log("result.data ==========>>>", result.data);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleGenderChange = (value: string) => {
    setProfile((prev) => (prev ? { ...prev, gender: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile) return;

    setUpdating(true);
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("gender", profile.gender);
    formData.append("dob", profile.dob);
    formData.append("bio", profile.bio || "");
    formData.append("address", profile.address || "");

    if (file) {
      formData.append("image", file);
    }

    // Debugging FormData
    const formEntries = Object.fromEntries(formData.entries());
    console.log("Submitting FormData ======>>> ", formEntries);

    try {
      const result = await updateProfileAction(formData);
      if (result.success) {
        toast.success(result.message);
        // Optionally refresh profile data from server
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin h-10 w-10 text-teal-700" />
      </div>
    );
  }

  return (
    <div className="mt-[4%] max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit}>
        {/* Profile Image */}
        <div className="flex justify-center mb-10 relative">
          <div className="w-[150px] h-[150px] relative rounded-full overflow-hidden border-2 border-teal-700">
            {imagePreview ? (
              <Image
                src={imagePreview}
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
            className="absolute bottom-2 right-[calc(50%-64px)] bg-white p-2 rounded-full border shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
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
            className="hidden"
          />
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Name</Label>
            <Input
              name="name"
              value={profile?.name || ""}
              onChange={handleChange}
              placeholder="Enter your name"
              className="mt-1 h-11"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Email</Label>
            <Input
              name="email"
              value={profile?.email || ""}
              placeholder="Your email address"
              className="mt-1 h-11 bg-gray-50"
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Date of Birth</Label>
            <Input
              name="dob"
              type="date"
              value={profile?.dob ? profile.dob.split("T")[0] : ""}
              onChange={handleChange}
              className="mt-1 h-11"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Gender</Label>
            <Select onValueChange={handleGenderChange} value={profile?.gender}>
              <SelectTrigger className="w-full h-12 rounded-3xl bg-[#FEFEFE] border-[#E0E0E0]">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Role</Label>
            <Input
              name="role"
              value={profile?.role || ""}
              className="mt-1 h-11 bg-gray-50 capitalize"
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Address</Label>
            <Input
              name="address"
              value={profile?.address || ""}
              onChange={handleChange}
              className="mt-1 h-11"
              placeholder="Enter your address"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label className="text-sm font-medium">Bio</Label>
            <textarea
              name="bio"
              value={profile?.bio || ""}
              onChange={handleChange}
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
              placeholder="Tell us something about yourself"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-10 flex justify-center">
          <Button
            type="submit"
            disabled={updating}
            className="common-bg-color text-white w-full max-w-sm h-11 cursor-pointer transition-all hover:opacity-90 active:scale-[0.98]"
          >
            {updating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Save & Change"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

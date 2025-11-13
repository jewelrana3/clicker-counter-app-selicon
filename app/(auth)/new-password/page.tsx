import NewPassword from "@/components/forms/NewPassword";
import BackButton from "@/components/share/BackButton";
import Title from "@/components/share/Title";
import Image from "next/image";

export default function NewPasswordPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-5 h-screen">
      {/* image */}
      <div
        className="flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url("/auth/below.jpg")' }}
      >
        <Image
          src="/auth/logo.png"
          alt="User Avatar"
          className="w-60 h-60 lg:w-80 lg:h-80"
          width={350}
          height={350}
        />
      </div>

      {/* Login card */}
      <div className="flex flex-col items-center justify-center bg-card py-10 sm:p-10 relative">
        <BackButton />
        <Title>Set a new password</Title>

        <p className="mb-4 text-gray-400 text-center">
          Create a new password. Ensure it differs from <br />
          previous ones for security
        </p>

        <NewPassword />
      </div>
    </div>
  );
}

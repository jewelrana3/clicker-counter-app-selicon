import Image from "next/image";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import Title from "@/components/share/Title";
import { FaArrowLeftLong } from "react-icons/fa6";
import BackButton from "@/components/share/BackButton";

export default function ForgotPassword() {
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
          width={350}
          height={350}
          className="w-60 h-60 lg:w-80 lg:h-80"
        />
      </div>

      {/* Login card */}
      <div className="flex flex-col items-center justify-center bg-card sm:p-10 relative">
        <BackButton />
        <Title>Forgot Password</Title>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}

import VerifyOtp from "@/components/forms/VerifyOtp";
import BackButton from "@/components/share/BackButton";
import Title from "@/components/share/Title";
import Image from "next/image";

export default function VerifyOtpPage() {
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
      <div className="flex flex-col items-center justify-center bg-card sm:p-10 relative">
        <BackButton />
        <Title>Verification code</Title>
        <p className="text-[#3E464F] text-center w-full sm:w-[60%] text-lg mb-7">
          We sent a reset link to contact@dscode...com <br /> enter 5 digit code
          that is mentioned in the email
        </p>
        <VerifyOtp />
      </div>
    </div>
  );
}

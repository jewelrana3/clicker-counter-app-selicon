import Loading from "@/app/loading";
import LoginForm from "@/components/forms/LoginForm";
import Title from "@/components/share/Title";
import Image from "next/image";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-5 h-screen">
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
      <div className="flex flex-col items-center justify-center bg-card sm:p-10 ">
        <Title>Login</Title>
        <Suspense fallback={<Loading />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

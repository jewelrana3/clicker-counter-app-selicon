import LoginForm from "@/components/forms/LoginForm";
import Title from "@/components/share/Title";
import Image from "next/image";

export default function LoginPage() {
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
          className=""
          width={350}
          height={350}
        />
      </div>

      {/* Login card */}
      <div className="flex flex-col items-center justify-center bg-card p-10 ">
        <Title>Login</Title>
        <LoginForm />
      </div>
    </div>
  );
}

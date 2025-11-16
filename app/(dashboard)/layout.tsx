import type { Metadata } from "next";
import Sidebar from "@/sidebar/Sidebar";
import Header from "@/components/share/Header";

export const metadata: Metadata = {
  title: "Clicker Count App",
  description: "Clicker Count App with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex space-x-4 bg-[#F4F4F4] ">
      <aside className="">
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col">
        <div className="z-50">
          <Header />
        </div>

        <div className=" bg-[#FFFFFF] rounded-2xl flex-1 p-4">{children}</div>
      </div>
    </section>
  );
}

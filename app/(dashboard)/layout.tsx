import type { Metadata } from "next";
import Sidebar from "@/sidebar/Sidebar";

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
    <section className="flex space-x-4 bg-[#F4F4F4]">
      <aside className="p-2 ">
        <Sidebar />
      </aside>
      <main className=" flex-1 h-screen">
        <div className="sticky top-0 z-50">Header here</div>

        <div className=" bg-[#FFFFFF] p-5 rounded-2xl ">{children}</div>
      </main>
    </section>
  );
}

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "700"],
});

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
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${poppins.variable} antialiased `}
      >
        {children}
      </body>
    </html>
  );
}

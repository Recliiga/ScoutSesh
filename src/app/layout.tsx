import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Header from "@/components/Header";
import { getSession } from "@/services/authServices";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ScoutSesh",
  description:
    "ScoutSesh is a comprehensive athlete development platform designed to elevate your game to the next level. Whether you're an aspiring youth athlete or a seasoned pro in any sport, our tools and resources are tailored to help you reach your full potential.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getSession();

  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} antialiased text-accent-black flex flex-col min-h-screen`}
      >
        <Header user={user} />
        {children}
        <Footer />
      </body>
    </html>
  );
}

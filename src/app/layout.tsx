import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Header from "@/components/Header";
import { getSession } from "@/services/authServices";
import Footer from "@/components/Footer";
import { fetchLatestInvitationCode } from "@/services/invitationServices";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: { absolute: "ScoutSesh", template: "%s - ScoutSesh" },
  description:
    "ScoutSesh is a comprehensive athlete development platform designed to elevate your game to the next level. Whether you're an aspiring youth athlete or a seasoned pro in any sport, our tools and resources are tailored to help you reach your full potential.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getSession();
  const { invitationCode } = await fetchLatestInvitationCode();

  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} flex min-h-dvh flex-col text-accent-black antialiased`}
      >
        <Toaster position="top-right" reverseOrder={false} />
        <Header user={user} invitationCode={invitationCode} />
        {children}
        <Footer />
      </body>
    </html>
  );
}

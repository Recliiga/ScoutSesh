import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Header from "@/components/Header";
import { getSession } from "@/services/authServices";
import Footer from "@/components/Footer";
import { fetchLatestInvitationCode } from "@/services/invitationServices";
import { fetchNotifications } from "@/services/notificationServices";

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

  const { invitationCode } = await fetchLatestInvitationCode();
  const { notifications, error } = await fetchNotifications(user);
  if (error !== null) throw new Error(error);

  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} flex min-h-screen flex-col text-accent-black antialiased`}
      >
        <Header
          user={user}
          invitationCode={invitationCode}
          notifications={notifications}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}

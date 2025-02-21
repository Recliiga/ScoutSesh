import VerifyEmailPage from "@/components/VerifyEmailPage";
import { getSessionFromHeaders } from "@/services/authServices";
import React from "react";

export const metadata = {
  title: "Verify Email",
  description:
    "Verify your email address to complete the registration process and access your ScoutSesh account.",
};

export default async function EmailVerificationPage() {
  const user = await getSessionFromHeaders();

  return (
    <main className="flex-center flex-1 bg-accent-gray-100">
      <VerifyEmailPage user={user} />
    </main>
  );
}

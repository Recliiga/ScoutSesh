import VerifyEmailPage from "@/components/VerifyEmailPage";
import { getSessionFromHeaders } from "@/services/authServices";
import React from "react";

export default async function EmailVerificationPage() {
  const user = await getSessionFromHeaders();

  return (
    <main className="flex-center flex-1 bg-accent-gray-100">
      <VerifyEmailPage user={user} />
    </main>
  );
}

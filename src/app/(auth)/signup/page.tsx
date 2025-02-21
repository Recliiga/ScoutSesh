import SignupForm from "@/components/SignupForm";
import SignupFormFallback from "@/components/SignupFormFallback";
import { Suspense } from "react";

export const metadata = {
  title: "Sign Up",
  description:
    "Create your ScoutSesh account to start managing your athlete development journey. Sign up to get started.",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ orgId: string }>;
}) {
  const orgId = (await searchParams).orgId || "";

  return (
    <Suspense fallback={<SignupFormFallback />}>
      <SignupForm orgId={orgId} />
    </Suspense>
  );
}

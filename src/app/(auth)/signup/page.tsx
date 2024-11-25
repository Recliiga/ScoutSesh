import SignupForm from "@/components/SignupForm";
import SignupFormFallback from "@/components/SignupFormFallback";
import { Suspense } from "react";

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

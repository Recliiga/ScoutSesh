import SignupForm from "@/components/SignupForm";
import SignupFormFallback from "@/components/SignupFormFallback";
import { fetchCountries } from "@/services/userServices";
import { Suspense } from "react";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ orgId: string }>;
}) {
  const orgId = (await searchParams).orgId || "";

  const countries = await fetchCountries();

  return (
    <Suspense fallback={<SignupFormFallback />}>
      <SignupForm orgId={orgId} countries={countries} />
    </Suspense>
  );
}

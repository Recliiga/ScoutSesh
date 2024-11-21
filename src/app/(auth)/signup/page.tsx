import SignupForm from "@/components/SignupForm";
import SignupFormFallback from "@/components/SignupFormFallback";
import { fetchOrganization } from "@/actions/organizationActions";
import { Suspense } from "react";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ orgId: string }>;
}) {
  const orgId = (await searchParams).orgId || "";
  const { organization } = await fetchOrganization(orgId);

  return (
    <Suspense fallback={<SignupFormFallback />}>
      <SignupForm orgId={orgId} defaultOrganization={organization} />
    </Suspense>
  );
}

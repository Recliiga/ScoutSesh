import SignupForm from "@/components/SignupForm";
import SignupFormFallback from "@/components/SignupFormFallback";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupFormFallback />}>
      <SignupForm />
    </Suspense>
  );
}

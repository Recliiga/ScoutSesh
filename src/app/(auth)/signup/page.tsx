import SignupForm from "@/components/SignupForm";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}

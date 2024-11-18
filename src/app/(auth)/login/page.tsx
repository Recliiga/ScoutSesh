import LoginForm from "@/components/LoginForm";
import LoginFormFallback from "@/components/LoginPageFallback";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFormFallback />}>
      <LoginForm />
    </Suspense>
  );
}

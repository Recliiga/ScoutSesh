import LoginForm from "@/components/LoginForm";
import LoginFormFallback from "@/components/LoginPageFallback";
import { Suspense } from "react";

export const metadata = {
  title: "Login",
  description:
    "Access your ScoutSesh account to manage your athlete development journey. Log in to get started.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFormFallback />}>
      <LoginForm />
    </Suspense>
  );
}

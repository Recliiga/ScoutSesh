import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PasswordRecoveryForm from "@/components/password-and-security/PasswordRecoveryForm";

export const metadata = {
  title: "Password Recovery",
  description:
    "Reset your ScoutSesh account password. Enter your email to receive a password reset link.",
};

export default function PasswordRecovery() {
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">
            Password Recovery
          </CardTitle>
          <CardDescription className="text-center">
            We&apos;ll send a password reset link to your email
          </CardDescription>
        </CardHeader>
        <PasswordRecoveryForm />
        <CardFooter className="flex justify-center">
          <Link
            href="/login"
            className="flex items-center text-sm text-[#14a800] hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

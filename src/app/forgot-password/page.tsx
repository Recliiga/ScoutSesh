"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { sendPasswordResetEmail } from "@/actions/passwordResetActions";
import Error from "@/components/AuthError";

export default function PasswordRecovery() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const notAValidEmail = email
    ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    : true;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (notAValidEmail) return;
    setIsLoading(true);
    const { error } = await sendPasswordResetEmail(email);
    if (error !== null) {
      setError(error);
    } else {
      setIsEmailSent(true);
    }
    setIsLoading(false);
  };

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
        <CardContent>
          {!isEmailSent ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="mb-2 block">
                    Your email address
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-1"
                  />
                  {error ? <Error error={error} /> : null}
                </div>
                <Button
                  className="w-full bg-[#14a800] text-white hover:bg-[#14a800]/90"
                  type="submit"
                  disabled={isLoading || notAValidEmail}
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Send Reset Link
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-3 text-center">
              <p className="text-green-600">
                A password reset link has been sent to your email address.
              </p>
              <p className="text-sm">
                Please check your inbox and click on the link to reset your
                password. If you don&apos;t see the email, please check your
                spam folder.
              </p>
              <p className="text-sm text-gray-500">
                The link will expire in 1 hour for security reasons.
              </p>
            </div>
          )}
        </CardContent>
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

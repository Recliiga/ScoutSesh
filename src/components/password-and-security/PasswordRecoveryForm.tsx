"use client";

import React, { useState } from "react";
import { CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Error from "../AuthError";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { sendPasswordResetEmail } from "@/actions/passwordResetActions";

export default function PasswordRecoveryForm() {
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
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
            password. If you don&apos;t see the email, please check your spam
            folder.
          </p>
          <p className="text-sm text-gray-500">
            The link will expire in 1 hour for security reasons.
          </p>
        </div>
      )}
    </CardContent>
  );
}

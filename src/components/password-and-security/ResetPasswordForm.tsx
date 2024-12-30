"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Error from "../AuthError";
import { setNewPassword } from "@/actions/passwordResetActions";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm({
  userId,
}: {
  userId: string | null;
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const newPasswordError =
    formData.newPassword.length > 0 && formData.newPassword.length < 8;
  const confirmPasswordError =
    formData.confirmPassword.length > 0 &&
    formData.newPassword !== formData.confirmPassword;

  const cannotSubmit =
    newPasswordError ||
    confirmPasswordError ||
    !formData.newPassword.trim() ||
    !formData.confirmPassword.trim();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (cannotSubmit || !userId) return;

    setIsLoading(true);
    const { error } = await setNewPassword(userId, formData.newPassword);
    if (error) {
      setError(error);

      setIsLoading(false);
    } else {
      setIsUpdated(true);
      setIsLoading(false);
      setTimeout(() => {
        router.replace("/login");
      }, 1000);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">
          Password & Security
        </CardTitle>
      </CardHeader>
      <CardContent>
        {userId !== null ? (
          !isUpdated ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
                {newPasswordError ? (
                  <Error error={"Password must be at least 8 characters"} />
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {confirmPasswordError ? (
                  <Error error={"Passwords do not match"} />
                ) : null}
              </div>
              {error ? <Error error={error} /> : null}
              <Button
                className="w-full bg-[#14a800] text-white hover:bg-[#14a800]/90"
                type="submit"
                disabled={isLoading || cannotSubmit}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          ) : (
            <div className="space-y-3 text-center">
              <p className="text-green-600">
                Your password has been updated successfully.
              </p>
              <p className="text-sm text-gray-500">
                Please use your new password the next time you log in.
              </p>
              <p className="text-sm text-gray-500">Redirecting to login...</p>
            </div>
          )
        ) : (
          <div className="space-y-4 text-center">
            <p className="text-sm text-gray-500">
              This link is no longer valid. Please request a new one to reset
              your password.
            </p>
            <Link
              href={"/forgot-password"}
              className="mx-auto block w-fit rounded-md bg-[#14a800] px-4 py-2 text-sm font-medium text-white duration-200 hover:bg-[#14a800]/90"
            >
              Forgot Password
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

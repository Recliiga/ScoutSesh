import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChangePasswordForm from "@/components/password-and-security/ChangePasswordForm";

export default function PasswordSecurityPage() {
  return (
    <main className="flex-1 bg-gray-100 py-6">
      <div className="mx-auto w-[90%] max-w-4xl space-y-4 sm:space-y-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Password & Security</h1>
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Ensure your account is using a long, random password to stay
              secure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

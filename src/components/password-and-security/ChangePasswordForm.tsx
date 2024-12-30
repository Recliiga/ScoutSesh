"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Error from "@/components/AuthError";
import LoadingIndicator from "@/components/LoadingIndicator";
import { updatePassword } from "@/actions/userActions";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const newPasswordError = newPassword.trim() && newPassword.trim().length < 8;

  const confirmPasswordError =
    newPassword.trim() &&
    confirmPassword.trim() &&
    newPassword.trim() !== confirmPassword.trim();

  function clearInputFields() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  async function handlePasswordChange(e: React.FormEvent) {
    setMessage(null);
    setLoading(true);
    e.preventDefault();

    const { error } = await updatePassword(currentPassword, newPassword);

    if (error !== null) {
      setMessage({ type: "error", message: error });
    } else {
      clearInputFields();
      setMessage({
        type: "success",
        message: "Password updated successfully",
      });
    }

    setLoading(false);
  }

  const cannotSubmit =
    newPasswordError ||
    confirmPasswordError ||
    !currentPassword.trim() ||
    !newPassword.trim() ||
    !confirmPassword.trim();

  return (
    <form onSubmit={handlePasswordChange} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="current-password">Current Password</Label>
        <Input
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="new-password">New Password</Label>
        <Input
          id="new-password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        {newPasswordError ? (
          <Error error={"Password must be at least 8 characters long"} />
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm New Password</Label>
        <Input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {confirmPasswordError ? (
          <Error error={"Passwords do not match"} />
        ) : null}
        {message?.type === "error" ? <Error error={message.message} /> : null}
        {message?.type === "success" ? (
          <p className="text-sm text-accent-green-100">{message.message}</p>
        ) : null}
      </div>
      <Button
        type="submit"
        disabled={loading || cannotSubmit}
        className="bg-green-600 text-white hover:bg-green-700"
      >
        {loading ? (
          <>
            <LoadingIndicator /> Updating...
          </>
        ) : (
          "Update Password"
        )}
      </Button>
    </form>
  );
}

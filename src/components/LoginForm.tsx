"use client";
import React, { useState } from "react";
import AuthError from "./AuthError";
import LoadingIndicator from "./LoadingIndicator";
import { login } from "@/actions/authActions";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function clearInput(...names: string[]) {
    names.forEach((id) => {
      const element = document.getElementById(id) as HTMLInputElement;
      element.value = "";
    });
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const { error } = await login(formData);
    if (!error) {
      router.replace("/app");
    } else {
      clearInput("password");
      setLoading(false);
    }
    setError(error);
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm" htmlFor="email">
            Email
          </label>
          <input
            className="px-3 py-2 border rounded-md ring-accent-gray-200 focus-visible:ring-2 ring-offset-2 text-sm"
            id="email"
            name="email"
            placeholder="name@example.com"
            required
            type="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm" htmlFor="password">
            Password
          </label>
          <input
            className="px-3 py-2 border rounded-md ring-accent-gray-200 focus-visible:ring-2 ring-offset-2 text-sm"
            id="password"
            name="password"
            required
            type="password"
            placeholder="******"
          />
        </div>
        {error && <AuthError error={error} />}
        <button
          className="flex-center bg-accent-green-100 hover:bg-accent-green-100/90 disabled:bg-accent-green-100/50 px-4 py-2 rounded-md w-full font-medium text-sm text-white disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? <LoadingIndicator /> : "Log In"}
        </button>
      </div>
    </form>
  );
}

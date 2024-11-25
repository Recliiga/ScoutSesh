"use client";
import React, { useState } from "react";
import Error from "./AuthError";
import LoadingIndicator from "./LoadingIndicator";
import { login } from "@/actions/authActions";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const canSubmit = Boolean(email.trim()) && Boolean(password.trim());

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
      router.replace(redirectUrl);
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="******"
          />
        </div>
        {error && <Error error={error} />}
        <button
          className="flex-center bg-accent-green-100 hover:bg-accent-green-100/90 disabled:bg-accent-green-100/50 px-4 py-2 rounded-md w-full font-medium text-sm text-white disabled:cursor-not-allowed"
          type="submit"
          disabled={loading || !canSubmit}
        >
          {loading ? <LoadingIndicator /> : "Log In"}
        </button>
      </div>
    </form>
  );
}

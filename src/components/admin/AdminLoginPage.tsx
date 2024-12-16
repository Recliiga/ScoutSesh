"use client";
import React, { useState } from "react";
import LoadingIndicator from "../LoadingIndicator";
import Error from "../AuthError";
import { loginAdmin } from "@/actions/adminActions";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await loginAdmin(email, password);
    if (error) setError(error);
    setLoading(false);
  }

  const canSubmit = !!email.trim() && !!password.trim();
  return (
    <div className="flex-center flex-1">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-lg border border-accent-gray-200 bg-white p-3 shadow-sm sm:p-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-center text-2xl font-bold tracking-tight">
            Welcome to ScoutSesh Admin
          </h3>
          <p className="text-center text-sm text-accent-gray-300">
            Manage athletes and coaches with ease.
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                className="rounded-md border px-3 py-2 text-sm ring-accent-gray-200 ring-offset-2 focus-visible:ring-2"
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
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <input
                className="rounded-md border px-3 py-2 text-sm ring-accent-gray-200 ring-offset-2 focus-visible:ring-2"
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
              className="flex-center w-full rounded-md bg-accent-green-100 px-4 py-2 text-sm font-medium text-white ring-accent-black hover:bg-accent-green-100/90 focus-visible:ring-1 disabled:cursor-not-allowed disabled:bg-accent-green-100/50"
              type="submit"
              disabled={loading || !canSubmit}
            >
              {loading ? <LoadingIndicator /> : "Log In"}
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center justify-center space-y-2">
          <button className="text-xs font-medium text-accent-gray-300">
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
}

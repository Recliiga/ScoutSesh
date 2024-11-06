"use client";

import { login, signup } from "@/actions/authActions";
import AuthError from "@/components/AuthError";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const page = searchParams.get("page") || "login";

  function clearInput(...names: string[]) {
    names.forEach((id) => {
      const element = document.getElementById(id) as HTMLInputElement;
      element.value = "";
    });
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setLoading(true);
    const eventTarget = e.target as HTMLFormElement;
    const formData = new FormData(eventTarget);
    const { error } = await login(formData);
    if (!error) {
      router.replace("/");
    } else {
      clearInput("password");
      setLoading(false);
    }
    setAuthError(error);
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setLoading(true);
    const eventTarget = e.target as HTMLFormElement;
    const formData = new FormData(eventTarget);
    const { error } = await signup(formData);
    if (!error) {
      router.replace("/");
    } else {
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
    }
    setAuthError(error);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  function handleChangeTab(page: string) {
    setPassword("");
    setConfirmPassword("");
    setAuthError("");
    clearInput("email");
    clearInput("password");
    router.push(`/auth?page=${page}`);
  }

  return (
    <div className="flex flex-1 justify-center items-center bg-gray-100 p-4">
      <div className="flex flex-col gap-6 border-accent-gray-200 bg-white shadow-sm p-6 border rounded-lg w-full max-w-md">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-2xl text-center tracking-tight">
            Welcome to ScoutSesh
          </h3>
          <p className="text-accent-gray-300 text-center text-sm">
            Elevate your game with expert coaching
          </p>
        </div>
        <div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex bg-accent-gray-100 p-1 rounded-md w-full font-medium text-sm">
              <button
                onClick={() => handleChangeTab("login")}
                className={`flex-1 px-3 py-1.5 rounded-sm ${
                  page === "login" ? "bg-white" : "text-accent-gray-300"
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => handleChangeTab("sign-up")}
                className={`flex-1 px-3 py-1.5 rounded-sm ${
                  page === "sign-up" ? "bg-white" : "text-accent-gray-300"
                }`}
              >
                Sign Up
              </button>
            </div>
            {page === "login" ? (
              <div>
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
                    {authError && <AuthError error={authError} />}
                    <button
                      className="flex-center bg-accent-green-100 hover:bg-accent-green-100/90 disabled:bg-accent-green-100/50 px-4 py-2 rounded-md w-full font-medium text-sm text-white disabled:cursor-not-allowed"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? <LoadingIndicator /> : "Log In"}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <form onSubmit={handleSignup}>
                  <div className="flex flex-col gap-4">
                    <div className="gap-4 grid grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label
                          className="font-medium text-sm"
                          htmlFor="firstName"
                        >
                          First name
                        </label>
                        <input
                          className="px-3 py-2 border rounded-md ring-accent-gray-200 focus-visible:ring-2 ring-offset-2 text-sm"
                          id="firstName"
                          name="firstName"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          className="font-medium text-sm"
                          htmlFor="lastName"
                        >
                          Last name
                        </label>
                        <input
                          className="px-3 py-2 border rounded-md ring-accent-gray-200 focus-visible:ring-2 ring-offset-2 text-sm"
                          id="lastName"
                          name="lastName"
                          required
                        />
                      </div>
                    </div>
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
                        Password (8+ characters)
                      </label>
                      <input
                        className="px-3 py-2 border rounded-md ring-accent-gray-200 focus-visible:ring-2 ring-offset-2 text-sm"
                        id="password"
                        name="password"
                        required
                        type="password"
                        minLength={8}
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        className="font-medium text-sm"
                        htmlFor="confirmPassword"
                      >
                        Confirm Password
                      </label>
                      <input
                        className="px-3 py-2 border rounded-md ring-accent-gray-200 focus-visible:ring-2 ring-offset-2 text-sm"
                        id="confirmPassword"
                        required
                        type="password"
                        minLength={8}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                      {passwordError && <AuthError error={passwordError} />}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-sm" htmlFor="role">
                        Role
                      </label>
                      <div className="relative">
                        <select
                          id="role"
                          name="role"
                          className="border-gray-300 bg-white py-2 pr-10 pl-3 border focus:border-blue-500 rounded-md focus:ring-1 focus:ring-blue-500 w-full text-sm leading-5 appearance-none focus:outline-none"
                          required
                        >
                          <option disabled>Select a role</option>
                          <option>Athlete</option>
                          <option>Head Coach</option>
                          <option>Assistant Coach</option>
                        </select>
                        <div className="right-0 absolute inset-y-0 flex items-center px-2 text-gray-700 pointer-events-none">
                          <svg
                            height={20}
                            width={20}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path
                                d="M6 9L12 15L18 9"
                                stroke="#000000"
                                className="stroke-accent-gray-300"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                    {authError && <AuthError error={authError} />}
                    <button
                      className="flex-center bg-accent-green-100 hover:bg-accent-green-100/90 disabled:bg-accent-green-100/50 px-4 py-2 rounded-md w-full font-medium text-sm text-white disabled:cursor-not-allowed"
                      type="submit"
                      disabled={loading || !!passwordError}
                    >
                      {loading ? <LoadingIndicator /> : "Create My Account"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-2">
          <button className="font-medium text-accent-gray-300 text-xs">
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
}

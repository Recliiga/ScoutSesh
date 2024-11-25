"use client";
import React, { useCallback, useEffect, useState } from "react";

import { signup } from "@/actions/authActions";
import { useRouter, useSearchParams } from "next/navigation";
import Error from "./AuthError";
import LoadingIndicator from "./LoadingIndicator";
import useFormEntries from "@/hooks/useFormEntries";

export default function SignupForm({ orgId }: { orgId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [signupError, setSignupError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { formEntries, updateField } = useFormEntries({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: orgId ? "Athlete" : "",
  });

  const emptyField = Object.entries(formEntries).some(([key, value]) =>
    key !== "organizationID" ? value.trim() === "" : false
  );
  const anyError = !!(emailError || passwordError || confirmPasswordError);

  const cannotSubmit = emptyField || anyError;

  const runValidationCheck = useCallback(() => {
    if (formEntries.password && formEntries.password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }

    const passwordsDoNotMatch =
      formEntries.confirmPassword &&
      formEntries.password !== formEntries.confirmPassword;

    if (passwordsDoNotMatch) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }

    const notAValidEmail =
      formEntries.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEntries.email);

    if (notAValidEmail) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  }, [formEntries.confirmPassword, formEntries.email, formEntries.password]);

  useEffect(() => {
    runValidationCheck();
  }, [runValidationCheck]);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSignupError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { error } = await signup(formData);

    if (error === null) {
      router.replace(redirectUrl);
    } else {
      updateField("password", "");
      updateField("confirmPassword", "");
      setLoading(false);
    }

    setSignupError(error);
  }

  return (
    <form onSubmit={handleSignup}>
      <div className="flex flex-col gap-4">
        <div className="gap-4 grid grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm" htmlFor="firstName">
              First name
            </label>
            <input
              className="px-3 py-2 border rounded-md ring-accent-gray-200 focus-visible:ring-2 ring-offset-2 text-sm"
              id="firstName"
              name="firstName"
              required
              value={formEntries["firstName"]}
              onChange={(e) => updateField("firstName", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm" htmlFor="lastName">
              Last name
            </label>
            <input
              className="px-3 py-2 border rounded-md ring-accent-gray-200 focus-visible:ring-2 ring-offset-2 text-sm"
              id="lastName"
              name="lastName"
              required
              value={formEntries["lastName"]}
              onChange={(e) => updateField("lastName", e.target.value)}
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
            value={formEntries["email"]}
            onChange={(e) => updateField("email", e.target.value)}
          />
          {emailError && <Error error={emailError} />}
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
            value={formEntries["password"]}
            onChange={(e) => updateField("password", e.target.value)}
          />
          {passwordError && <Error error={passwordError} />}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="px-3 py-2 border rounded-md ring-accent-gray-200 focus-visible:ring-2 ring-offset-2 text-sm"
            id="confirmPassword"
            required
            type="password"
            minLength={8}
            value={formEntries["confirmPassword"]}
            onChange={(e) => updateField("confirmPassword", e.target.value)}
          />
          {confirmPasswordError && <Error error={confirmPasswordError} />}
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
              value={formEntries["role"]}
              onChange={(e) => updateField("role", e.target.value)}
            >
              <option value={""} hidden>
                Select a Role
              </option>
              <option value={"Athlete"}>Athlete</option>
              <option value={"Assistant Coach"}>Assistant Coach</option>
              <option value={"Head Coach"}>Head Coach</option>
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

        {signupError && <Error error={signupError} />}
        <button
          className="flex-center bg-accent-green-100 hover:bg-accent-green-100/90 disabled:bg-accent-green-100/50 px-4 py-2 rounded-md w-full font-medium text-sm text-white disabled:cursor-not-allowed"
          type="submit"
          disabled={loading || cannotSubmit}
        >
          {loading ? <LoadingIndicator /> : "Create My Account"}
        </button>
      </div>
    </form>
  );
}

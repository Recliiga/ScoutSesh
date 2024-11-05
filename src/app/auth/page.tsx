"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Component() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 2000);
  };

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
    router.push(`/auth?page=${page}`);
  }

  return (
    <div className="flex justify-center items-center bg-gray-100 p-4 min-h-screen">
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
                  searchParams.get("page") === "login"
                    ? "bg-white"
                    : "text-accent-gray-300"
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => handleChangeTab("sign-up")}
                className={`flex-1 px-3 py-1.5 rounded-sm ${
                  searchParams.get("page") === "sign-up"
                    ? "bg-white"
                    : "text-accent-gray-300"
                }`}
              >
                Sign Up
              </button>
            </div>
            {searchParams.get("page") === "login" ? (
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-sm" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="px-3 py-2 border rounded-md ring-accent-gray-200 focus-visible:ring-2 ring-offset-2 text-sm"
                        id="email"
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
                        required
                        type="password"
                        placeholder="******"
                      />
                    </div>
                    <button
                      className="bg-[#14a800] hover:bg-[#14a800]/90 px-4 py-2 rounded-md w-full font-medium text-sm text-white"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading && <p>Loading...</p>}
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <form onSubmit={handleSubmit}>
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
                      {passwordError && (
                        <p className="text-red-500 text-sm">{passwordError}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-sm" htmlFor="role">
                        Role
                      </label>
                      <div className="relative">
                        <select
                          id="role"
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
                    <button
                      className="bg-[#14a800] hover:bg-[#14a800]/90 px-4 py-2 rounded-md w-full font-medium text-sm text-white"
                      type="submit"
                      disabled={isLoading || !!passwordError}
                    >
                      {isLoading && <p>Loading...</p>}
                      Create My Account
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

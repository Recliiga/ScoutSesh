"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  sendVerificationEmail,
  verifyEmail,
} from "@/actions/emailVerificationActions";
import { UserType } from "@/db/models/User";
import LoadingIndicator from "./LoadingIndicator";
import Error from "./AuthError";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage({ user }: { user: UserType }) {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [resendLoading, setResendLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [codeSent, setCodeSent] = useState(false);
  const [codeError, setCodeError] = useState<string | null>("");
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>();

  async function handleVerifyEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const data = await verifyEmail(
      user._id,
      verificationCode.join(""),
      redirectUrl,
    );
    if (data?.error) {
      setError(data.error);
      setLoading(false);
    }
  }

  async function handleResendVerificationEmail() {
    setResendLoading(true);
    const { error } = await sendVerificationEmail(user);
    if (error) {
      setMessage({ type: "error", text: error });
    } else {
      setMessage({ type: "success", text: "Email sent successfully!" });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
    setResendLoading(false);
  }

  async function handleGetCode() {
    setCodeLoading(true);
    setCodeError(null);
    const { error } = await sendVerificationEmail(user);
    if (error) {
      setCodeError(error);
    } else {
      setCodeSent(true);
    }
    setCodeLoading(false);
  }

  return (
    <div className="flex w-[90%] max-w-[26rem] flex-col gap-4 rounded-md bg-white p-4 shadow sm:p-6">
      <h1 className="text-center text-xl font-bold">Verify Your Email</h1>
      {codeSent ? (
        <>
          <p className="text-center text-sm text-gray-600">
            A verification code has been sent to {user.email}
          </p>
          <p className="text-center text-sm text-gray-600">
            Please check your inbox and enter the code below. If you dont see
            the email, please check your spam folder
          </p>
          <form
            onSubmit={handleVerifyEmail}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex justify-center gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  autoComplete="off"
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  className="h-10 w-10 rounded-md border text-center"
                  value={verificationCode[index]}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[0-9]$/.test(value) || value === "") {
                      const newCode = [...verificationCode];
                      newCode[index] = value;
                      setVerificationCode(newCode);

                      if (value.length === 1 && index < 5) {
                        const nextSibling = document.querySelector(
                          `input[name=verificationCode${index + 1}]`,
                        );
                        if (nextSibling) {
                          (nextSibling as HTMLElement).focus();
                        }
                      }
                    }
                  }}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Backspace" &&
                      verificationCode[index] === "" &&
                      index > 0
                    ) {
                      const prevSibling = document.querySelector(
                        `input[name=verificationCode${index - 1}]`,
                      );
                      if (prevSibling) {
                        (prevSibling as HTMLElement).focus();
                      }
                    }
                  }}
                  name={`verificationCode${index}`}
                />
              ))}
            </div>
            {error && <Error error={error} />}
            <Button
              disabled={loading}
              className="w-full bg-accent-green-100 hover:bg-accent-green-100/90"
            >
              {loading ? (
                <>
                  <LoadingIndicator /> Verifying
                </>
              ) : (
                "Verify"
              )}
            </Button>
          </form>
          <div className="flex-center flex-col gap-1">
            <button
              onClick={handleResendVerificationEmail}
              disabled={resendLoading}
              className="mx-auto flex w-fit items-center gap-2 text-sm text-accent-gray-300 duration-200 hover:text-accent-green-100 disabled:hover:text-accent-gray-300"
            >
              {resendLoading ? (
                <>
                  <LoadingIndicator color="#14a800" size={18} />
                  Resending
                </>
              ) : (
                "Resend Code"
              )}
            </button>
            {message && (
              <p
                className={`${message.type === "error" ? "text-red-500" : "text-green-600"} text-center text-xs`}
              >
                {message.text}
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <p className="text-center text-sm text-gray-600">
            We need to verify your email address to keep your account secure.
            Please click the button below to receive your verification code.
          </p>
          <div className="flex flex-col items-center gap-2">
            <Button
              onClick={handleGetCode}
              disabled={codeLoading}
              className="w-full bg-accent-green-100 hover:bg-accent-green-100/90"
            >
              {codeLoading ? (
                <>
                  <LoadingIndicator /> Getting code...
                </>
              ) : (
                "Get code"
              )}
            </Button>
            {codeError && <Error error={codeError} />}
          </div>
          <p className="text-center text-sm text-gray-600">
            Already have verification code?{" "}
            <button
              onClick={() => setCodeSent(true)}
              className="text-accent-green-100 hover:underline"
            >
              Enter code
            </button>
          </p>
        </>
      )}
    </div>
  );
}

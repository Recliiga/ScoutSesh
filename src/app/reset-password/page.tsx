import ResetPasswordForm from "@/components/password-and-security/ResetPasswordForm";
import { verifyToken } from "@/lib/utils";

export const metadata = {
  title: "Reset Password",
  description:
    "Reset your ScoutSesh account password to regain access to your athlete development journey. Enter your new password to get started.",
};

export default async function NewPassword({
  searchParams,
}: {
  searchParams: Promise<{ tk: string }>;
}) {
  const { tk } = await searchParams;

  function getUserIdFromToken(token: string) {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) return { userId: null };

    const { payload, error } = verifyToken(token);
    if (error !== null) throw new Error(error);

    return { userId: payload.userId };
  }

  const { userId } = getUserIdFromToken(tk);

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-100 p-4">
      <ResetPasswordForm userId={userId} />
    </div>
  );
}

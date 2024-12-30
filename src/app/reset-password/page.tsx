import ResetPasswordForm from "@/components/password-and-security/ResetPasswordForm";
import jwt from "jsonwebtoken";

export default async function NewPassword({
  searchParams,
}: {
  searchParams: Promise<{ tk: string }>;
}) {
  const { tk } = await searchParams;

  function getUserIdFromToken(token: string) {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) return { userId: null };

    const payload = jwt.verify(token, JWT_SECRET);
    if (typeof payload === "string") return { userId: null };

    return { userId: payload.userId };
  }

  const { userId } = getUserIdFromToken(tk);

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-100 p-4">
      <ResetPasswordForm userId={userId} />
    </div>
  );
}

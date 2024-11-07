"use client";
import { useRouter } from "next/navigation";

export default function Navigate({
  to,
  replace = false,
}: {
  to: string;
  replace: boolean;
}) {
  const router = useRouter();
  if (replace) {
    router.replace(to);
  } else {
    router.push(to);
  }

  return null;
}

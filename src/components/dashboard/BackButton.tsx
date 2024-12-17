"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function BackButton({
  actionText = "Back",
  className,
}: {
  actionText?: string;
  className?: string;
}) {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => router.back()}
      className={className}
    >
      {actionText}
    </Button>
  );
}

"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function BackButton({
  actionText = "Back",
}: {
  actionText?: string;
}) {
  const router = useRouter();
  return (
    <Button variant="outline" onClick={() => router.back()}>
      {actionText}
    </Button>
  );
}

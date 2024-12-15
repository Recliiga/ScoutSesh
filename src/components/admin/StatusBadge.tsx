import React from "react";

export default function StatusBadge({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "success" | "warning" | "secondary" | "default" | "destructive";
}) {
  const varaintClassName =
    variant === "success"
      ? "bg-green-500"
      : variant === "warning"
        ? "bg-yellow-500"
        : variant === "destructive"
          ? "bg-red-500"
          : "bg-zinc-700";
  return (
    <div
      className={`w-fit whitespace-nowrap rounded-full px-2 py-0.5 text-xs text-white ${varaintClassName}`}
    >
      {children}
    </div>
  );
}

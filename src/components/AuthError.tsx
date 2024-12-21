import React from "react";

export default function Error({ error }: { error: string }) {
  return <p className="text-sm text-red-500">{error}</p>;
}

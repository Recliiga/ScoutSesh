import React from "react";

export default function Error({ error }: { error: string }) {
  return <p className="text-red-500 text-sm">{error}</p>;
}

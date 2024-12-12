import React from "react";
import LoadingIndicator from "@/components/LoadingIndicator";

export default function FullPageLoader() {
  return (
    <div className="flex-center flex-1">
      <LoadingIndicator color="#16A34A" size={28} />
    </div>
  );
}

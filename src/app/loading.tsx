import React from "react";
import LoadingIndicator from "../components/LoadingIndicator";

export default function FullPageLoader() {
  return (
    <div className="flex-1 flex-center">
      <LoadingIndicator color="#16A34A" size={28} />
    </div>
  );
}

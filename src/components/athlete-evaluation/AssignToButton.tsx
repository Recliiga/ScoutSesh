"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { UserPlusIcon } from "lucide-react";
import AssignEvaluationModal from "./AssignEvaluationModal";

export default function AssignToButton({
  className,
  orderId,
}: {
  className?: string;
  orderId: string;
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setModalIsOpen(true)}
        variant="outline"
        size="sm"
        className={`border-green-600 bg-white text-green-600 hover:bg-green-600 hover:text-white ${className || ""}`}
      >
        <UserPlusIcon className="mr-2 h-4 w-4" />
        Assign to
      </Button>
      <AssignEvaluationModal
        orderId={orderId}
        open={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
      />
    </>
  );
}

import React, { useState } from "react";
import ModalContainer from "../ModalContainer";
import { Button } from "../ui/button";
import Image from "next/image";
import LoadingIndicator from "../LoadingIndicator";

type CoachType = {
  _id: number;
  firstName: string;
  lastName: string;
  role: string;
  profilePicture: string;
};

const coaches: CoachType[] = [
  {
    _id: 1,
    firstName: "John",
    lastName: "Doe",
    role: "Head Coach",
    profilePicture: "/placeholder-profile-picture.png",
  },
  {
    _id: 2,
    firstName: "Jane",
    lastName: "Smith",
    role: "Assistant Coach",
    profilePicture: "/placeholder-profile-picture.png",
  },
  {
    _id: 3,
    firstName: "Mike",
    lastName: "Johnson",
    role: "Assistant Coach",
    profilePicture: "/placeholder-profile-picture.png",
  },
  {
    _id: 4,
    firstName: "Sarah",
    lastName: "Brown",
    role: "Assistant Coach",
    profilePicture: "/placeholder-profile-picture.png",
  },
  {
    _id: 5,
    firstName: "David",
    lastName: "Lee",
    role: "Assistant Coach",
    profilePicture: "/placeholder-profile-picture.png",
  },
  {
    _id: 6,
    firstName: "Emily",
    lastName: "Chen",
    role: "Assistant Coach",
    profilePicture: "/placeholder-profile-picture.png",
  },
];

export default function AssignEvaluationModal({
  open,
  closeModal,
  orderId,
}: {
  open: boolean;
  closeModal(): void;
  orderId: string;
}) {
  const [selectedCoach, setSelectedCoach] = useState<CoachType | null>(null);
  const [assigned, setAssigned] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAssign = () => {
    if (selectedCoach) {
      setLoading(true);
      console.log(
        `Assigning Evaluation Order with ID ${orderId} to coach ${selectedCoach.firstName}`,
      );
      setTimeout(() => {
        setLoading(false);
        setAssigned(true);
      }, 2000);
    }
  };

  function handleSelectCoach(coach: CoachType) {
    setSelectedCoach(coach);
    setAssigned(false);
  }

  return (
    <ModalContainer open={open} closeModal={closeModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute left-[50%] top-[50%] h-fit max-h-[90vh] w-[90%] max-w-4xl -translate-x-[50%] -translate-y-[50%] overflow-y-scroll rounded-lg bg-white p-6 shadow-lg ${open ? "visible scale-100 opacity-100" : "invisible scale-90 opacity-0"}`}
      >
        <h2 className="mb-4 text-2xl font-semibold">
          Assign Athlete Evaluation to...
        </h2>
        <p className="mb-4">Select a Coach to assign John Smith to:</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {coaches.map((coach) => (
            <div
              key={coach._id}
              className={`flex cursor-pointer items-center rounded-lg border p-4 duration-200 hover:bg-accent-gray-100 ${
                selectedCoach?._id === coach._id
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleSelectCoach(coach)}
            >
              <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={coach.profilePicture}
                  alt={`${coach.firstName}'s profile`}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">
                  {coach.firstName + " " + coach.lastName}
                </h3>
                <p className="text-sm text-gray-600">{coach.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <Button variant="outline" onClick={closeModal}>
            {assigned ? "Close" : "Cancel"}
          </Button>
          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={handleAssign}
            disabled={loading || !selectedCoach || assigned}
          >
            {!loading ? (
              assigned ? (
                "Assigned"
              ) : (
                `Assign to Coach ${selectedCoach ? selectedCoach.firstName : ""}`
              )
            ) : (
              <>
                <LoadingIndicator />
                Assigning...
              </>
            )}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}

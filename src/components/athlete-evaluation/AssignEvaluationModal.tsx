import React from "react";
import ModalContainer from "../ModalContainer";
import { Button } from "../ui/button";
import Image from "next/image";

type CoachType = {
  _id: number;
  name: string;
  role: string;
  profilePicture: string;
};

const coaches: CoachType[] = [
  {
    _id: 1,
    name: "John Doe",
    role: "Head Coach",
    profilePicture: "/placeholder-profile-picture.png",
  },
  {
    _id: 2,
    name: "Jane Smith",
    role: "Assistant Coach",
    profilePicture: "/placeholder-profile-picture.png",
  },
  {
    _id: 3,
    name: "Mike Johnson",
    role: "Assistant Coach",
    profilePicture: "/placeholder-profile-picture.png",
  },
  {
    _id: 4,
    name: "Sarah Brown",
    role: "Assistant Coach",
    profilePicture: "/placeholder-profile-picture.png",
  },
  {
    _id: 5,
    name: "David Lee",
    role: "Assistant Coach",
    profilePicture: "/placeholder-profile-picture.png",
  },
  {
    _id: 6,
    name: "Emily Chen",
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
  const [selectedCoach, setSelectedCoach] = React.useState<CoachType | null>(
    null,
  );
  const [assigned, setAssigned] = React.useState(false);

  const handleAssign = () => {
    if (selectedCoach) {
      console.log(
        `Assigning athlete John Smith (ID: 123) to coach ${selectedCoach.name}`,
      );
      setAssigned(true);
      closeModal();
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
                  alt={`${coach.name}'s profile`}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{coach.name}</h3>
                <p className="text-sm text-gray-600">{coach.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={handleAssign}
            disabled={!selectedCoach || assigned}
          >
            {assigned
              ? "Assigned"
              : `Assign to Coach ${selectedCoach ? selectedCoach.name : ""}`}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { UserType } from "@/db/models/User";

export default function CoachesField({
  coaches,
  assistantCoaches,
  toggleCoaches,
}: {
  coaches: string[];
  assistantCoaches: UserType[];
  toggleCoaches(coachId: string): void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>Coach(es)</Label>
      <div className="mt-2 flex flex-wrap gap-x-8 gap-y-4">
        {assistantCoaches.map((user) => (
          <div
            onClick={() => {
              if (user.role === "Head Coach") return;
              toggleCoaches(user._id);
            }}
            key={user._id}
            className={`flex cursor-pointer items-center gap-2 rounded-md p-2 px-4 duration-200 ${
              coaches.includes(user._id) ? "bg-green-50" : "grayscale"
            }`}
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full font-medium">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={user.profilePicture}
                  alt={user.firstName}
                  className="object-cover"
                />
                <AvatarFallback>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col">
              <h4 className="text-accent-black">
                {user.firstName} {user.lastName}
              </h4>
              <p className="text-xs text-accent-gray-300">{user.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

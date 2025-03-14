import { Button } from "../ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export type AthleteType = {
  _id: string;
  goalId: string;
  name: string;
  profilePicture: string;
  lastGoalDate: Date;
  totalGoals: number;
  weeklyReflections: number;
  latestUpdate: Date;
};

export default function AthleteTable({
  athletes,
}: {
  athletes: AthleteType[];
}) {
  return (
    <div className="overflow-x-auto">
      <div className="max-h-96 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0 z-[2] bg-gray-50">
            <tr>
              <th className="w-1/5 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Athlete
              </th>
              <th className="w-1/5 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Submission Date
              </th>
              <th className="w-1/12 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                Goals Set
              </th>
              <th className="w-1/12 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                Weekly Reflections
              </th>
              <th className="w-1/5 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Latest Update
              </th>
              <th className="w-1/6 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {athletes.map((athlete) => (
              <tr key={athlete._id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {athlete.name[0]}
                        {athlete.name.split(" ")[1][0]}
                      </AvatarFallback>
                      <AvatarImage
                        src={athlete.profilePicture}
                        alt={`${athlete.name}'s profile picture`}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </Avatar>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {athlete.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {new Date(athlete.lastGoalDate).toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric", year: "numeric" },
                    )}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center">
                  <div className="text-sm text-gray-900">
                    {athlete.totalGoals}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center">
                  <div className="text-sm text-gray-900">
                    {athlete.weeklyReflections}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {new Date(athlete.latestUpdate).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-600 bg-white px-0 py-0 text-green-600 hover:bg-green-600 hover:text-white"
                    >
                      <Link
                        href={`/dashboard/goal-setting/submissions/${athlete.goalId}`}
                        className="px-4 py-2"
                      >
                        View Goals
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-600 bg-white px-0 py-0 text-green-600 hover:bg-green-600 hover:text-white"
                    >
                      <Link href={`/dashboard/messages`} className="px-4 py-2">
                        Message
                      </Link>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

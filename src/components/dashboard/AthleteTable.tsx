import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

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
        <table className="divide-y divide-gray-200 min-w-full">
          <thead className="top-0 sticky bg-gray-50">
            <tr>
              <th className="px-6 py-3 w-1/5 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                Athlete
              </th>
              <th className="px-6 py-3 w-1/5 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                Submission Date
              </th>
              <th className="px-6 py-3 w-1/12 font-medium text-center text-gray-500 text-xs uppercase tracking-wider">
                Goals Set
              </th>
              <th className="px-6 py-3 w-1/12 font-medium text-center text-gray-500 text-xs uppercase tracking-wider">
                Weekly Reflections
              </th>
              <th className="px-6 py-3 w-1/5 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                Latest Update
              </th>
              <th className="px-6 py-3 w-1/6 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {athletes.map((athlete) => (
              <tr key={athlete._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <Image
                        className="rounded-full w-10 h-10"
                        src={athlete.profilePicture}
                        alt=""
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900 text-sm">
                        {athlete.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900 text-sm">
                    {new Date(athlete.lastGoalDate).toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric", year: "numeric" }
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <div className="text-gray-900 text-sm">
                    {athlete.totalGoals}
                  </div>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <div className="text-gray-900 text-sm">
                    {athlete.weeklyReflections}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900 text-sm">
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-600 bg-white hover:bg-green-600 px-0 py-0 text-green-600 hover:text-white"
                    >
                      <Link
                        href={`/dashboard/goal-setting/weekly-reflection/${athlete.goalId}`}
                        className="px-4 py-2"
                      >
                        View Goals
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-600 bg-white hover:bg-green-600 text-green-600 hover:text-white"
                    >
                      Message
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

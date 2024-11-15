import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";

export type AthleteType = {
  id: number;
  name: string;
  photo: string;
  lastGoalDate: string;
  totalGoals: number;
  weeklyReflections: number;
  latestUpdate: string;
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
              <tr key={athlete.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <Image
                        className="rounded-full w-10 h-10"
                        src={athlete.photo}
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-600 bg-white hover:bg-green-600 text-green-600 hover:text-white"
                        >
                          View Goals
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{athlete.name}&apos;s Goals</DialogTitle>
                        </DialogHeader>
                        <div className="mt-2">
                          <p className="text-gray-500 text-sm">
                            Goals Set: {athlete.totalGoals}
                          </p>
                          <p className="text-gray-500 text-sm">
                            Weekly Reflections: {athlete.weeklyReflections}
                          </p>
                          <p className="text-gray-500 text-sm">
                            Submission Date:{" "}
                            {new Date(athlete.lastGoalDate).toLocaleDateString(
                              "en-US",
                              { month: "long", day: "numeric", year: "numeric" }
                            )}
                          </p>
                          <p className="text-gray-500 text-sm">
                            Latest Update:{" "}
                            {new Date(athlete.latestUpdate).toLocaleString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              }
                            )}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
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

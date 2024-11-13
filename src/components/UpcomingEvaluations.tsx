import { ClipboardIcon, UserPlusIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const allPlayersNeedingEvaluation = [
  {
    id: 1,
    name: "John Doe",
    lastEvaluation: "September 23, 2024",
    completeBy: "October 23, 2024",
    photo: "/placeholder-profile-picture.png",
  },
  {
    id: 2,
    name: "Jane Smith",
    lastEvaluation: "July 25, 2024",
    completeBy: "October 25, 2024",
    photo: "/placeholder-profile-picture.png",
  },
  {
    id: 3,
    name: "Mike Johnson",
    lastEvaluation: "March 28, 2024",
    completeBy: "October 28, 2024",
    photo: "/placeholder-profile-picture.png",
  },
  {
    id: 4,
    name: "Emily Brown",
    lastEvaluation: "November 5, 2023",
    completeBy: "November 5, 2024",
    photo: "/placeholder-profile-picture.png",
  },
  {
    id: 5,
    name: "Alex Lee",
    lastEvaluation: "September 21, 2024",
    completeBy: "February 15, 2025",
    photo: "/placeholder-profile-picture.png",
  },
  {
    id: 6,
    name: "Sarah Johnson",
    lastEvaluation: "October 1, 2024",
    completeBy: "March 1, 2025",
    photo: "/placeholder-profile-picture.png",
  },
  {
    id: 7,
    name: "Tom Wilson",
    lastEvaluation: "October 15, 2024",
    completeBy: "April 15, 2025",
    photo: "/placeholder-profile-picture.png",
  },
];

export default function UpcomingEvaluations() {
  // Filter players with evaluations due within the next 7 days
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

  const filteredPlayers = allPlayersNeedingEvaluation.filter(
    (player) => new Date(player.completeBy) <= sevenDaysFromNow
  );

  // Sort filtered players by completion date
  const sortedPlayers = filteredPlayers.sort(
    (a, b) =>
      new Date(a.completeBy).getTime() - new Date(b.completeBy).getTime()
  );

  return (
    <section className="flex-1 bg-white shadow-[0_0_6px_4px_#eee] rounded-lg w-full">
      <h2 className="mb-4 p-4 font-semibold text-xl">Upcoming Evaluations</h2>
      <div className="overflow-hidden">
        <div className="max-h-[280px] overflow-y-auto">
          <table className="divide-y divide-gray-200 w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="top-0 sticky bg-gray-50 px-2 py-2 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                  Player
                </th>
                <th className="top-0 sticky bg-gray-50 px-2 py-2 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                  Complete By
                </th>
                <th className="top-0 sticky bg-gray-50 px-2 py-2 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedPlayers.map((player) => (
                <tr key={player.id}>
                  <td className="px-2 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8">
                        <Image
                          className="rounded-full w-8 h-8"
                          src={player.photo}
                          alt=""
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="ml-2">
                        <div className="font-medium text-gray-900 text-sm">
                          {player.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap">
                    <div className="text-gray-900 text-sm">
                      {player.completeBy}
                    </div>
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap">
                    <div className="flex gap-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-green-800 text-xs hover:text-white"
                      >
                        <ClipboardIcon className="mr-1 w-3 h-3" />
                        Evaluate
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-green-800 text-xs hover:text-white"
                      >
                        <UserPlusIcon className="mr-1 w-3 h-3" />
                        Assign
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

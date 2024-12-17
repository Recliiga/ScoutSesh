import { ClipboardIcon } from "lucide-react";
import { AthleteEvaluationOrderType } from "@/db/models/AthleteEvaluationOrder";
import { formatDate, getFullname } from "@/lib/utils";
import Link from "next/link";
import AssignToButton from "../athlete-evaluation/AssignToButton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function getNextEvaluationDueDate(order: AthleteEvaluationOrderType) {
  const orderIndex = order.evaluationDates.findIndex(
    (evaluationDate) => !evaluationDate.dateCoachEvaluated,
  );
  return new Date(order.evaluationDates[orderIndex].date).toDateString();
}

export default function UpcomingEvaluations({
  orders,
}: {
  orders: AthleteEvaluationOrderType[];
}) {
  const filteredOrders = orders;

  const sortedOrders = filteredOrders;

  return (
    <section className="flex w-full flex-1 flex-col overflow-hidden rounded-lg bg-white shadow-[0_0_6px_4px_#eee]">
      <h2 className="p-4 text-xl font-semibold">Upcoming Evaluations</h2>
      <div className="flex-1 overflow-hidden">
        <div className="max-h-[280px] overflow-y-auto">
          {sortedOrders.length > 0 ? (
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="sticky top-0 bg-gray-50 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Player
                  </th>
                  <th className="sticky top-0 bg-gray-50 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Complete By
                  </th>
                  <th className="sticky top-0 bg-gray-50 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {sortedOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="w-full whitespace-nowrap px-2 py-2">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={order.athlete.profilePicture}
                            alt={getFullname(order.athlete)}
                            className="object-cover"
                          />
                          <AvatarFallback>
                            {order.athlete.firstName[0]}
                            {order.athlete.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-2">
                          <div className="line-clamp-1 text-sm font-medium text-gray-900">
                            {getFullname(order.athlete)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-2 py-2">
                      <div className="text-sm text-gray-900">
                        {formatDate(getNextEvaluationDueDate(order))}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-2 py-2">
                      <div className="flex gap-x-1">
                        <Link
                          href={`/dashboard/athlete-evaluation/evaluate/${order._id}`}
                          className="flex items-center rounded-md border bg-white px-4 py-2 text-xs font-medium hover:bg-green-800 hover:text-white"
                        >
                          <ClipboardIcon className="mr-2 h-4 w-4" />
                          Evaluate
                        </Link>
                        <AssignToButton
                          orderId={order._id}
                          className="border-accent-gray-200 text-xs text-accent-black hover:bg-green-800 hover:text-white"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="px-4 pb-4 text-accent-gray-300">
              You do not currently have any athletes awaiting Evaluations
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

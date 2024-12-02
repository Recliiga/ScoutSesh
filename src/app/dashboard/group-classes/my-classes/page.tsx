import AthleteVideoLibrary from "@/components/group-classes/AthleteVideoLibrary";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchUserOrders } from "@/services/orderServices";
import { notFound } from "next/navigation";

export default async function MyClassesPage() {
  const user = await getSessionFromHeaders();
  if (user.role !== "Athlete") notFound();

  const { userOrders, error: orderError } = await fetchUserOrders(user._id);
  if (orderError !== null) throw new Error(orderError);

  return <AthleteVideoLibrary orders={userOrders} />;
}

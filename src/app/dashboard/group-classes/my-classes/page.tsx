import AthleteVideoLibrary from "@/components/group-classes/AthleteVideoLibrary";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";

export default async function MyClassesPage() {
  const user = await getSessionFromHeaders();
  if (user.role !== "Athlete") notFound();

  return <AthleteVideoLibrary />;
}

import CreateClassForm from "@/components/group-classes/CreateClassForm";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchTeamMembers } from "@/services/userServices";

export default async function CreateClassPage() {
  const user = await getSessionFromHeaders();
  const { teamMembers, error } = await fetchTeamMembers(user.organization!._id);

  if (error !== null) throw new Error(error);

  return (
    <CreateClassForm
      assistantCoaches={teamMembers.filter(
        (member) => member.role !== "Athlete"
      )}
    />
  );
}
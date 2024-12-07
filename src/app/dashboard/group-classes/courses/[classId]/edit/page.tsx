import EditClassForm from "@/components/group-classes/EditClassForm";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchGroupClass } from "@/services/groupClassServices";
import { fetchTeamMembers } from "@/services/userServices";
import { notFound } from "next/navigation";

export default async function EditClassPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  const user = await getSessionFromHeaders();

  if (user.role !== "Head Coach") notFound();

  const { teamMembers, error } = await fetchTeamMembers(user.organization!._id);
  const { groupClass, error: groupClassError } = await fetchGroupClass(classId);

  if (error !== null) throw new Error(error);
  if (groupClassError !== null) throw new Error(groupClassError);

  if (!groupClass) notFound();

  return (
    <EditClassForm
      course={groupClass}
      assistantCoaches={teamMembers.filter(
        (member) => member.role !== "Athlete"
      )}
    />
  );
}

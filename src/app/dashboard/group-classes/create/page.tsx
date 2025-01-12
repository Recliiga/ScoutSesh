import CreateClassForm from "@/components/group-classes/CreateClassForm";
import { getSessionFromHeaders } from "@/services/authServices";
import {
  fetchTeamMembers,
  fetchUserStripeAccount,
} from "@/services/userServices";
import { notFound } from "next/navigation";

export default async function CreateClassPage() {
  const user = await getSessionFromHeaders();

  if (user.role !== "Head Coach") notFound();

  const { teamMembers, error } = await fetchTeamMembers(user.organization!._id);
  if (error !== null) throw new Error(error);

  const { account } = await fetchUserStripeAccount(user.stripeAccountId);
  const stripeAccountConnected = !!user.stripeAccountId;
  const accountRestricted = !!account?.requirements?.disabled_reason;

  return (
    <CreateClassForm
      user={user}
      assistantCoaches={teamMembers.filter(
        (member) => member.role !== "Athlete",
      )}
      accountRestricted={accountRestricted}
      stripeAccountConnected={stripeAccountConnected}
    />
  );
}

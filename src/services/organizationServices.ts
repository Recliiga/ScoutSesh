import connectDB from "@/db/connectDB";
import GroupClass, { GroupClassType } from "@/db/models/GroupClass";
import Organization, { OrganizationType } from "@/db/models/Organization";
import User, { UserType } from "@/db/models/User";

export async function fetchOrganizationData(organizationId: string) {
  try {
    await connectDB();

    const organization: OrganizationType | null = JSON.parse(
      JSON.stringify(
        await Organization.findById(organizationId).populate("user"),
      ),
    );

    if (!organization) throw new Error("Invalid organization ID");

    const teamMembers: UserType[] = JSON.parse(
      JSON.stringify(
        await User.find({
          organization: organizationId,
        }),
      ),
    );

    const courses: GroupClassType[] = JSON.parse(
      JSON.stringify(
        await GroupClass.find({
          user: organization.user._id,
        }),
      ),
    );

    const organizationData = { organization, teamMembers, courses };

    return { organizationData, error: null };
  } catch (err) {
    return { organizationData: null, error: (err as Error).message };
  }
}

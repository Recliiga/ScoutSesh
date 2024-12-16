import connectDB from "@/db/connectDB";
import Organization, { OrganizationType } from "@/db/models/Organization";

export async function fetchOrganization(organizationId: string) {
  try {
    await connectDB();

    const organization: OrganizationType | null = JSON.parse(
      JSON.stringify(
        await Organization.findById(organizationId).populate("user"),
      ),
    );

    if (!organization) throw new Error("Invalid organization ID");

    return { organization, error: null };
  } catch (err) {
    return { organization: null, error: (err as Error).message };
  }
}

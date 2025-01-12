"use server";
import connectDB from "@/db/connectDB";
import Organization, { OrganizationType } from "@/db/models/Organization";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";

export async function fetchOrganization(organizationId?: string) {
  if (!organizationId) return { organization: null, error: null };
  try {
    await connectDB();
    const organization: OrganizationType = JSON.parse(
      JSON.stringify(
        await Organization.findById(organizationId).populate("user"),
      ),
    );
    return { organization, error: null };
  } catch (err) {
    return { organization: null, error: (err as Error).message };
  }
}

export async function updateOrganization(
  organizationId: string,
  organizationData: {
    name: string;
    logo: string;
    memberCount: string;
    city: string;
    country: string;
    primarySport: string;
    bio: string;
    yearFounded: number;
    type: string;
  },
  organizationHeadCoachId: string,
) {
  try {
    const cookieStore = await cookies();
    const { userId, error } = getUserIdFromCookies(cookieStore);
    if (error !== null) return { error: "User is unauthenticated" };

    if (userId !== organizationHeadCoachId)
      return { updatedUser: null, error: "Unauthorized" };

    await connectDB();
    const updatedOrganization: OrganizationType = JSON.parse(
      JSON.stringify(
        await Organization.findByIdAndUpdate(organizationId, organizationData, {
          new: true,
        }).populate("user"),
      ),
    );
    return { updatedOrganization, error: null };
  } catch (err) {
    return { updatedOrganization: null, error: (err as Error).message };
  }
}

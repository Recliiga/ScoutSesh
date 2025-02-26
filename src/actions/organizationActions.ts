"use server";
import connectDB from "@/db/connectDB";
import Organization, { OrganizationType } from "@/db/models/Organization";
import User from "@/db/models/User";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createOrganization(
  organizationData: {
    name: string;
    logo: string;
    type: string;
    memberCount: string;
    city: string;
    country: { name: string; iso2: string };
    primarySport: string;
    yearFounded: string;
    bio: string;
  },
  redirectUrl: string,
) {
  let canRedirect = false;
  try {
    const cookieStore = await cookies();

    const { userId, error: authError } =
      await getUserIdFromCookies(cookieStore);
    if (authError !== null) throw new Error(authError);

    // Create new organization and bind to user's profile
    await connectDB();
    const newOrganization = await Organization.create({
      ...organizationData,
      user: userId,
    });
    const data = await User.findByIdAndUpdate(userId, {
      organization: newOrganization._id,
    });
    if (!data) throw new Error("An error occured");

    canRedirect = true;
  } catch (error) {
    return { error: (error as Error).message };
  } finally {
    if (canRedirect) redirect(redirectUrl);
  }
}

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
    country: { name: string; iso2: string };
    primarySport: string;
    bio: string;
    yearFounded: number;
    type: string;
  },
  organizationHeadCoachId: string,
) {
  try {
    const cookieStore = await cookies();
    const { userId, error } = await getUserIdFromCookies(cookieStore);
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

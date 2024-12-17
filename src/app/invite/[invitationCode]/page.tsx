import JoinOrganizationButton from "@/components/JoinOrganizationButton";
import { AvatarFallback } from "@/components/ui/avatar";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchInvitationCode } from "@/services/invitationServices";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import React from "react";

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ invitationCode: string }>;
}) {
  const user = await getSessionFromHeaders();
  const { invitationCode } = await params;
  const { invitationData } = await fetchInvitationCode(invitationCode);

  const coachName =
    invitationData?.user.firstName + " " + invitationData?.user.lastName;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-green-50 py-6">
      {user.organization ? (
        <p className="text-sm text-accent-gray-300">
          You are already connected to a team
        </p>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Team Invitation</h1>
          {invitationData ? (
            <>
              <div className="flex-center flex-col gap-3">
                <div className="flex-center flex-col gap-1.5">
                  <div className="relative h-28 w-28 overflow-hidden rounded-full">
                    <Image
                      src={invitationData.organization.logo}
                      alt={invitationData.organization.name}
                      fill
                    />
                  </div>
                  <h2 className="text-xl font-semibold">
                    {invitationData.organization.name}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={invitationData.user.profilePicture}
                      alt={coachName}
                      className="h-full w-full rounded-full object-cover"
                    />
                    <AvatarFallback>
                      {invitationData.user.firstName[0]}
                      {invitationData.user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h3>{coachName} (Head Coach)</h3>
                </div>
              </div>
              <JoinOrganizationButton
                organizationId={invitationData.organization._id}
              />
            </>
          ) : (
            <p className="mt-4 text-sm text-red-500">
              Sorry, this invitation is invalid or expired.
            </p>
          )}
        </>
      )}
    </div>
  );
}

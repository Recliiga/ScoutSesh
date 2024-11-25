import JoinOrganizationButton from "@/components/JoinOrganizationButton";
import { AvatarFallback } from "@/components/ui/avatar";
import { fetchInvitationCode } from "@/services/invitationServices";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import React from "react";

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ invitationCode: string }>;
}) {
  const { invitationCode } = await params;
  const { invitationData, error } = await fetchInvitationCode(invitationCode);
  if (error !== null) throw new Error(error);

  const coachName =
    invitationData?.user.firstName + " " + invitationData?.user.lastName;

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-6 bg-green-50 py-6">
      <h1 className="font-bold text-2xl">Team Invitation</h1>
      {invitationData ? (
        <>
          <div className="flex-col flex-center gap-3">
            <div className="flex-col flex-center gap-1.5">
              <div className="relative rounded-full w-28 h-28 overflow-hidden">
                <Image
                  src={invitationData.organization.logo}
                  alt={invitationData.organization.name}
                  fill
                />
              </div>
              <h2 className="font-semibold text-xl">
                {invitationData.organization.name}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={invitationData.user.profilePicture}
                  alt={coachName}
                  className="rounded-full object-cover"
                />
                <AvatarFallback>
                  {coachName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
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
        <p className="mt-4 text-red-500">
          Sorry, this invitation is invalid or expired.
        </p>
      )}
    </div>
  );
}

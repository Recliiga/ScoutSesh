"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  CalendarIcon,
  MapPinIcon,
  PenIcon,
  UserIcon,
  BuildingIcon,
  BookOpenIcon,
  MessageSquareIcon,
  CheckCircle,
  CameraIcon,
} from "lucide-react";
import Link from "next/link";
import { OrganizationType } from "@/db/models/Organization";
import LoadingIndicator from "../LoadingIndicator";
import useFormEntries from "@/hooks/useFormEntries";
import Error from "../AuthError";
import { uploadImageClient } from "@/lib/utils";
import { updateOrganization } from "@/actions/organizationActions";

const sportList = [
  "volleyball",
  "basketball",
  "soccer",
  "tennis",
  "swimming",
  "golf",
  "baseball",
  "football",
  "hockey",
  "rugby",
  "cricket",
  "track_and_field",
  "gymnastics",
  "boxing",
  "martial_arts",
];

function getMembershipEmoji(memberCount: string): string {
  const [, max] = memberCount.split("-").map((num) => parseInt(num));
  if (max <= 30) return "🥉";
  if (max <= 75) return "🥈";
  if (max <= 125) return "🥇";
  if (max <= 250) return "🏅";
  if (max <= 500) return "🏆";
  if (max <= 1000) return "🎖️";
  return "🏆🏆"; // For more than 1000 members
}

export default function OrganizationProfile({
  organization,
  isOrganizationHeadCoach,
}: {
  organization: OrganizationType;
  isOrganizationHeadCoach: boolean;
}) {
  const [organizationData, setOrganizationData] = useState(organization);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { formEntries, updateField } = useFormEntries({
    name: organizationData.name,
    logo: organizationData.logo,
    memberCount: organizationData.memberCount,
    location: organizationData.location,
    primarySport: organizationData.primarySport,
    bio: organizationData.bio,
    yearFounded: organizationData.yearFounded,
    type: organizationData.type,
  });

  async function handleUpdateUser() {
    if (!isOrganizationHeadCoach) return;
    setError(null);
    setLoading(true);
    let newLogo;
    if (!formEntries.logo.startsWith("http")) {
      const { url, error } = await uploadImageClient(formEntries.logo);
      if (error !== null) {
        setError("An error occured uploading profile picture");
        return;
      }
      newLogo = url;
    }

    const { updatedOrganization, error } = newLogo
      ? await updateOrganization(
          organization._id,
          {
            ...formEntries,
            logo: newLogo,
          },
          organization.user._id,
        )
      : await updateOrganization(
          organization._id,
          formEntries,
          organization.user._id,
        );
    if (error !== null) {
      setError(error);
      setLoading(false);
      return;
    }
    setOrganizationData(updatedOrganization);
    setLoading(false);
    setIsEditing(false);
  }

  function cancelEditing() {
    Object.keys(formEntries).forEach((key) => {
      updateField(
        key as keyof typeof formEntries,
        organizationData[key as keyof OrganizationType],
      );
    });
    setIsEditing(false);
  }

  function handleChangeLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const imageFile = e.target.files?.[0];
    if (!imageFile) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);

    fileReader.onload = (ev) => {
      const imageDataUrl = ev.target?.result;
      if (!imageDataUrl) return;

      updateField("logo", imageDataUrl as string);
    };
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl">
        <Card className="overflow-hidden shadow-lg">
          <div className="relative h-32 bg-[#14a800]">
            <div className="absolute -bottom-16 left-8">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage
                  src={isEditing ? formEntries.logo : organizationData.logo}
                  alt={organizationData.name}
                  className="bg-white object-cover"
                />
                <AvatarFallback>{organizationData.name[0]}</AvatarFallback>
                {isEditing && (
                  <label
                    className="flex-center absolute left-0 top-0 h-full w-full cursor-pointer rounded-full bg-black/50 text-white duration-200 hover:text-[#14a800]"
                    htmlFor="logo"
                  >
                    <CameraIcon className="h-6 w-6" />
                    <input
                      disabled={loading}
                      type="file"
                      name="logo"
                      id="logo"
                      accept="image/*"
                      hidden
                      onChange={handleChangeLogo}
                    />
                  </label>
                )}
              </Avatar>
            </div>
          </div>
          <CardHeader className="px-4 pb-0 pt-20 sm:px-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    disabled={loading}
                    placeholder="Organization name"
                    name="name"
                    value={formEntries.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full flex-1 rounded-md border px-4 py-2 text-sm disabled:bg-accent-gray-100"
                  />
                ) : (
                  <CardTitle className="text-3xl font-bold text-gray-800">
                    {organizationData.name}
                  </CardTitle>
                )}
                <div className="mt-1 flex items-center">
                  <p className="text-lg text-gray-700">
                    {organizationData.user.firstName}{" "}
                    {organizationData.user.lastName}
                  </p>
                  <Link
                    href={`/dashboard/profile/${organizationData._id}`}
                    passHref
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2 h-auto rounded-full px-3 py-1 text-xs"
                    >
                      View Profile
                    </Button>
                  </Link>
                </div>
                <p className="font-semibold text-[#14a800]">
                  {organizationData.user.role}
                </p>
                <div className="mt-2">
                  {isEditing ? (
                    <select
                      disabled={loading}
                      id="memberCount"
                      name="memberCount"
                      value={formEntries["memberCount"]}
                      onChange={(e) =>
                        updateField("memberCount", e.target.value)
                      }
                      className="w-fit flex-1 cursor-pointer truncate rounded-md border bg-white p-2 text-sm leading-5 duration-200 disabled:bg-accent-gray-100"
                      required
                    >
                      <option hidden>Select member count</option>
                      <option className="bg-white" value={"1-30 members"}>
                        1-30 members
                      </option>
                      <option className="bg-white" value={"31-75 members"}>
                        31-75 members
                      </option>
                      <option className="bg-white" value={"76-125 members"}>
                        76-125 members
                      </option>
                      <option className="bg-white" value={"126-250 members"}>
                        126-250 members
                      </option>
                      <option className="bg-white" value={"251-500 members"}>
                        251-500 members
                      </option>
                      <option className="bg-white" value={"501-1000 members"}>
                        501-1000 members
                      </option>
                      <option className="bg-white" value={"1000+ members"}>
                        1000+ members
                      </option>
                    </select>
                  ) : (
                    <div className="inline-block rounded-full bg-green-100 px-3 py-1 text-base font-semibold text-green-800">
                      {getMembershipEmoji(organizationData.memberCount)}{" "}
                      {organizationData.memberCount}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button className="bg-[#14a800] px-6 py-2 text-lg text-white hover:bg-[#14a800]/90">
                  <MessageSquareIcon className="mr-2 h-5 w-5" />
                  Message
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={isEditing && loading}
                  onClick={() =>
                    isEditing ? handleUpdateUser() : setIsEditing(true)
                  }
                  className={`order-[#14a800] text-[#14a800] hover:text-white ${isEditing ? "bg-[#14a800] hover:bg-[#14a800]/90" : "bg-white hover:bg-[#14a800]"}`}
                >
                  {isOrganizationHeadCoach ? (
                    isEditing ? (
                      loading ? (
                        <LoadingIndicator />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-white" />
                      )
                    ) : (
                      <PenIcon className="h-4 w-4" />
                    )
                  ) : null}
                  <span className="sr-only">Edit profile</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-4 sm:p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white p-3">
                  <MapPinIcon className="h-5 w-5 text-[#14a800]" />
                  <span className="text-sm text-gray-600">Location:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      disabled={loading}
                      name="location"
                      placeholder="Location"
                      value={formEntries.location}
                      onChange={(e) => updateField("location", e.target.value)}
                      className="w-0 flex-1 rounded-md border px-4 py-2 text-sm disabled:bg-accent-gray-100"
                    />
                  ) : (
                    <span className="font-medium text-gray-800">
                      {organizationData.location}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white p-3">
                  <UserIcon className="h-5 w-5 text-[#14a800]" />
                  <span className="text-sm text-gray-600">Sport:</span>
                  {isEditing ? (
                    <select
                      disabled={loading}
                      id="primarySport"
                      name="primarySport"
                      value={formEntries["primarySport"]}
                      onChange={(e) =>
                        updateField("primarySport", e.target.value)
                      }
                      className="w-0 max-w-fit flex-1 cursor-pointer truncate rounded-md border bg-white p-2 text-sm leading-5 duration-200 disabled:bg-accent-gray-100"
                      required
                    >
                      <option hidden>Primary Sport</option>
                      {sportList.map((sport) => (
                        <option key={sport} className="bg-white" value={sport}>
                          {sport[0].toUpperCase() + sport.slice(1)}
                        </option>
                      ))}
                      <option className="bg-white" value={"Program"}>
                        Program
                      </option>
                      <option className="bg-white" value={"Club"}>
                        Club
                      </option>
                      <option className="bg-white" value={"Organization"}>
                        Organization
                      </option>
                    </select>
                  ) : (
                    <span className="font-medium text-gray-800">
                      {organizationData.primarySport}
                    </span>
                  )}
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="mb-2 flex items-center text-lg font-semibold text-gray-800">
                  <BookOpenIcon className="mr-2 h-5 w-5 text-[#14a800]" />
                  About
                </h3>
                {isEditing ? (
                  <textarea
                    name="bio"
                    disabled={loading}
                    rows={3}
                    placeholder="Bio"
                    value={formEntries.bio}
                    onChange={(e) => updateField("bio", e.target.value)}
                    className="w-full rounded-md border p-2 text-sm disabled:bg-accent-gray-100"
                  ></textarea>
                ) : (
                  <p className="leading-relaxed text-gray-600">
                    {organizationData.bio}
                  </p>
                )}
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="mb-2 flex items-center text-lg font-semibold text-gray-800">
                  <BuildingIcon className="mr-2 h-5 w-5 text-[#14a800]" />
                  Organization Details
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#14a800]" />
                    Founded:{" "}
                    {isEditing ? (
                      <select
                        disabled={loading}
                        value={formEntries["yearFounded"]}
                        onChange={(e) =>
                          updateField("yearFounded", Number(e.target.value))
                        }
                        className="w-0 max-w-fit flex-1 cursor-pointer truncate rounded-md border bg-white p-2 text-sm leading-5 duration-200 disabled:bg-accent-gray-100"
                      >
                        <option value="" hidden>
                          Select year
                        </option>
                        {Array.from(
                          { length: new Date().getFullYear() - 1899 },
                          (_, i) => (
                            <option
                              key={i}
                              value={`${new Date().getFullYear() - i}`}
                              className="bg-white"
                            >
                              {new Date().getFullYear() - i}
                            </option>
                          ),
                        )}
                      </select>
                    ) : (
                      <span className="font-medium text-gray-800">
                        {organizationData.yearFounded}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <UserIcon className="mr-2 h-4 w-4 text-[#14a800]" />
                    Membership:{" "}
                    {isEditing ? (
                      <select
                        disabled={loading}
                        id="memberCount"
                        name="memberCount"
                        value={formEntries["memberCount"]}
                        onChange={(e) =>
                          updateField("memberCount", e.target.value)
                        }
                        className="w-0 max-w-fit flex-1 cursor-pointer truncate rounded-md border bg-white p-2 text-sm leading-5 duration-200 disabled:bg-accent-gray-100"
                        required
                      >
                        <option hidden>Select member count</option>
                        <option className="bg-white" value={"1-30 members"}>
                          1-30 members
                        </option>
                        <option className="bg-white" value={"31-75 members"}>
                          31-75 members
                        </option>
                        <option className="bg-white" value={"76-125 members"}>
                          76-125 members
                        </option>
                        <option className="bg-white" value={"126-250 members"}>
                          126-250 members
                        </option>
                        <option className="bg-white" value={"251-500 members"}>
                          251-500 members
                        </option>
                        <option className="bg-white" value={"501-1000 members"}>
                          501-1000 members
                        </option>
                        <option className="bg-white" value={"1000+ members"}>
                          1000+ members
                        </option>
                      </select>
                    ) : (
                      <span className="font-medium text-gray-800">
                        {getMembershipEmoji(organizationData.memberCount)}{" "}
                        {organizationData.memberCount}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BuildingIcon className="mr-2 h-4 w-4 text-[#14a800]" />
                    Type:{" "}
                    {isEditing ? (
                      <select
                        disabled={loading}
                        id="type"
                        name="type"
                        value={formEntries["type"]}
                        onChange={(e) => updateField("type", e.target.value)}
                        className="w-0 max-w-fit flex-1 cursor-pointer truncate rounded-md border bg-white p-2 text-sm leading-5 duration-200 disabled:bg-accent-gray-100"
                        required
                      >
                        <option hidden>Organization Type</option>
                        <option className="bg-white" value={"Team"}>
                          Team
                        </option>
                        <option className="bg-white" value={"Program"}>
                          Program
                        </option>
                        <option className="bg-white" value={"Club"}>
                          Club
                        </option>
                        <option className="bg-white" value={"Organization"}>
                          Organization
                        </option>
                      </select>
                    ) : (
                      <span className="font-medium text-gray-800">
                        {organizationData.type}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {isEditing && error && (
              <div style={{ marginTop: "8px" }}>
                <Error error={error} />
              </div>
            )}
            {isEditing ? (
              <div className="flex justify-end gap-4">
                <Button
                  disabled={loading}
                  onClick={cancelEditing}
                  variant={"outline"}
                >
                  Cancel
                </Button>
                <Button
                  disabled={loading}
                  className="bg-accent-green-100 duration-200 hover:bg-accent-green-100/90"
                  onClick={handleUpdateUser}
                >
                  {loading ? (
                    <>
                      <LoadingIndicator /> Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </Button>
              </div>
            ) : null}
          </CardContent>
          <CardFooter className="flex justify-center pt-6">
            <p className="text-sm text-gray-500">
              Member since {new Date().getFullYear()}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

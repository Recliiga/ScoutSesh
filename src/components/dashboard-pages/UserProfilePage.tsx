"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  MapPinIcon,
  PenIcon,
  BriefcaseIcon,
  BookOpenIcon,
  TrophyIcon,
  MessageSquareIcon,
  CheckCircle,
  CalendarIcon,
  CameraIcon,
} from "lucide-react";
import { PrimarySportType, UserType } from "@/db/models/User";
import { cn, getFullname, uploadImageClient } from "@/lib/utils";
import useFormEntries from "@/hooks/useFormEntries";
import { updateUser } from "@/actions/userActions";
import LoadingIndicator from "../LoadingIndicator";
import Error from "../AuthError";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import useClickOutside from "@/hooks/useClickOutside";

export default function UserProfilePage({
  user,
  isOwnProfile,
}: {
  user: UserType;
  isOwnProfile: boolean;
}) {
  const [userData, setUserData] = useState<UserType>(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [calendarRef] = useClickOutside(() => setCalendarOpen(false));

  const { formEntries, updateField } = useFormEntries({
    firstName: user.firstName,
    lastName: user.lastName,
    profilePicture: user.profilePicture,
    location: user.location,
    primarySport: user.primarySport,
    experience: user.experience,
    bio: user.bio,
    DOB: new Date(user.DOB).toString(),
    selectedMonth: new Date(user.DOB).getMonth(),
    selectedYear: new Date(user.DOB).getFullYear(),
  });

  async function handleUpdateUser() {
    if (!isOwnProfile) return;
    setError(null);
    setLoading(true);
    let newProfilePicture;
    if (!formEntries.profilePicture.startsWith("http")) {
      const { url, error } = await uploadImageClient(
        formEntries.profilePicture,
      );
      if (error !== null) {
        setError("An error occured uploading profile picture");
        return;
      }
      newProfilePicture = url;
    }

    const { updatedUser, error } = newProfilePicture
      ? await updateUser(user._id, {
          ...formEntries,
          profilePicture: newProfilePicture,
        })
      : await updateUser(user._id, formEntries);
    if (error !== null) {
      setError(error);
      setLoading(false);
      return;
    }
    setUserData(updatedUser);
    setLoading(false);
    setIsEditing(false);
  }

  function cancelEditing() {
    Object.keys(formEntries).forEach((key) => {
      updateField(
        key as keyof typeof formEntries,
        userData[key as keyof UserType],
      );
    });
    setIsEditing(false);
  }

  function handleChangeProfilePicture(e: React.ChangeEvent<HTMLInputElement>) {
    const imageFile = e.target.files?.[0];
    if (!imageFile) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);

    fileReader.onload = (ev) => {
      const imageDataUrl = ev.target?.result;
      if (!imageDataUrl) return;

      updateField("profilePicture", imageDataUrl as string);
    };
  }

  const dateOfBirth = new Date(userData.DOB);
  const monthOfBirth = dateOfBirth.getMonth() + 1;
  const dayOfBirth = dateOfBirth.getDate();
  const formattedDOB = `${dateOfBirth.getFullYear()}-${monthOfBirth < 10 ? "0" : ""}${monthOfBirth}-${dayOfBirth < 10 ? "0" : ""}${dayOfBirth}`;

  return (
    <main className="flex-1 bg-gray-50 py-4">
      <div className="flex-center mx-auto w-[90%] max-w-4xl">
        <Card className="flex-1 overflow-hidden shadow-lg">
          <div className="relative h-32 bg-[#14a800]">
            <div className="absolute -bottom-16 left-8">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage
                  src={
                    isEditing
                      ? formEntries.profilePicture
                      : userData.profilePicture
                  }
                  alt={getFullname(user)}
                  className="bg-white object-cover"
                />
                <AvatarFallback>
                  {userData.firstName[0]}
                  {userData.lastName[0]}
                </AvatarFallback>
                {isEditing && (
                  <label
                    htmlFor="profilePicture"
                    className="flex-center absolute left-0 top-0 h-full w-full cursor-pointer rounded-full bg-black/50 text-white duration-200 hover:text-[#14a800]"
                  >
                    <CameraIcon className="h-6 w-6" />
                    <input
                      disabled={loading}
                      type="file"
                      name="profilePicture"
                      id="profilePicture"
                      accept="image/*"
                      hidden
                      onChange={handleChangeProfilePicture}
                    />
                  </label>
                )}
              </Avatar>
            </div>
          </div>
          <CardHeader className="px-4 pb-0 pt-20 sm:px-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1">
                {isEditing ? (
                  <div className="flex w-full gap-2">
                    <input
                      type="text"
                      disabled={loading}
                      placeholder="First name"
                      name="firstName"
                      value={formEntries.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className="w-0 max-w-40 flex-1 rounded-md border px-4 py-2 text-sm disabled:bg-accent-gray-100"
                    />
                    <input
                      type="text"
                      disabled={loading}
                      placeholder="Last name"
                      name="lastName"
                      value={formEntries.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      className="w-0 max-w-40 flex-1 rounded-md border px-4 py-2 text-sm disabled:bg-accent-gray-100"
                    />
                  </div>
                ) : (
                  <CardTitle className="text-3xl font-bold text-gray-800">
                    {userData.firstName} {userData.lastName}
                  </CardTitle>
                )}
                <p className="font-semibold text-[#14a800]">{userData.role}</p>
                {user.organization && user.organization._id ? (
                  <div className="mt-2 w-fit">
                    <Link
                      href={`/dashboard/organization/${user.organization._id}`}
                      className="flex items-center space-x-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-800 hover:bg-gray-50"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={user.organization.logo}
                          alt={user.organization.name}
                          className="object-cover"
                        />
                        <AvatarFallback>
                          {user.organization.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span>{user.organization.name}</span>
                    </Link>
                  </div>
                ) : null}
              </div>
              <div className="flex items-center space-x-2">
                <Button className="bg-[#14a800] px-6 py-2 text-base text-white hover:bg-[#14a800]/90 sm:text-lg">
                  <MessageSquareIcon className="mr-2 h-5 w-5" />
                  Message
                </Button>
                {isOwnProfile ? (
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={isEditing && loading}
                    onClick={() =>
                      isEditing ? handleUpdateUser() : setIsEditing(true)
                    }
                    className={`order-[#14a800] text-[#14a800] hover:text-white ${isEditing ? "bg-[#14a800] hover:bg-[#14a800]/90" : "bg-white hover:bg-[#14a800]"}`}
                  >
                    {isEditing ? (
                      loading ? (
                        <LoadingIndicator />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-white" />
                      )
                    ) : (
                      <PenIcon className="h-4 w-4" />
                    )}
                    <span className="sr-only">Edit profile</span>
                  </Button>
                ) : null}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-4 sm:p-6">
            <div
              className={`grid grid-cols-1 gap-4 ${user.role === "Athlete" ? "sm:grid-cols-2" : "md:grid-cols-3"}`}
            >
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
                    {userData.location}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white p-3">
                <TrophyIcon className="h-5 w-5 text-[#14a800]" />
                <span className="text-sm text-gray-600">Sport:</span>
                {isEditing ? (
                  <input
                    type="text"
                    disabled={loading}
                    name="primarySport"
                    placeholder="Primary sport"
                    value={formEntries.primarySport}
                    onChange={(e) =>
                      updateField(
                        "primarySport",
                        e.target.value as PrimarySportType,
                      )
                    }
                    className="w-0 flex-1 rounded-md border px-4 py-2 text-sm disabled:bg-accent-gray-100"
                  />
                ) : (
                  <span className="font-medium text-gray-800">
                    {userData.primarySport}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white p-3">
                <BriefcaseIcon className="h-5 w-5 text-[#14a800]" />
                <span className="text-sm text-gray-600">Experience:</span>
                {isEditing ? (
                  <input
                    type="number"
                    disabled={loading}
                    name="experience"
                    placeholder="Years of experience"
                    value={formEntries.experience || ""}
                    onChange={(e) =>
                      updateField("experience", Number(e.target.value))
                    }
                    className="w-0 flex-1 rounded-md border px-4 py-2 text-sm disabled:bg-accent-gray-100"
                  />
                ) : (
                  <span className="font-medium text-gray-800">
                    {userData.experience} years
                  </span>
                )}
              </div>
              {user.role === "Athlete" ? (
                <div className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white p-3">
                  <CalendarIcon className="h-5 w-5 text-[#14a800]" />
                  <span className="text-sm text-gray-600">Date of Birth:</span>
                  {isEditing ? (
                    <div className="relative" ref={calendarRef}>
                      <Button
                        disabled={loading}
                        onClick={() => setCalendarOpen((prev) => !prev)}
                        type="button"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formEntries.DOB && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formEntries.DOB ? (
                          format(formEntries.DOB, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                      <div
                        className={`absolute bottom-[calc(100%+4px)] left-0 rounded-md border bg-white shadow ${calendarOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"}}`}
                      >
                        <div className="flex justify-between p-3">
                          <select
                            disabled={loading}
                            value={formEntries.selectedYear}
                            onChange={(e) =>
                              updateField(
                                "selectedYear",
                                parseInt(e.target.value),
                              )
                            }
                            className="rounded border px-2 py-1"
                          >
                            {Array.from(
                              { length: 100 },
                              (_, i) => new Date().getFullYear() - i,
                            ).map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                          <select
                            disabled={loading}
                            value={formEntries.selectedMonth.toString()}
                            onChange={(e) =>
                              updateField(
                                "selectedMonth",
                                Number(e.target.value),
                              )
                            }
                            className="rounded border px-2 py-1"
                          >
                            {Array.from({ length: 12 }, (_, i) => i).map(
                              (month) => (
                                <option key={month} value={month}>
                                  {format(new Date(2000, month, 1), "MMMM")}
                                </option>
                              ),
                            )}
                          </select>
                        </div>
                        <Calendar
                          disabled={loading}
                          mode="single"
                          selected={new Date(formEntries.DOB)}
                          onSelect={(value) => {
                            if (!value) return;
                            updateField("DOB", value.toString());
                            setCalendarOpen(false);
                          }}
                          month={
                            new Date(
                              formEntries.selectedYear,
                              formEntries.selectedMonth,
                            )
                          }
                          onMonthChange={(date) => {
                            updateField("selectedMonth", date.getMonth());
                            updateField("selectedYear", date.getFullYear());
                          }}
                          initialFocus
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="font-medium text-gray-800">
                      {formattedDOB}
                    </span>
                  )}
                </div>
              ) : null}
            </div>
            <div className="mt-6 space-y-2 rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="flex items-center text-lg font-semibold text-gray-800">
                <BookOpenIcon className="mr-2 h-5 w-5 text-[#14a800]" />
                About Me
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
                <p className="leading-relaxed text-gray-600">{userData.bio}</p>
              )}
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
        </Card>
      </div>
    </main>
  );
}

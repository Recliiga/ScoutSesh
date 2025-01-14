"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2, SearchIcon } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn, resizeImage, uploadImageClient } from "@/lib/utils";
import Image from "next/image";
import { completeProfile } from "@/actions/userActions";
import { useSearchParams } from "next/navigation";
import Error from "./AuthError";
import useFormEntries from "@/hooks/useFormEntries";
import Select from "./Select";
import useClickOutside from "@/hooks/useClickOutside";
import { PrimarySportType, UserRoleType, UserType } from "@/db/models/User";
import { CountryDataType } from "@/services/userServices";

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

export default function CompleteAthleteProfileForm({
  user,
  countries,
}: {
  user: UserType;
  countries: CountryDataType[];
}) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [calendarRef] = useClickOutside(() => setCalendarOpen(false));
  const [imageError, setImageError] = useState<string | null>(null);

  const [countrySearchQuery, setCountrySearchQuery] = useState("");

  const { formEntries, updateField } = useFormEntries({
    userId: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    selectedMonth: user.DOB
      ? new Date(user.DOB).getMonth()
      : new Date().getMonth(),
    selectedYear: user.DOB
      ? new Date(user.DOB).getFullYear()
      : new Date().getFullYear(),
    DOB: user.DOB ? new Date(user.DOB).toDateString() : "",
    profilePicture: user.profilePicture || "",
    city: user.city || "",
    country: user.country || { name: "", iso2: "" },
    primarySport: user.primarySport || "",
    experience: user.experience?.toString() || "",
    bio: user.bio || "",
  });

  const filteredCountries = countries.filter(
    (country) =>
      country.name
        .toLowerCase()
        .includes(countrySearchQuery.toLowerCase().trim()) ||
      country.iso2
        .toLowerCase()
        .includes(countrySearchQuery.toLowerCase().trim()),
  );

  function updateCountryField(countryISO2: string) {
    const selectedCountry = countries.find(
      (country) => country.iso2 === countryISO2,
    );
    if (!selectedCountry) return;

    updateField("country", {
      name: selectedCountry.name || "",
      iso2: countryISO2,
    });
    updateField("city", "");
  }

  const fileInputRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const cannotSubmit =
    Object.values(formEntries).some(
      (value) => value.toString().trim() === "",
    ) || formEntries.country.iso2.trim() === "";

  async function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 10485759) {
      setImageError(
        "File too large: Please select an image less than 10mb in size",
      );
      return;
    }

    const resizedImageUrl = await resizeImage(file);
    if (!resizedImageUrl) return;

    updateField("profilePicture", resizedImageUrl);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (cannotSubmit) return;

    setLoading(true);

    const userData = {
      firstName: formEntries.firstName,
      lastName: formEntries.lastName,
      role: formEntries.role,
      DOB: formEntries.DOB,
      profilePicture: formEntries.profilePicture,
      city: formEntries.city,
      primarySport: formEntries.primarySport,
      experience: formEntries.experience,
      bio: formEntries.bio,
    };

    // Upload profile picture
    const { url, error: uploadError } = await uploadImageClient(
      formEntries.profilePicture,
    );
    if (uploadError !== null) {
      setError("An error occured uploading profile picture");
      setLoading(false);
      return;
    }
    userData.profilePicture = url;

    const data = await completeProfile(userData, redirectUrl);
    if (data?.error) {
      setError(error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 flex flex-col items-center gap-4">
        <Label htmlFor="profilePicture" className="text-center">
          Profile Photo
        </Label>
        <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gray-100">
          {formEntries.profilePicture ? (
            <Image
              src={formEntries.profilePicture}
              alt="Profile"
              fill
              sizes="128px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              <svg
                className="h-16 w-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Photo
        </Button>
        {imageError && <Error error={imageError} />}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChangeImage}
          accept="image/*"
          className="hidden"
          name="profilePicture"
          id="profilePicture"
        />
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formEntries.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formEntries.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            disabled
            value={formEntries.email}
            onChange={(e) => updateField("email", e.target.value)}
            type="email"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="role">Role</Label>
          <div className="relative">
            <select
              id="role"
              name="role"
              className="w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm leading-5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formEntries.role}
              onChange={(e) =>
                updateField("role", e.target.value as UserRoleType)
              }
              required
            >
              {formEntries.role === "Head Coach" ? (
                <option value={"Head Coach"}>Head Coach</option>
              ) : (
                <>
                  <option value={"Athlete"}>Athlete</option>
                  {/* <option value={"Assistant Coach"}>Assistant Coach</option> */}
                </>
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Date of Birth</Label>
          <div className="relative" ref={calendarRef}>
            <Button
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
                  value={formEntries.selectedYear}
                  onChange={(e) =>
                    updateField("selectedYear", parseInt(e.target.value))
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
                  value={formEntries.selectedMonth.toString()}
                  onChange={(e) =>
                    updateField("selectedMonth", Number(e.target.value))
                  }
                  className="rounded border px-2 py-1"
                >
                  {Array.from({ length: 12 }, (_, i) => i).map((month) => (
                    <option key={month} value={month}>
                      {format(new Date(2000, month, 1), "MMMM")}
                    </option>
                  ))}
                </select>
              </div>
              <Calendar
                mode="single"
                selected={new Date(formEntries.DOB)}
                onSelect={(value) => {
                  if (!value) return;
                  updateField("DOB", value.toString());
                  setCalendarOpen(false);
                }}
                month={
                  new Date(formEntries.selectedYear, formEntries.selectedMonth)
                }
                onMonthChange={(date) => {
                  updateField("selectedMonth", date.getMonth());
                  updateField("selectedYear", date.getFullYear());
                }}
                initialFocus
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="country">Country</Label>
          <div className="relative">
            <Select
              value={formEntries.country.iso2}
              onChange={(value) => updateCountryField(value)}
              placeholder="Select Country"
              defaultChild={formEntries.country.name}
              disabled
            >
              <Select.Content className="px-0 pt-0">
                <div className="sticky top-0 flex items-center border-b bg-white px-2">
                  <SearchIcon className="h-4 w-4 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search Countries"
                    className="w-full p-2"
                    value={countrySearchQuery}
                    onChange={(e) => setCountrySearchQuery(e.target.value)}
                  />
                </div>
                {filteredCountries.map((country) => (
                  <Select.Option value={country.iso2} key={country.iso2}>
                    {country.name}
                  </Select.Option>
                ))}
              </Select.Content>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="city">City</Label>
          <Input
            value={formEntries.city}
            placeholder="e.g. New York"
            onChange={(e) => updateField("city", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="primarySport">Primary Sport</Label>
          <Select
            value={formEntries.primarySport}
            onChange={(value) =>
              updateField("primarySport", value as PrimarySportType)
            }
            placeholder="e.g., Basketball, Soccer, Tennis"
          >
            <Select.Content>
              {sportList.map((sport) => (
                <Select.Option value={sport} key={sport}>
                  {sport[0].toUpperCase() + sport.slice(1)}
                </Select.Option>
              ))}
            </Select.Content>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="experience">Years of Experience</Label>
          <Input
            id="experience"
            name="experience"
            value={formEntries.experience}
            onChange={(e) => updateField("experience", e.target.value)}
            type="number"
            min="0"
            placeholder="e.g., 5"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bio">Short Bio</Label>
          <textarea
            id="bio"
            name="bio"
            value={formEntries.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            className="min-h-[100px] w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm leading-5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Tell us a bit about yourself..."
          />
          {error && <Error error={error} />}
        </div>
        <Button
          className="w-full bg-[#14a800] text-white hover:bg-[#14a800]/90"
          type="submit"
          disabled={loading || cannotSubmit}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Saving..." : "Complete Profile"}
        </Button>
      </div>
    </form>
  );
}

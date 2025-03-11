"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2, SearchIcon } from "lucide-react";
import { resizeImage, uploadImageClient } from "@/lib/utils";
import Image from "next/image";
import { createOrganization } from "@/actions/organizationActions";
import { useSearchParams } from "next/navigation";
import Error from "./AuthError";
import useFormEntries from "@/hooks/useFormEntries";
import Select from "./Select";
import { CountryDataType } from "@/services/userServices";
import { sportList } from "@/lib/constants";

export default function OrganizationRegistrationForm({
  userId,
  countries,
}: {
  userId: string;
  countries: CountryDataType[];
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [imageError, setImageError] = useState<string | null>(null);
  const [countrySearchQuery, setCountrySearchQuery] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { formEntries, updateField } = useFormEntries({
    userId,
    logo: "",
    organizationType: "",
    organizationName: "",
    memberCount: "",
    city: "",
    country: { name: "", iso2: "" },
    primarySport: "",
    yearFounded: "",
    bio: "",
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

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const cannotSubmit = Object.entries(formEntries).some(([key, value]) => {
    if (key !== "organizationID") {
      if (typeof value === "string") {
        return value.trim() === "";
      }
      return value.iso2.trim() === "";
    } else {
      return false;
    }
  });

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
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

    updateField("logo", resizedImageUrl);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (cannotSubmit) return;
    setLoading(true);

    const organizationData = {
      name: formEntries.organizationName,
      logo: formEntries.logo,
      type: formEntries.organizationType,
      memberCount: formEntries.memberCount,
      city: formEntries.city,
      country: formEntries.country,
      primarySport: formEntries.primarySport,
      yearFounded: formEntries.yearFounded,
      bio: formEntries.bio,
    };

    // Upload organization logo
    const { url, error: uploadError } = await uploadImageClient(
      formEntries.logo,
    );
    if (uploadError !== null) {
      setError("An error occured uploading organization logo");
      setLoading(false);
      return;
    }
    organizationData.logo = url;

    const data = await createOrganization(organizationData, redirectUrl);
    if (data?.error) {
      setError(error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 flex flex-col items-center gap-4">
        <Label htmlFor="logo" className="text-center">
          Organization Logo
        </Label>
        <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gray-100">
          {formEntries.logo ? (
            <Image
              src={formEntries.logo}
              alt="Logo Preview"
              layout="fill"
              objectFit="cover"
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
          id="logo"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative flex flex-col gap-2">
          <Label htmlFor="organizationType">Organization Type</Label>
          <select
            id="organizationType"
            name="organizationType"
            value={formEntries["organizationType"]}
            onChange={(e) => updateField("organizationType", e.target.value)}
            className="w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm leading-5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option hidden>Select organization type</option>
            <option value="Team">Team</option>
            <option value="Program">Program</option>
            <option value="Club">Club</option>
            <option value="Association">Association</option>
            <option value="Other">Other</option>
          </select>
          <ArrowRight className="absolute bottom-3 right-2 h-4 w-4" />
        </div>
        {formEntries.organizationType === "Other" && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="customOrganizationType">
              Specify Organization Type
            </Label>
            <Input
              id="customOrganizationType"
              value={formEntries["organizationType"]}
              onChange={(e) => updateField("organizationType", e.target.value)}
              placeholder="Enter your organization type"
              required
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <Label htmlFor="organizationName">Organization Name</Label>
          <Input
            id="organizationName"
            name="organizationName"
            value={formEntries["organizationName"]}
            onChange={(e) => updateField("organizationName", e.target.value)}
            placeholder="e.g., Riverside Basketball Club"
            required
          />
        </div>
        <div className="relative flex flex-col gap-2">
          <Label htmlFor="memberCount">Number of Members</Label>
          <select
            id="memberCount"
            name="memberCount"
            value={formEntries["memberCount"]}
            onChange={(e) => updateField("memberCount", e.target.value)}
            className="w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm leading-5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option hidden>Select member count</option>
            <option value={"1-30 members"}>1-30 members</option>
            <option value={"31-75 members"}>31-75 members</option>
            <option value={"76-125 members"}>76-125 members</option>
            <option value={"126-250 members"}>126-250 members</option>
            <option value={"251-500 members"}>251-500 members</option>
            <option value={"501-1000 members"}>501-1000 members</option>
            <option value={"1000+ members"}>1000+ members</option>
          </select>
          <ArrowRight className="absolute bottom-3 right-2 h-4 w-4" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="country">Country</Label>
          <div className="relative">
            <Select
              value={formEntries.country.iso2}
              onChange={(value) => updateCountryField(value)}
              placeholder="Select Country"
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
            onChange={(value) => updateField("primarySport", value)}
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
          <Label htmlFor="yearFounded">Founded Year</Label>
          <select
            value={formEntries["yearFounded"]}
            onChange={(e) => updateField("yearFounded", e.target.value)}
            className="w-full rounded border p-2"
          >
            <option value="">Select year</option>
            {Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => (
              <option key={i} value={`${new Date().getFullYear() - i}`}>
                {new Date().getFullYear() - i}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bio">Short Bio</Label>
          <textarea
            id="bio"
            name="bio"
            value={formEntries["bio"]}
            onChange={(e) => updateField("bio", e.target.value)}
            className="min-h-[100px] w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm leading-5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Tell us a bit about your organization..."
          />
          {error && <Error error={error} />}
        </div>
        <Button
          className="w-full bg-[#14a800] text-white hover:bg-[#14a800]/90"
          type="submit"
          disabled={loading || cannotSubmit}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Creating..." : "Create Organization"}
        </Button>
      </div>
    </form>
  );
}

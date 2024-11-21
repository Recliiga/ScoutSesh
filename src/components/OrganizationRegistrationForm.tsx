"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2 } from "lucide-react";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { createOrganization } from "@/actions/authActions";
import { useRouter, useSearchParams } from "next/navigation";
import Error from "./AuthError";
import useFormEntries from "@/hooks/useFormEntries";

export default function OrganizationRegistrationForm({
  userId,
}: {
  userId: string;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { formEntries, updateField } = useFormEntries({
    userId,
    profilePicture: "",
    organizationType: "",
    organizationName: "",
    memberCount: "",
    location: "",
    primarySport: "",
    yearFounded: "",
    bio: "",
  });

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const cannotSubmit = Object.entries(formEntries).some(([key, value]) =>
    key !== "organizationID" ? value.trim() === "" : false
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField("profilePicture", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (cannotSubmit) return;
    setLoading(true);

    const formData = new FormData();
    for (const k in formEntries) {
      const key = k as keyof typeof formEntries;
      formData.append(key, formEntries[key]);
    }

    const { error } = await createOrganization(formData);
    setError(error);
    if (!error) {
      router.replace(redirectUrl);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-4 mb-6">
        <Label htmlFor="profilePicture" className="text-center">
          Organization Profile Photo
        </Label>
        <div className="relative bg-gray-100 rounded-full w-32 h-32 overflow-hidden">
          {formEntries.profilePicture ? (
            <Image
              src={formEntries.profilePicture}
              alt="Profile"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <div className="flex justify-center items-center w-full h-full text-gray-400">
              <svg
                className="w-16 h-16"
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
        <input
          type="file"
          id="profilePicture"
          ref={fileInputRef}
          onChange={handleImageUpload}
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
            className="border-gray-300 bg-white py-2 pr-10 pl-3 border focus:border-blue-500 rounded-md focus:ring-1 focus:ring-blue-500 w-full text-sm leading-5 appearance-none focus:outline-none"
            required
          >
            <option hidden>Select organization type</option>
            <option value="Team">Team</option>
            <option value="Program">Program</option>
            <option value="Club">Club</option>
            <option value="Association">Association</option>
            <option value="Other">Other</option>
          </select>
          <ArrowRight className="right-2 bottom-3 absolute w-4 h-4" />
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
            className="border-gray-300 bg-white py-2 pr-10 pl-3 border focus:border-blue-500 rounded-md focus:ring-1 focus:ring-blue-500 w-full text-sm leading-5 appearance-none focus:outline-none"
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
          <ArrowRight className="right-2 bottom-3 absolute w-4 h-4" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <MapPinIcon className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 transform -translate-y-1/2" />
            <Input
              id="location"
              name="location"
              value={formEntries["location"]}
              onChange={(e) => updateField("location", e.target.value)}
              className="pl-10"
              placeholder="City, Country"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="primarySport">Primary Sport</Label>
          <Input
            id="primarySport"
            name="primarySport"
            value={formEntries["primarySport"]}
            onChange={(e) => updateField("primarySport", e.target.value)}
            placeholder="e.g., Basketball, Soccer, Tennis"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="yearFounded">Founded Year</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="yearFounded"
                name="yearFounded"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formEntries.yearFounded && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 w-4 h-4" />
                {formEntries.yearFounded ? (
                  format(formEntries.yearFounded, "yyyy")
                ) : (
                  <span>Select year</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto" align="start">
              <div className="flex flex-col gap-2 p-4">
                <select
                  value={formEntries["yearFounded"]}
                  onChange={(e) => updateField("yearFounded", e.target.value)}
                  className="p-2 border rounded w-full"
                >
                  <option value="">Select year</option>
                  {Array.from(
                    { length: new Date().getFullYear() - 1899 },
                    (_, i) => (
                      <option key={i} value={`${new Date().getFullYear() - i}`}>
                        {new Date().getFullYear() - i}
                      </option>
                    )
                  )}
                </select>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bio">Short Bio</Label>
          <textarea
            id="bio"
            name="bio"
            value={formEntries["bio"]}
            onChange={(e) => updateField("bio", e.target.value)}
            className="border-gray-300 bg-white px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-1 focus:ring-blue-500 w-full min-h-[100px] text-sm leading-5 appearance-none focus:outline-none"
            placeholder="Tell us a bit about your organization..."
          />
          {error && <Error error={error} />}
        </div>
        <Button
          className="bg-[#14a800] hover:bg-[#14a800]/90 w-full text-white"
          type="submit"
          disabled={loading || cannotSubmit}
        >
          {loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
          {loading ? "Saving..." : "Complete Profile"}
        </Button>
      </div>
    </form>
  );
}

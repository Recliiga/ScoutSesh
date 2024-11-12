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
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { completeProfile } from "@/actions/authActions";
import { useRouter } from "next/navigation";
import AuthError from "./AuthError";

interface ProfileProps {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function CompleteAthleteProfileForm({
  firstName,
  lastName,
  email,
  role,
}: ProfileProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [dob, setDob] = useState<Date>();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    if (!profilePicture || !dob) return;
    formData.set("profilePicture", profilePicture);
    formData.set("DOB", dob.toString());
    formData.set("email", email);
    const { error } = await completeProfile(formData);
    if (!error) {
      router.replace("/app");
    }
    setError(error);
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-4 mb-6">
        <Label htmlFor="profilePicture" className="text-center">
          Profile Photo
        </Label>
        <div className="relative bg-gray-100 rounded-full w-32 h-32 overflow-hidden">
          {profilePicture ? (
            <Image
              src={profilePicture}
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
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
          name="profilePicture"
          id="profilePicture"
        />
      </div>
      <div className="space-y-4">
        <div className="gap-4 grid grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              name="firstName"
              defaultValue={firstName}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              name="lastName"
              defaultValue={lastName}
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
            defaultValue={email}
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
              className="border-gray-300 bg-white py-2 pr-10 pl-3 border focus:border-blue-500 rounded-md focus:ring-1 focus:ring-blue-500 w-full text-sm leading-5 appearance-none focus:outline-none"
              defaultValue={role}
              required
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value={"athlete"}>Athlete</option>
              <option value={"assistant-coach"}>Assistant Coach</option>
            </select>
            <div className="right-0 absolute inset-y-0 flex items-center px-2 text-gray-700 pointer-events-none">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dob && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 w-4 h-4" />
                {dob ? format(dob, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto" align="start">
              <div className="flex justify-between p-3">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="px-2 py-1 border rounded"
                >
                  {Array.from(
                    { length: 100 },
                    (_, i) => new Date().getFullYear() - i
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="px-2 py-1 border rounded"
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
                selected={dob}
                onSelect={setDob}
                month={new Date(selectedYear, selectedMonth)}
                onMonthChange={(date) => {
                  setSelectedMonth(date.getMonth());
                  setSelectedYear(date.getFullYear());
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <MapPinIcon className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 transform -translate-y-1/2" />
            <Input
              id="location"
              name="location"
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
            placeholder="e.g., Basketball, Soccer, Tennis"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="experience">Years of Experience</Label>
          <Input
            id="experience"
            name="experience"
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
            className="border-gray-300 bg-white px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-1 focus:ring-blue-500 w-full min-h-[100px] text-sm leading-5 appearance-none focus:outline-none"
            placeholder="Tell us a bit about yourself..."
          />
          {error && <AuthError error={error} />}
        </div>
        <Button
          className="bg-[#14a800] hover:bg-[#14a800]/90 w-full text-white"
          type="submit"
          disabled={loading || !profilePicture || !dob}
        >
          {loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
          {loading ? "Saving..." : "Complete Profile"}
        </Button>
      </div>
    </form>
  );
}

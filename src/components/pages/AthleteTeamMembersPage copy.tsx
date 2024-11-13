"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const coaches = [
  {
    id: 1,
    photo: "/placeholder-profile-picture.png",
    name: "John Doe",
    role: "Head Coach",
  },
  {
    id: 2,
    photo: "/placeholder-profile-picture.png",
    name: "Jane Smith",
    role: "Assistant Coach",
  },
  {
    id: 3,
    photo: "/placeholder-profile-picture.png",
    name: "Mike Johnson",
    role: "Assistant Coach",
  },
  {
    id: 4,
    photo: "/placeholder-profile-picture.png",
    name: "Sarah Brown",
    role: "Assistant Coach",
  },
  {
    id: 5,
    photo: "/placeholder-profile-picture.png",
    name: "David Lee",
    role: "Assistant Coach",
  },
  {
    id: 6,
    photo: "/placeholder-profile-picture.png",
    name: "Emily Chen",
    role: "Assistant Coach",
  },
];

const teamMembers = [
  {
    id: 1,
    name: "Alex J.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 15,
  },
  {
    id: 2,
    name: "Sam S.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 7,
  },
  {
    id: 3,
    name: "Taylor L.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: null,
  },
  {
    id: 4,
    name: "Jordan P.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 22,
  },
  {
    id: 5,
    name: "Casey W.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 3,
  },
  {
    id: 6,
    name: "Morgan C.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 18,
  },
  {
    id: 7,
    name: "Riley G.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: null,
  },
  {
    id: 8,
    name: "Quinn F.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 9,
  },
  {
    id: 9,
    name: "Avery T.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 12,
  },
  {
    id: 10,
    name: "Jamie R.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 5,
  },
  {
    id: 11,
    name: "Blake M.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 25,
  },
  {
    id: 12,
    name: "Charlie K.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: null,
  },
  {
    id: 13,
    name: "Drew N.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 18,
  },
  {
    id: 14,
    name: "Emerson P.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 8,
  },
  {
    id: 15,
    name: "Finley R.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 2,
  },
  {
    id: 16,
    name: "Gale O.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 29,
  },
  {
    id: 17,
    name: "Harper S.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 11,
  },
  {
    id: 18,
    name: "Indigo C.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: null,
  },
  {
    id: 19,
    name: "Jude F.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 21,
  },
  {
    id: 20,
    name: "Kai T.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 15,
  },
  {
    id: 21,
    name: "London W.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 4,
  },
  {
    id: 22,
    name: "Micah G.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 27,
  },
  {
    id: 23,
    name: "Noor A.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 10,
  },
  {
    id: 24,
    name: "Oakley S.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: null,
  },
  {
    id: 25,
    name: "Phoenix D.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 19,
  },
  {
    id: 26,
    name: "Quinn R.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 6,
  },
  {
    id: 27,
    name: "River C.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 30,
  },
  {
    id: 28,
    name: "Sage I.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 13,
  },
  {
    id: 29,
    name: "Tatum K.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: null,
  },
  {
    id: 30,
    name: "Uma P.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 23,
  },
  {
    id: 31,
    name: "Vega M.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 1,
  },
  {
    id: 32,
    name: "Wren N.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 17,
  },
  {
    id: 33,
    name: "Xavi H.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 9,
  },
  {
    id: 34,
    name: "Yara E.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: null,
  },
  {
    id: 35,
    name: "Zion C.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 26,
  },
  {
    id: 36,
    name: "Ari S.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 14,
  },
  {
    id: 37,
    name: "Blair O.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 5,
  },
  {
    id: 38,
    name: "Cameron W.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 28,
  },
  {
    id: 39,
    name: "Dakota S.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 12,
  },
  {
    id: 40,
    name: "Eden N.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: null,
  },
  {
    id: 41,
    name: "Frankie R.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 20,
  },
  {
    id: 42,
    name: "Gray A.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 7,
  },
  {
    id: 43,
    name: "Hayden K.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 24,
  },
  {
    id: 44,
    name: "Isa M.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 16,
  },
  {
    id: 45,
    name: "Jules D.",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 3,
  },
];

function ScoutSeshStreak({ streakCount }: { streakCount: number | null }) {
  if (streakCount === null) return null;
  return (
    <div className="bg-green-100 px-2 py-1 rounded-full font-semibold text-center text-green-800 text-xs whitespace-nowrap overflow-hidden">
      {streakCount} Day ScoutSesh Streak 🔥
    </div>
  );
}

export default function AthleteTeamMembersPage() {
  return (
    <main className="flex-grow mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
      <div className="flex flex-col gap-6 mb-8">
        <div className="items-start gap-2 grid grid-cols-1">
          <div className="w-full">
            <div
              className="relative border-2 border-gray-300 p-6 rounded-lg w-full h-full"
              style={{ minHeight: "300px" }}
            >
              <h2 className="mb-6 font-bold text-2xl">
                Riverside Basketball Club
              </h2>
              <div className="top-4 right-4 bg-green-100 px-4 py-2 rounded-full w-fit font-bold text-2xl text-green-800 whitespace-nowrap">
                {teamMembers.length + coaches.length} Team Members 🏅
              </div>
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8">
                {coaches.map((coach) => (
                  <Link key={coach.id} href="#" className="flex items-center">
                    <div className="flex items-center h-full">
                      <Image
                        src={coach.photo}
                        alt="Coach profile"
                        width={80}
                        height={80}
                        className="mr-4 rounded-full cursor-pointer"
                        onClick={() =>
                          console.log(
                            `Clicked on ${coach.name}'s profile picture`
                          )
                        }
                      />
                      <div>
                        <h3 className="font-semibold text-xl cursor-pointer">
                          {coach.name}
                        </h3>
                        <p className="text-gray-600">{coach.role}</p>
                        <div className="flex gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs"
                          >
                            View Profile
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="p-0 w-8 h-8"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="mb-4 font-bold text-2xl">Athletes</h3>
      <div className="gap-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-col items-center gap-2 w-full"
          >
            <Image
              src={member.photo}
              alt={`${member.name}'s profile`}
              width={150}
              height={150}
              className="mb-2 rounded-full w-28 sm:w-36 h-28 sm:h-36"
            />
            <div className="flex flex-col justify-center h-14">
              <p className="mb-1 w-full font-medium text-center truncate">
                {member.name}
              </p>
              <ScoutSeshStreak streakCount={member.streakCount} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

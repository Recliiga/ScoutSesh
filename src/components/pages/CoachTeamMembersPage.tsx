"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Search, UserPlus } from "lucide-react";

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
    name: "Alex Johnson",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 15,
  },
  {
    id: 2,
    name: "Sam Smith",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 7,
  },
  {
    id: 3,
    name: "Taylor Lee",
    photo: `/placeholder-profile-picture.png`,
    streakCount: null,
  },
  {
    id: 4,
    name: "Jordan Patel",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 22,
  },
  {
    id: 5,
    name: "Casey Wong",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 3,
  },
  {
    id: 6,
    name: "Morgan Chen",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 18,
  },
  {
    id: 7,
    name: "Riley Garcia",
    photo: `/placeholder-profile-picture.png`,
    streakCount: null,
  },
  {
    id: 8,
    name: "Quinn Foster",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 9,
  },
  {
    id: 9,
    name: "Avery Thompson",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 12,
  },
  {
    id: 10,
    name: "Jamie Rodriguez",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 5,
  },
  {
    id: 11,
    name: "Blake Martinez",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 25,
  },
  {
    id: 12,
    name: "Charlie Kim",
    photo: `/placeholder-profile-picture.png`,
    streakCount: null,
  },
  {
    id: 13,
    name: "Drew Nguyen",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 18,
  },
  {
    id: 14,
    name: "Emerson Patel",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 8,
  },
  {
    id: 15,
    name: "Finley Ramos",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 2,
  },
  {
    id: 16,
    name: "Gale Ortiz",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 29,
  },
  {
    id: 17,
    name: "Harper Singh",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 11,
  },
  {
    id: 18,
    name: "Indigo Choi",
    photo: `/placeholder-profile-picture.png`,
    streakCount: null,
  },
  {
    id: 19,
    name: "Jude Fernandez",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 21,
  },
  {
    id: 20,
    name: "Kai Tanaka",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 15,
  },
  {
    id: 21,
    name: "London Wei",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 4,
  },
  {
    id: 22,
    name: "Micah Gupta",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 27,
  },
  {
    id: 23,
    name: "Noor Ahmed",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 10,
  },
  {
    id: 24,
    name: "Oakley Sato",
    photo: `/placeholder-profile-picture.png`,
    streakCount: null,
  },
  {
    id: 25,
    name: "Phoenix Diaz",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 19,
  },
  {
    id: 26,
    name: "Quinn Reyes",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 6,
  },
  {
    id: 27,
    name: "River Chung",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 30,
  },
  {
    id: 28,
    name: "Sage Ivanov",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 13,
  },
  {
    id: 29,
    name: "Tatum Kowalski",
    photo: `/placeholder-profile-picture.png`,
    streakCount: null,
  },
  {
    id: 30,
    name: "Uma Patel",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 23,
  },
  {
    id: 31,
    name: "Vega Morales",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 1,
  },
  {
    id: 32,
    name: "Wren Nakamura",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 17,
  },
  {
    id: 33,
    name: "Xavi Herrera",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 9,
  },
  {
    id: 34,
    name: "Yara El-Amin",
    photo: `/placeholder-profile-picture.png`,
    streakCount: null,
  },
  {
    id: 35,
    name: "Zion Carter",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 26,
  },
  {
    id: 36,
    name: "Ari Suzuki",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 14,
  },
  {
    id: 37,
    name: "Blair O'Connor",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 5,
  },
  {
    id: 38,
    name: "Cameron Wu",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 28,
  },
  {
    id: 39,
    name: "Dakota Silva",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 12,
  },
  {
    id: 40,
    name: "Eden Novak",
    photo: `/placeholder-profile-picture.png`,
    streakCount: null,
  },
  {
    id: 41,
    name: "Frankie Rossi",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 20,
  },
  {
    id: 42,
    name: "Gray Andersen",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 7,
  },
  {
    id: 43,
    name: "Hayden Kovalenko",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 24,
  },
  {
    id: 44,
    name: "Isa Mendoza",
    photo: `/placeholder-profile-picture.png`,
    streakCount: 16,
  },
  {
    id: 45,
    name: "Jules Dupont",
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

export default function CoachTeamMembersPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMessageAll = () => {
    console.log("Messaging all members");
  };

  return (
    <main className="flex-grow mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex lg:flex-row flex-col items-start gap-4">
          <div className="flex flex-col flex-1 items-start gap-4 w-full">
            <h2 className="font-bold text-2xl">All Team Members</h2>
            <div className="relative w-full md:w-48">
              <Search className="top-1/2 left-2 absolute w-4 h-4 text-gray-400 transform -translate-y-1/2" />
              <Input
                type="search"
                placeholder="Find Members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
            <Button
              onClick={handleMessageAll}
              variant="outline"
              className="hover:bg-green-700 w-full md:w-48 hover:text-white whitespace-nowrap transition-colors"
            >
              <Send className="mr-2 w-4 h-4" />
              Message All Members
            </Button>
            <Button
              onClick={() => console.log("Adding team members")}
              variant="outline"
              className="hover:bg-green-700 w-full md:w-48 hover:text-white whitespace-nowrap transition-colors"
            >
              <UserPlus className="mr-2 w-4 h-4" />
              Add Team Members
            </Button>
          </div>
          <div className="flex-1 lg:flex-[3] w-full">
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
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mt-8">
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
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-col flex-center items-center gap-2 w-full"
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
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-8 text-xs"
              >
                View Profile
              </Button>
              <Button variant="outline" size="sm" className="p-0 w-8 h-8">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

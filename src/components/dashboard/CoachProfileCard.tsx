import { UserType } from "@/db/models/User";
import { getFullname } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";

export default function CoachProfileCard({ coach }: { coach: UserType }) {
  return (
    <div className="flex items-center">
      <div className="flex sm:flex-row flex-col items-center gap-4 w-full h-full text-center sm:text-left">
        <div className="relative rounded-full w-20 h-20 overflow-hidden">
          <Image
            src={coach.profilePicture}
            alt="Coach profile"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-xl cursor-pointer">
            {getFullname(coach)}
          </h3>
          <p className="text-gray-600">{coach.role}</p>
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              className="px-0 py-0 h-8 text-xs"
            >
              <Link href="#" className="px-4 py-2 w-full h-full">
                View Profile
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="p-0 w-8 h-8">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

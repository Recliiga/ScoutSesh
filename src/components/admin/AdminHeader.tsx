import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { BellIcon, Users } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4">
      <Link href="/admin" className="text-2xl font-bold text-green-600">
        ScoutSesh Admin
      </Link>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <BellIcon className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon">
          <Users className="h-5 w-5" />
          <span className="sr-only">Users</span>
        </Button>
      </div>
    </header>
  );
}

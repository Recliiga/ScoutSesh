import React, { useState } from "react";
import { TabsContent } from "@radix-ui/react-tabs";
import { Input } from "../ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import Link from "next/link";
import { getFullname } from "@/lib/utils";
import StatCard from "./StatCard";
import { OrganizationType } from "@/db/models/Organization";
import { UserType } from "@/db/models/User";

export default function UsersTab({
  organizations,
  users,
}: {
  organizations: OrganizationType[];
  users: UserType[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  function getNumberOfTeamMembers(organization: OrganizationType) {
    return users.filter((user) => user.organization?._id === organization._id)
      .length;
  }

  function isInCurrentMonth(date: Date) {
    const givenDate = new Date(date);
    const currentDate = new Date();
    return (
      givenDate.getMonth() === currentDate.getMonth() &&
      givenDate.getFullYear() === currentDate.getFullYear()
    );
  }

  function isInLastMonth(date: Date) {
    const givenDate = new Date(date);
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);
    return (
      givenDate.getMonth() === currentDate.getMonth() &&
      givenDate.getFullYear() === currentDate.getFullYear()
    );
  }

  const filteredOrganizations = organizations.filter((org) => {
    const matchesName = org.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCoach = getFullname(org.user)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesName || matchesCoach;
  });

  const sortedOrganizations = [...organizations].sort(
    (a, b) => getNumberOfTeamMembers(b) - getNumberOfTeamMembers(a),
  );

  const athletes = users.filter((user) => user.role === "Athlete");
  const coaches = users.filter((user) => user.role !== "Athlete");

  const newUsersLastMonth = users.filter((user) =>
    isInLastMonth(user.createdAt),
  );

  const newUsersThisMonth = users.filter((user) =>
    isInCurrentMonth(user.createdAt),
  );

  return (
    <TabsContent value="users" className="space-y-6" tabIndex={undefined}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-white p-4 sm:p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <StatCard
              title="New Users This Month"
              value={newUsersThisMonth.length}
              change={`${newUsersLastMonth.length > 0 ? ((newUsersThisMonth.length - newUsersLastMonth.length) / newUsersLastMonth.length) * 100 : 100}%`}
            />
            <StatCard
              title="Total Users"
              value={users.length}
              subtext="Lifetime registered users"
            />
            <StatCard
              title="Active Users"
              value={"N/A"}
              subtext={`N/A% of total users`}
            />
            <StatCard
              title="Daily Active Users"
              value={"N/A"}
              subtext={`N/A% of total users`}
            />
          </div>
        </div>
        <div className="grid gap-6 rounded-lg border border-border bg-green-50 p-4 sm:p-6 md:grid-cols-2">
          <StatCard
            title="Athletes"
            value={athletes.length}
            subtext={`${((athletes.length / users.length) * 100).toFixed(2)}% of total users`}
            className="bg-card"
          />
          <StatCard
            title="Coaches"
            value={coaches.length}
            subtext={`${((coaches.length / users.length) * 100).toFixed(2)}% of total users`}
            className="bg-card"
          />
          <StatCard
            title="Number of Organizations"
            value={organizations.length}
            subtext="+5 this month"
            className="bg-card"
          />
          <StatCard
            title="User Retention Rate"
            value={`N/A`}
            subtext="Last 30 days"
            className="bg-card"
          />
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Organizations by Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Rank</TableHead>
                <TableHead>Organization Name</TableHead>
                <TableHead>Head Coach</TableHead>
                <TableHead className="text-right">Team Members</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedOrganizations.slice(0, 10).map((org, index) => (
                <TableRow key={org.name}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{org.name}</TableCell>
                  <TableCell>{getFullname(org.user)}</TableCell>
                  <TableCell className="text-right">
                    {getNumberOfTeamMembers(org)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="mt-6 space-y-4">
        <h2 className="text-2xl font-semibold">Organization Search</h2>
        <div className="flex space-x-4">
          <div className="flex-grow">
            <Input
              placeholder="Search organizations, coaches, or athletes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 text-sm sm:px-4"
            />
          </div>
        </div>
        <Card className="flex flex-col gap-6 p-4 sm:p-6">
          <CardHeader className="p-0">
            <CardTitle>Organization Search Results</CardTitle>
          </CardHeader>
          <CardContent className="min-h-[450px] p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead>Organization Name</TableHead>
                  <TableHead>Head Coach</TableHead>
                  <TableHead className="text-right">Team Members</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrganizations.map((org, index) => (
                  <TableRow key={org.name}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{org.name}</TableCell>
                    <TableCell>{getFullname(org.user)}</TableCell>
                    <TableCell className="text-right">
                      {getNumberOfTeamMembers(org)}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/organization-details/${org._id}`}
                        className="rounded-md border bg-white px-3 py-1.5 text-xs font-medium duration-200 hover:bg-accent-gray-100"
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}

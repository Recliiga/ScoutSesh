"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import StatusBadge from "./StatusBadge";
import ModalContainer from "../ModalContainer";
import { UserType } from "@/db/models/User";
import { getFullname } from "@/lib/utils";
import { OrganizationType } from "@/db/models/Organization";
import ManageTeamMemberModal from "./ManageTeamMemberModal";

// Mock data for the organization
const organizationData = {
  id: "1",
  name: "Elite Sports Academy",
  headCoach: "John Smith",
  members: 250, // Changed from 1250
  location: "New York, NY",
  email: "info@elitesportsacademy.com",
  phone: "+1 (555) 123-4567",
  founded: "2010",
  sports: ["Soccer", "Basketball", "Tennis", "Swimming"],
  teamMembers: [
    {
      id: "1",
      name: "John Smith",
      role: "Head Coach",
      email: "john.s@elitesportsacademy.com",
      status: "Active",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "Assistant Coach",
      email: "sarah.j@elitesportsacademy.com",
      status: "Active",
    },
    {
      id: "3",
      name: "Michael Brown",
      role: "Assistant Coach",
      email: "michael.b@elitesportsacademy.com",
      status: "Active",
    },
    {
      id: "4",
      name: "Emily Davis",
      role: "Athlete",
      email: "emily.d@elitesportsacademy.com",
      status: "Active",
    },
    {
      id: "5",
      name: "David Wilson",
      role: "Athlete",
      email: "david.w@elitesportsacademy.com",
      status: "Active",
    },
    {
      id: "6",
      name: "Jessica Lee",
      role: "Athlete",
      email: "jessica.l@elitesportsacademy.com",
      status: "Active",
    },
    {
      id: "7",
      name: "Robert Taylor",
      role: "Athlete",
      email: "robert.t@elitesportsacademy.com",
      status: "Active",
    },
    {
      id: "8",
      name: "Sophia Martinez",
      role: "Athlete",
      email: "sophia.m@elitesportsacademy.com",
      status: "Active",
    },
  ],
  contentModeration: [
    {
      id: "1",
      title: "Training Session 123",
      filename: "training_session_123.mp4",
      uploadDate: "2024-03-08",
      active: true,
    },
    {
      id: "2",
      title: "Team Celebration",
      filename: "team_celebration.mp4",
      uploadDate: "2024-03-06",
      active: true,
    },
    {
      id: "3",
      title: "Coach's Strategy Talk",
      filename: "strategy_talk_2024.mp4",
      uploadDate: "2024-03-04",
      active: true,
    },
    {
      id: "4",
      title: "Youth League Highlights",
      filename: "youth_league_highlights.mp4",
      uploadDate: "2024-03-01",
      active: true,
    },
  ],
};

export default function OrganizationDetailsPageMain({
  organization,
  teamMembers,
}: {
  organization: OrganizationType;
  teamMembers: UserType[];
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [userToManage, setUserToManage] = useState<UserType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeamMembers = teamMembers.filter(
    (member) =>
      getFullname(member).toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  //const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false) //Removed

  return (
    <>
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="moderation">Content Moderation</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Organization Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Head Coach
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {getFullname(organization.user)}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Founded
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {organization.yearFounded}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Email
                        </dt>
                        <dd className="mt-1 flex items-center text-sm text-gray-900">
                          <Mail className="mr-2 h-4 w-4" />
                          {organization.user.email}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Phone
                        </dt>
                        <dd className="mt-1 flex items-center text-sm text-gray-900">
                          <Phone className="mr-2 h-4 w-4" />
                          N/A
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Location
                        </dt>
                        <dd className="mt-1 flex items-center text-sm text-gray-900">
                          <MapPin className="mr-2 h-4 w-4" />
                          {organization.location}
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Primary Sport
                        </dt>
                        <dd className="mt-1 text-sm capitalize text-gray-900">
                          {organization.primarySport}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Input
                        placeholder="Search team members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="max-h-[500px] overflow-y-auto">
                      <Table>
                        <TableHeader className="sticky top-0 z-10 bg-white">
                          <TableRow>
                            <TableHead className="w-[50px]">Avatar</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredTeamMembers.map((member) => (
                            <TableRow key={member._id}>
                              <TableCell>
                                <Avatar>
                                  <AvatarImage
                                    src={`https://i.pravatar.cc/150?u=${member._id}`}
                                    alt={getFullname(member)}
                                  />
                                  <AvatarFallback>
                                    {member.firstName[0]}
                                    {member.lastName[0]}
                                  </AvatarFallback>
                                </Avatar>
                              </TableCell>
                              <TableCell className="font-medium">
                                {getFullname(member)}
                              </TableCell>
                              <TableCell>{member.role}</TableCell>
                              <TableCell>{member.email}</TableCell>
                              <TableCell>
                                <StatusBadge variant={"success"}>
                                  {"Active"}
                                </StatusBadge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="outline"
                                  onClick={() => setUserToManage(member)}
                                >
                                  Manage
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="moderation">
              <Card>
                <CardHeader>
                  <CardTitle>Video Content Moderation</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Filename</TableHead>
                        <TableHead>Upload Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {organizationData.contentModeration.map((video) => (
                        <TableRow key={video.id}>
                          <TableCell>{video.title}</TableCell>
                          <TableCell>{video.filename}</TableCell>
                          <TableCell>{video.uploadDate}</TableCell>
                          <TableCell>
                            <StatusBadge variant="success">Active</StatusBadge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="text-red-600 hover:bg-red-100 hover:text-red-800"
                                >
                                  Remove
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    Confirm Video Removal: {video.title}
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label
                                      htmlFor="removalReason"
                                      className="text-right"
                                    >
                                      Reason for Removal
                                    </label>
                                    <Textarea
                                      id="removalReason"
                                      placeholder="Please provide a reason for removing this video"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" onClick={() => {}}>
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() => {
                                      // Here you would typically call an API to remove the video
                                      console.log("Video removed");
                                    }}
                                  >
                                    Confirm Removal
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <ModalContainer
        open={!!userToManage}
        closeModal={() => setUserToManage(null)}
      >
        <ManageTeamMemberModal
          userToManage={userToManage}
          closeModal={() => setUserToManage(null)}
        />
      </ModalContainer>
    </>
  );
}

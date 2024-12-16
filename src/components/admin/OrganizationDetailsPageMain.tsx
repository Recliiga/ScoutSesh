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
import StatusBadge from "./StatusBadge";
import ModalContainer from "../ModalContainer";
import { UserType } from "@/db/models/User";
import { getFullname } from "@/lib/utils";
import { OrganizationType } from "@/db/models/Organization";
import ManageTeamMemberModal from "./ManageTeamMemberModal";
import RemoveVideoModal from "./RemoveVideoModal";
import { GroupClassType, VideoType } from "@/db/models/GroupClass";
import { AdminNoteType } from "@/db/models/AdminNotes";

export default function OrganizationDetailsPageMain({
  organizationData,
}: {
  organizationData: {
    organization: OrganizationType;
    teamMembers: UserType[];
    courses: GroupClassType[];
    adminNotes: AdminNoteType[];
  };
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [userToManage, setUserToManage] = useState<UserType | null>(null);
  const [videoToRemove, setVideoToRemove] = useState<VideoType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [teamMembers, setTeamMembers] = useState(organizationData.teamMembers);

  const filteredTeamMembers = teamMembers.filter(
    (member) =>
      getFullname(member).toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const [organizationVideos, setOrganizationVideos] = useState(
    organizationData.courses.flatMap((course) => course.videos),
  );

  function getVideoLiveClassId(videoId: string) {
    return (
      organizationData.courses.find((course) =>
        course.videos.some((vid) => vid._id === videoId),
      )?._id || ""
    );
  }

  function formatVideoDate(date: Date) {
    const videoDate = new Date(date);
    const videoMonth = videoDate.getMonth() + 1;
    const videoDay = videoDate.getDate();
    return `${videoDate.getFullYear()}-${videoMonth < 10 ? "0" : ""}${videoMonth}-${videoDay < 10 ? "0" : ""}${videoDay}`;
  }

  function formatVideoDuration(duration: number) {
    const date = new Date();
    date.setMinutes(0);
    date.setHours(0);
    date.setSeconds(duration);
    const videoMinutes = date.getMinutes();
    const videoSeconds = date.getSeconds();
    const videoHours = date.getHours();

    return `${videoHours}h ${videoMinutes}m ${videoSeconds}s`;
  }

  return (
    <>
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="moderation">Content Moderation</TabsTrigger>
            </TabsList>
            <TabsContent tabIndex={undefined} value="overview">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Organization Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Head Coach
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {getFullname(organizationData.organization.user)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Founded
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {organizationData.organization.yearFounded}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Email
                        </dt>
                        <dd className="mt-1 flex items-center text-sm text-gray-900">
                          <Mail className="mr-2 h-4 w-4" />
                          {organizationData.organization.user.email}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Phone
                        </dt>
                        <dd className="mt-1 flex items-center text-sm text-gray-900">
                          <Phone className="mr-2 h-4 w-4" />
                          N/A
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Location
                        </dt>
                        <dd className="mt-1 flex items-center text-sm text-gray-900">
                          <MapPin className="mr-2 h-4 w-4" />
                          {organizationData.organization.location}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Primary Sport
                        </dt>
                        <dd className="mt-1 text-sm capitalize text-gray-900">
                          {organizationData.organization.primarySport}
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
                                    src={member.profilePicture}
                                    alt={getFullname(member)}
                                    className="object-cover"
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
                                <StatusBadge
                                  variant={
                                    member.status === "Active"
                                      ? "success"
                                      : member.status === "Suspended"
                                        ? "warning"
                                        : member.status === "Banned"
                                          ? "destructive"
                                          : "default"
                                  }
                                >
                                  {member.status}
                                </StatusBadge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="outline"
                                  onClick={() => setUserToManage(member)}
                                >
                                  Manage
                                </Button>
                                <ModalContainer
                                  open={userToManage?._id === member._id}
                                  closeModal={() => setUserToManage(null)}
                                >
                                  <ManageTeamMemberModal
                                    user={member}
                                    adminNote={organizationData.adminNotes.find(
                                      (adminNote) =>
                                        adminNote.user._id === member._id,
                                    )}
                                    open={userToManage?._id === member._id}
                                    closeModal={() => setUserToManage(null)}
                                    setTeamMembers={setTeamMembers}
                                  />
                                </ModalContainer>
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

            <TabsContent tabIndex={undefined} value="moderation">
              <Card>
                <CardHeader>
                  <CardTitle>Video Content Moderation</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead className="whitespace-nowrap">
                          Upload Date
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="pr-6 text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {organizationVideos.map((video) => (
                        <TableRow key={video._id}>
                          <TableCell className="min-w-28">
                            {video.title}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {formatVideoDuration(video.duration)}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {formatVideoDate(video.createdAt)}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            <StatusBadge variant="success">Active</StatusBadge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              className="text-red-600 hover:bg-red-100 hover:text-red-800"
                              onClick={() => setVideoToRemove(video)}
                            >
                              Remove
                            </Button>
                            <ModalContainer
                              open={videoToRemove?._id === video._id}
                              closeModal={() => setVideoToRemove(null)}
                            >
                              <RemoveVideoModal
                                open={videoToRemove?._id === video._id}
                                video={video}
                                liveClassId={getVideoLiveClassId(video._id)}
                                closeModal={() => setVideoToRemove(null)}
                                setOrganizationVideos={setOrganizationVideos}
                              />
                            </ModalContainer>
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
    </>
  );
}

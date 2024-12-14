"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { LineChart } from "recharts";
import StatCard from "@/components/admin/StatCard";
import { OrganizationType } from "@/db/models/Organization";
import { UserType } from "@/db/models/User";
import { getFullname } from "@/lib/utils";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { GroupClassType } from "@/db/models/GroupClass";
import { OrderType } from "@/db/models/Order";
import { Badge } from "@/components/ui/badge";

type MockDataType = {
  users: {
    newUsers: number;
    totalUsers: number;
    activeUsers: number;
    dailyActiveUsers: number;
    retentionRate: number;
    userTypes: {
      name: string;
      value: number;
    }[];
  };
  organizations: {
    name: string;
    headCoach: string;
    members: number;
  }[];
  financials: {
    monthlyCommission: number;
    ytdCommission: number;
    monthlyRevenue: number;
    ytdRevenue: number;
    quarterlyRevenue: number;
    projectedQuarterlyRevenue: number;
    lastSixMonthsRevenue: number;
    projectedNextSixMonthsRevenue: number;
    averageRevenuePerUser: number;
    payingUsers: number;
    revenueBreakdown: {
      source: string;
      amount: number;
      percentage: number;
    }[];
    monthlyData: {
      name: string;
      revenue: number;
    }[];
    quarterlyData: {
      name: string;
      revenue: number;
    }[];
  };
  evaluations: {
    id: number;
    athleteName: string;
    sport: string;
    evaluator: string;
    date: string;
    status: string;
    score: number | null;
  }[];
};

type AdminDataType = {
  users: UserType[];
  organizations: OrganizationType[];
  groupClasses: GroupClassType[];
  classOrders: OrderType[];
};

type SortOptionsType = {
  column: "enrolled" | "revenue" | "score";
  direction: "desc" | "asc" | "evaluations";
};

const initialSortOptions: SortOptionsType = {
  column: "revenue",
  direction: "desc",
};

export default function AdminPageMain({
  mockData,
  adminData,
}: {
  mockData: MockDataType;
  adminData: AdminDataType;
}) {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedChartType, setSelectedChartType] = useState("monthly");
  const [searchQuery, setSearchQuery] = useState("");
  const [classSearchQuery, setClassSearchQuery] = useState("");
  const [evaluationSortOptions, setEvaluationSortOptions] =
    useState<SortOptionsType>({ column: "score", direction: "desc" });
  const [courseSortOptions, setCourseSortOptions] =
    useState<SortOptionsType>(initialSortOptions);
  const [liveClassSortOptions, setLiveClassSortOptions] =
    useState<SortOptionsType>(initialSortOptions);

  function getGroupClassRevenue(groupClass: GroupClassType) {
    return adminData.classOrders
      .filter((order) => order.course._id === groupClass._id)
      .reduce((curr, acc) => curr + acc.price, 0);
  }

  function getNumberOfClassStudents(groupClass: GroupClassType) {
    return adminData.classOrders.filter(
      (order) => order.course._id === groupClass._id,
    ).length;
  }

  const filteredOrganizations = adminData.organizations.filter((org) => {
    const matchesName = org.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCoach = getFullname(org.user)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesName || matchesCoach;
  });

  const filteredGroupClasses = adminData.groupClasses.filter((groupClass) =>
    groupClass.title.toLowerCase().includes(classSearchQuery.toLowerCase()),
  );

  const sortedGroupClasses = filteredGroupClasses
    .filter((groupClass) => groupClass.courseType === "live")
    .sort((a, b) => {
      if (liveClassSortOptions.column === "enrolled") {
        return liveClassSortOptions.direction === "asc"
          ? getNumberOfClassStudents(a) - getNumberOfClassStudents(b)
          : getNumberOfClassStudents(b) - getNumberOfClassStudents(a);
      } else if (liveClassSortOptions.column === "revenue") {
        return liveClassSortOptions.direction === "asc"
          ? getGroupClassRevenue(a) - getGroupClassRevenue(b)
          : getGroupClassRevenue(b) - getGroupClassRevenue(a);
      }
      return 0;
    });

  function handleSort(
    column: "enrolled" | "revenue" | "score",
    table: "courses" | "liveClasses" | "evaluations",
  ) {
    if (table === "courses") {
      if (column === courseSortOptions.column) {
        setCourseSortOptions((prev) => ({
          column,
          direction: prev.direction === "asc" ? "desc" : "asc",
        }));
      } else {
        setCourseSortOptions({ column, direction: "desc" });
      }
    } else if (table === "liveClasses") {
      if (column === liveClassSortOptions.column) {
        setLiveClassSortOptions((prev) => ({
          column,
          direction: prev.direction === "asc" ? "desc" : "asc",
        }));
      } else {
        setLiveClassSortOptions({ column, direction: "desc" });
      }
    } else if (table === "evaluations") {
      if (column === liveClassSortOptions.column) {
        setEvaluationSortOptions((prev) => ({
          column,
          direction: prev.direction === "asc" ? "desc" : "asc",
        }));
      } else {
        setEvaluationSortOptions({ column, direction: "desc" });
      }
    }
  }

  const sortedEvaluations = [...mockData.evaluations].sort((a, b) => {
    if (evaluationSortOptions.column === "score") {
      return evaluationSortOptions.direction === "asc"
        ? Number(a.score) - Number(b.score)
        : Number(b.score) - Number(a.score);
    }
    return 0;
  });

  function getNumberOfTeamMembers(organization: OrganizationType) {
    return adminData.users.filter(
      (user) => user.organization?._id === organization._id,
    ).length;
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

  const sortedOrganizations = [...adminData.organizations].sort(
    (a, b) => getNumberOfTeamMembers(b) - getNumberOfTeamMembers(a),
  );

  const athletes = adminData.users.filter((user) => user.role === "Athlete");
  const coaches = adminData.users.filter((user) => user.role !== "Athlete");

  const newUsersLastMonth = adminData.users.filter((user) =>
    isInLastMonth(user.createdAt),
  );

  const newUsersThisMonth = adminData.users.filter((user) =>
    isInCurrentMonth(user.createdAt),
  );

  const sortedCourses = filteredGroupClasses
    .filter((groupClass) => groupClass.courseType === "video")
    .sort((a, b) => {
      if (courseSortOptions.column === "enrolled") {
        return courseSortOptions.direction === "asc"
          ? getNumberOfClassStudents(a) - getNumberOfClassStudents(b)
          : getNumberOfClassStudents(b) - getNumberOfClassStudents(a);
      } else if (courseSortOptions.column === "revenue") {
        return courseSortOptions.direction === "asc"
          ? getGroupClassRevenue(a) - getGroupClassRevenue(b)
          : getGroupClassRevenue(b) - getGroupClassRevenue(a);
      }
      return 0;
    });

  return (
    <main className="mx-auto w-[90%] max-w-7xl flex-1 space-y-6 py-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users" className="px-2 sm:px-3">
            Users
          </TabsTrigger>
          <TabsTrigger value="financials" className="px-2 sm:px-3">
            Financials
          </TabsTrigger>
          <TabsTrigger value="courses" className="px-2 sm:px-3">
            <span className="hidden sm:inline">Courses & Classes</span>
            <span className="sm:hidden">Classes</span>
          </TabsTrigger>
          <TabsTrigger value="evaluations" className="px-2 sm:px-3">
            <span className="hidden sm:inline">Athlete Evaluations</span>
            <span className="sm:hidden">Athlete</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6" tabIndex={undefined}>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-white p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <StatCard
                  title="New Users This Month"
                  value={newUsersThisMonth.length}
                  change={`${newUsersLastMonth.length > 0 ? ((newUsersThisMonth.length - newUsersLastMonth.length) / newUsersLastMonth.length) * 100 : 100}%`}
                />
                <StatCard
                  title="Total Users"
                  value={adminData.users.length}
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
            <div className="grid gap-6 rounded-lg border border-border bg-green-50 p-6 md:grid-cols-2">
              <StatCard
                title="Athletes"
                value={athletes.length}
                subtext={`${((athletes.length / adminData.users.length) * 100).toFixed(2)}% of total users`}
                className="bg-card"
              />
              <StatCard
                title="Coaches"
                value={coaches.length}
                subtext={`${((coaches.length / adminData.users.length) * 100).toFixed(2)}% of total users`}
                className="bg-card"
              />
              <StatCard
                title="Number of Organizations"
                value={adminData.organizations.length}
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
                  className="w-full"
                />
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Organization Search Results</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[450px] w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">Rank</TableHead>
                        <TableHead>Organization Name</TableHead>
                        <TableHead>Head Coach</TableHead>
                        <TableHead className="text-right">
                          Team Members
                        </TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrganizations.map((org, index) => (
                        <TableRow key={org.name}>
                          <TableCell className="font-medium">
                            {index + 1}
                          </TableCell>
                          <TableCell>{org.name}</TableCell>
                          <TableCell>{getFullname(org.user)}</TableCell>
                          <TableCell className="text-right">
                            {getNumberOfTeamMembers(org)}
                          </TableCell>
                          <TableCell>
                            <Link
                              target="_blank"
                              href={`/dashboard/organization/${org._id}`}
                              className="rounded-md border bg-white px-3 py-1.5 text-xs font-medium duration-200 hover:bg-accent-gray-100"
                            >
                              View
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent
          tabIndex={undefined}
          value="financials"
          className="space-y-4"
        >
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Financial Overview</CardTitle>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <p>Detailed financial metrics and reports for ScoutSesh.</p>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card className="bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Monthly Commission Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-700">
                  ${mockData.financials.monthlyCommission.toLocaleString()}
                </div>
                <p className="text-sm text-green-600">
                  20% commission on monthly platform revenue
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  +18% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Year-to-Date Commission Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-700">
                  ${mockData.financials.ytdCommission.toLocaleString()}
                </div>
                <p className="text-sm text-green-600">
                  20% commission on YTD platform revenue
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  +22% from same period last year
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <StatCard
              title="Monthly Platform Revenue"
              value={`$${mockData.financials.monthlyRevenue.toLocaleString()}`}
              change="+15% from last month"
            />
            <StatCard
              title="Year-to-Date Platform Revenue"
              value={`$${mockData.financials.ytdRevenue.toLocaleString()}`}
              change="+22% from same period last year"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Quarterly Platform Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${mockData.financials.quarterlyRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Q2 2024</p>
                <div className="mt-2 text-sm font-medium text-green-600">
                  Projected: $
                  {mockData.financials.projectedQuarterlyRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Q3 2024</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Last 6 Months Total Platform Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${mockData.financials.lastSixMonthsRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Jul 2023 - Dec 2023
                </p>
                <div className="mt-2 text-sm font-medium text-green-600">
                  Projected: $
                  {mockData.financials.projectedNextSixMonthsRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Next 6 months (Jan 2024 - Jun 2024)
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <StatCard
              title="Average Revenue per User"
              value={`$${mockData.financials.averageRevenuePerUser.toFixed(2)}`}
              change="+5% from last month"
            />
            <StatCard
              title="Paying Users"
              value={mockData.financials.payingUsers.toLocaleString()}
              change="+10% from last month"
              subtext={`${((mockData.financials.payingUsers / mockData.users.totalUsers) * 100).toFixed(2)}% of total users`}
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Revenue Source</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockData.financials.revenueBreakdown.map((item) => (
                    <TableRow key={item.source}>
                      <TableCell>{item.source}</TableCell>
                      <TableCell>${item.amount.toLocaleString()}</TableCell>
                      <TableCell>{item.percentage.toFixed(2)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Revenue Chart</CardTitle>
              <Select
                value={selectedChartType}
                onValueChange={setSelectedChartType}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select chart type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Revenue</SelectItem>
                  <SelectItem value="quarterly">Quarterly Revenue</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <LineChart
                  data={
                    selectedChartType === "monthly"
                      ? mockData.financials.monthlyData
                      : mockData.financials.quarterlyData
                  }
                  // index="name"
                  // categories={["revenue"]}
                  // colors={["blue"]}
                  // valueFormatter={(value) => `$${value.toLocaleString()}`}
                  // yAxisWidth={80}
                  className="h-[400px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent tabIndex={undefined} value="courses" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Courses & Classes</h2>
            <Input
              placeholder="Search courses and classes..."
              value={classSearchQuery}
              onChange={(e) => setClassSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[450px] w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Name</TableHead>
                        <TableHead className="w-[250px]">
                          Organization
                        </TableHead>
                        <TableHead className="w-[150px]">Instructor</TableHead>
                        <TableHead
                          className="w-[100px] cursor-pointer text-right"
                          onClick={() => handleSort("enrolled", "courses")}
                        >
                          <div className="flex items-center justify-end">
                            Enrolled
                            {courseSortOptions.column === "enrolled" ? (
                              courseSortOptions.direction === "asc" ? (
                                <ChevronUp className="ml-1" />
                              ) : (
                                <ChevronDown className="ml-1" />
                              )
                            ) : (
                              <ChevronsUpDown className="ml-1" />
                            )}
                          </div>
                        </TableHead>
                        <TableHead
                          className="w-[150px] cursor-pointer text-right"
                          onClick={() => handleSort("revenue", "courses")}
                        >
                          <div className="flex items-center justify-end">
                            Revenue
                            {courseSortOptions.column === "revenue" ? (
                              courseSortOptions.direction === "asc" ? (
                                <ChevronUp className="ml-1" />
                              ) : (
                                <ChevronDown className="ml-1" />
                              )
                            ) : (
                              <ChevronsUpDown className="ml-1" />
                            )}
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedCourses.map((course) => (
                        <TableRow key={course._id}>
                          <TableCell className="font-medium">
                            {course.title}
                          </TableCell>
                          <TableCell>
                            {course.coaches[0].organization?.name}
                          </TableCell>
                          <TableCell>
                            {getFullname(course.coaches[0])}
                          </TableCell>
                          <TableCell className="text-right">
                            {getNumberOfClassStudents(course)}
                          </TableCell>
                          <TableCell className="text-right">
                            ${getGroupClassRevenue(course)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Live Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[450px] w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Name</TableHead>
                        <TableHead className="w-[250px]">
                          Organization
                        </TableHead>
                        <TableHead className="w-[200px]">Instructor</TableHead>
                        <TableHead
                          className="w-[150px] cursor-pointer text-right"
                          onClick={() => handleSort("enrolled", "liveClasses")}
                        >
                          <div className="flex items-center justify-end">
                            Enrolled
                            {liveClassSortOptions.column === "enrolled" ? (
                              liveClassSortOptions.direction === "asc" ? (
                                <ChevronUp className="ml-1" />
                              ) : (
                                <ChevronDown className="ml-1" />
                              )
                            ) : (
                              <ChevronsUpDown className="ml-1" />
                            )}
                          </div>
                        </TableHead>
                        <TableHead
                          className="w-[150px] cursor-pointer text-right"
                          onClick={() => handleSort("revenue", "liveClasses")}
                        >
                          <div className="flex items-center justify-end">
                            Revenue
                            {liveClassSortOptions.column === "revenue" ? (
                              liveClassSortOptions.direction === "asc" ? (
                                <ChevronUp className="ml-1" />
                              ) : (
                                <ChevronDown className="ml-1" />
                              )
                            ) : (
                              <ChevronsUpDown className="ml-1" />
                            )}
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedGroupClasses.map((liveClass) => (
                        <TableRow key={liveClass._id}>
                          <TableCell className="font-medium">
                            {liveClass.title}
                          </TableCell>
                          <TableCell>
                            {liveClass.coaches[0].organization?.name}
                          </TableCell>
                          <TableCell>
                            {getFullname(liveClass.coaches[0])}
                          </TableCell>
                          <TableCell className="text-right">
                            {getNumberOfClassStudents(liveClass)}/
                            {liveClass.totalSpots}
                          </TableCell>
                          <TableCell className="text-right">
                            ${getGroupClassRevenue(liveClass)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent
          tabIndex={undefined}
          value="evaluations"
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Athlete Evaluations</h2>
            <Input
              placeholder="Search evaluations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Individual Evaluations</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[450px] w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Athlete</TableHead>
                        <TableHead className="w-[150px]">Sport</TableHead>
                        <TableHead className="w-[150px]">Evaluator</TableHead>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead
                          className="w-[100px] cursor-pointer text-right"
                          onClick={() => handleSort("score", "evaluations")}
                        >
                          <div className="flex items-center justify-end">
                            Score
                            {evaluationSortOptions.column === "score" ? (
                              evaluationSortOptions.direction === "asc" ? (
                                <ChevronUp className="ml-1" />
                              ) : (
                                <ChevronDown className="ml-1" />
                              )
                            ) : (
                              <ChevronsUpDown className="ml-1" />
                            )}
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedEvaluations.map((evaluation) => (
                        <TableRow key={evaluation.id}>
                          <TableCell className="font-medium">
                            {evaluation.athleteName}
                          </TableCell>
                          <TableCell>{evaluation.sport}</TableCell>
                          <TableCell>{evaluation.evaluator}</TableCell>
                          <TableCell>{evaluation.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                evaluation.status === "Completed"
                                  ? "outline"
                                  : evaluation.status === "In Progress"
                                    ? "warning"
                                    : evaluation.status === "Pending"
                                      ? "secondary"
                                      : "default"
                              }
                            >
                              {evaluation.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {evaluation.score !== null
                              ? evaluation.score
                              : "N/A"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

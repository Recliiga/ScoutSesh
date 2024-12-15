import React from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminPageMain from "@/components/admin/AdminPageMain";
import { fetchAdminData } from "@/services/adminServices";

const mockData = {
  users: {
    newUsers: 320,
    totalUsers: 3200,
    activeUsers: 2840,
    dailyActiveUsers: 1600,
    retentionRate: 78,
    userTypes: [
      { name: "Athletes", value: 2560 },
      { name: "Coaches", value: 640 },
    ],
  },
  organizations: [
    { name: "Elite Sports Academy", headCoach: "John Smith", members: 1250 },
    { name: "Champions United", headCoach: "Sarah Johnson", members: 980 },
    { name: "Victory Athletics", headCoach: "Michael Brown", members: 875 },
    {
      name: "Peak Performance Institute",
      headCoach: "Emily Davis",
      members: 820,
    },
    {
      name: "Olympian Training Center",
      headCoach: "David Wilson",
      members: 790,
    },
    { name: "Ace Sports Club", headCoach: "Jessica Lee", members: 735 },
    {
      name: "Titans Athletic Association",
      headCoach: "Robert Taylor",
      members: 680,
    },
    { name: "Powerhouse Gym Network", headCoach: "Amanda White", members: 625 },
    {
      name: "Velocity Sports Complex",
      headCoach: "Christopher Martin",
      members: 590,
    },
    {
      name: "Apex Fitness Alliance",
      headCoach: "Laura Thompson",
      members: 560,
    },
  ],
  financials: {
    monthlyCommission: 15000,
    ytdCommission: 120000,
    monthlyRevenue: 75000,
    ytdRevenue: 600000,
    quarterlyRevenue: 180000,
    projectedQuarterlyRevenue: 200000,
    lastSixMonthsRevenue: 360000,
    projectedNextSixMonthsRevenue: 400000,
    averageRevenuePerUser: 187.5,
    payingUsers: 2000,
    revenueBreakdown: [
      { source: "Live Classes", amount: 250000, percentage: 41.67 },
      { source: "Video Courses", amount: 200000, percentage: 33.33 },
      { source: "Athlete Evaluations", amount: 150000, percentage: 25 },
    ],
    monthlyData: [
      { name: "January", revenue: 60000 },
      { name: "February", revenue: 65000 },
      { name: "March", revenue: 70000 },
      { name: "April", revenue: 75000 },
      { name: "May", revenue: 80000 },
      { name: "June", revenue: 85000 },
    ],
    quarterlyData: [
      { name: "Q1 2024", revenue: 195000 },
      { name: "Q2 2024", revenue: 180000 },
    ],
  },
  evaluations: [
    {
      id: 1,
      athleteName: "John Smith",
      sport: "Baseball",
      evaluator: "Mike Johnson",
      date: "2024-03-10",
      status: "Completed",
      score: 85,
    },
    {
      id: 2,
      athleteName: "Emily Brown",
      sport: "Track",
      evaluator: "Sarah Thompson",
      date: "2024-03-11",
      status: "In progress",
      score: null,
    },
    {
      id: 3,
      athleteName: "Michael Chen",
      sport: "Basketball",
      evaluator: "Chris Davis",
      date: "2024-03-12",
      status: "In Progress",
      score: null,
    },
    {
      id: 4,
      athleteName: "Sofia Garcia",
      sport: "Soccer",
      evaluator: "Emma Rodriguez",
      date: "2024-03-13",
      status: "Scheduled",
      score: null,
    },
    {
      id: 5,
      athleteName: "Alex Johnson",
      sport: "Football",
      evaluator: "David Lee",
      date: "2024-03-14",
      status: "Completed",
      score: 92,
    },
  ],
};

export default async function AdminPage() {
  const { adminData, error } = await fetchAdminData();
  if (error !== null) throw new Error(error);

  return (
    <div className="flex flex-1 flex-col">
      <AdminHeader />
      <AdminPageMain mockData={mockData} adminData={adminData} />
    </div>
  );
}

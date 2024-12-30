import React, { useState } from "react";
import { TabsContent } from "@radix-ui/react-tabs";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import StatCard from "./StatCard";
import Select from "../Select";

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

export default function FinancialsTab() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedChartType, setSelectedChartType] = useState("monthly");

  return (
    <TabsContent tabIndex={undefined} value="financials" className="space-y-4">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Financial Overview</CardTitle>
          <Select
            value={selectedYear}
            onChange={setSelectedYear}
            placeholder="Select year"
            containerClassName="w-[180px]"
          >
            <Select.Content>
              <Select.Option value="2025">2025</Select.Option>
              <Select.Option value="2024">2024</Select.Option>
              <Select.Option value="2023">2023</Select.Option>
            </Select.Content>
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
            <p className="text-xs text-muted-foreground">Jul 2023 - Dec 2023</p>
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
            onChange={setSelectedChartType}
            containerClassName="w-[180px]"
            placeholder="Select chart type"
          >
            <Select.Content>
              <Select.Option value="monthly">Monthly Revenue</Select.Option>
              <Select.Option value="quarterly">Quarterly Revenue</Select.Option>
            </Select.Content>
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
              height={400}
              // className="h-[400px]"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function EarningStatistics({
  monthlyEarnings,
}: {
  monthlyEarnings: {
    month: string;
    amount: number;
  }[];
}) {
  const maxEarning = Math.max(...monthlyEarnings.map((e) => e.amount));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings Statistics</CardTitle>
        <CardDescription>Your earnings over the past 12 months</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
        <div className="w-full">
          {monthlyEarnings.map((earning, index) => (
            <div key={index} className="mb-2 flex items-center">
              <span className="w-8 text-sm">{earning.month}</span>
              {earning.amount > 0 && (
                <div
                  className="ml-2 h-5 rounded bg-green-500"
                  style={{
                    width: `${(earning.amount / maxEarning) * 100}%`,
                  }}
                />
              )}
              <span className="ml-2 text-sm">${earning.amount}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

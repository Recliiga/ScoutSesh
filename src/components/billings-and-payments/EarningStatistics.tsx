import React from "react";
import { getLast12Months } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TransactionType } from "@/app/dashboard/billings-and-payments/page";

function generateMonthlyEarnings(transactions: TransactionType[]) {
  const last12Months = getLast12Months();
  const monthlyEarnings = last12Months.map((month) => ({
    month: month.toLocaleString("default", { month: "short" }),
    amount: 0,
  }));

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.purchaseDate);
    const transactionYear = transactionDate.getFullYear();

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const monthIndex =
      transactionYear === currentYear
        ? currentMonth - transactionDate.getMonth()
        : 11 - transactionDate.getMonth();
    if (monthIndex >= 0 && monthIndex < 12) {
      monthlyEarnings[monthIndex].amount += transaction.price;
    }
  });
  return monthlyEarnings.reverse();
}

export default function EarningStatistics({
  transactions,
}: {
  transactions: TransactionType[];
}) {
  const monthlyEarnings = generateMonthlyEarnings(transactions);

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

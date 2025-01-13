"use client";

import React from "react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "../ui/card";
import Select from "../Select";
import { Button } from "../ui/button";
import { calculateMonthlyEarnings, getLast12Months } from "@/lib/utils";
import { format } from "date-fns";
import { TransactionType } from "@/app/dashboard/billings-and-payments/page";

export default function MonthlyStatements({
  transactions,
}: {
  transactions: TransactionType[];
}) {
  const [selectedMonth, setSelectedMonth] = React.useState(
    format(new Date().toDateString(), "LLLL yyyy"),
  );

  const last12Months = [...getLast12Months()].reverse();

  const currentSelectedMonth = new Date(selectedMonth).getMonth();
  const currentSelectedYear = new Date(selectedMonth).getFullYear();
  const currentMonthEarnings = calculateMonthlyEarnings(
    transactions,
    currentSelectedMonth,
    currentSelectedYear,
  );

  const totalTransactionsOnSelectedMonth = transactions.filter(
    (transaction) => {
      const transactionDate = new Date(transaction.purchaseDate);
      return (
        transactionDate.getMonth() === new Date(selectedMonth).getMonth() &&
        transactionDate.getFullYear() === new Date(selectedMonth).getFullYear()
      );
    },
  ).length;

  const platFormFees = (20 / 100) * currentMonthEarnings;
  const netEarnings = currentMonthEarnings - platFormFees;

  return (
    <Card className="mt-24">
      <CardHeader>
        <CardTitle>Monthly Statements</CardTitle>
        <CardDescription>
          View and download your monthly statements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex space-x-2">
          <Select
            value={selectedMonth}
            onChange={setSelectedMonth}
            containerClassName="w-[180px]"
            placeholder="Select month"
          >
            <Select.Content>
              {last12Months.map((month) => (
                <Select.Option
                  key={month.getMonth()}
                  value={format(month, "LLLL yyyy")}
                >
                  {format(month, "LLLL yyyy")}
                </Select.Option>
              ))}
            </Select.Content>
          </Select>
          <Button>Download Statement</Button>
        </div>
        <div className="rounded border p-4">
          <h3 className="mb-2 font-semibold">
            Statement Summary for {selectedMonth}
          </h3>
          <p>Total Earnings: ${currentMonthEarnings.toFixed(2)}</p>
          <p>Number of Transactions: {totalTransactionsOnSelectedMonth}</p>
          <p>Platform Fees: ${platFormFees.toFixed(2)}</p>
          <p>Net Earnings: ${netEarnings.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
}

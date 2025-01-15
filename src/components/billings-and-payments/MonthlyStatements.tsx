"use client";

import React, { useMemo } from "react";
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

  const last12Months = getLast12Months();

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

  const platFormFees = useMemo(() => {
    return transactions.reduce(
      (prev, curr) =>
        prev + ((curr.platformPercentage || 20) * curr.price) / 100,
      0,
    );
  }, [transactions]);

  const netEarnings = useMemo(() => {
    return currentMonthEarnings - platFormFees;
  }, [currentMonthEarnings, platFormFees]);

  return (
    <Card className="mt-24">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle>Monthly Statements</CardTitle>
        <CardDescription>
          View and download your monthly statements
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row">
          <Select
            value={selectedMonth}
            onChange={setSelectedMonth}
            containerClassName="min-w-[180px]"
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
        <div className="rounded border p-3 text-sm sm:p-4 sm:text-base">
          <h3 className="mb-2 font-semibold">
            Statement Summary for {selectedMonth}
          </h3>
          <p>
            Total Earnings:{" "}
            <span className="font-semibold">
              ${currentMonthEarnings.toFixed(2)}
            </span>
          </p>

          <p>
            Number of Transactions:{" "}
            <span className="font-semibold">
              {totalTransactionsOnSelectedMonth}
            </span>
          </p>
          <p>
            Platform Fees:{" "}
            <span className="font-semibold">${platFormFees.toFixed(2)}</span>
          </p>
          <p>
            Net Earnings:{" "}
            <span className="font-semibold">${netEarnings.toFixed(2)}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

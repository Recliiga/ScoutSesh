"use client";

import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart, DollarSign, PiggyBank } from "lucide-react";
import { TransactionType } from "@/app/dashboard/billings-and-payments/page";
import { calculateMonthlyEarnings } from "@/lib/utils";
import toast from "react-hot-toast";

function calculateYearlyEarnings(
  transactions: TransactionType[],
  year: number,
) {
  return transactions
    .filter(
      (transaction) =>
        new Date(transaction.purchaseDate).getFullYear() === year,
    )
    .reduce((total, transaction) => total + transaction.price, 0);
}

function calculateThisYearsEarnings(transactions: TransactionType[]) {
  const currentYear = new Date().getFullYear();
  return calculateYearlyEarnings(transactions, currentYear);
}

function calculateLastYearsEarnings(transactions: TransactionType[]) {
  const lastYear = new Date().getFullYear() - 1;
  return calculateYearlyEarnings(transactions, lastYear);
}

function calculateThisMonthsEarnings(transactions: TransactionType[]) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  return calculateMonthlyEarnings(transactions, currentMonth, currentYear);
}

function calculateLastMonthsEarnings(transactions: TransactionType[]) {
  const currentMonth = new Date().getMonth();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const currentYear = new Date().getFullYear();
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  return calculateMonthlyEarnings(transactions, lastMonth, lastMonthYear);
}

export default function EarningsSummary({
  transactions,
  accountBalance,
  pendingBalance,
  accountBalanceError,
}: {
  transactions: TransactionType[];
  accountBalance: number;
  pendingBalance: number;
  accountBalanceError: string | null;
}) {
  useEffect(() => {
    if (accountBalanceError) toast.error(accountBalanceError);
  }, [accountBalanceError]);

  const thisMonthsEarnings = calculateThisMonthsEarnings(transactions);
  const lastMonthsEarnings = calculateLastMonthsEarnings(transactions);

  const monthlyPercentageIncrease =
    lastMonthsEarnings > 0
      ? ((thisMonthsEarnings - lastMonthsEarnings) / lastMonthsEarnings) * 100
      : 100;

  const thisYearsEarnings = calculateThisYearsEarnings(transactions);
  const lastYearsEarnings = calculateLastYearsEarnings(transactions);

  const yearlyPercentageIncrease =
    lastYearsEarnings > 0
      ? ((thisYearsEarnings - lastYearsEarnings) / lastYearsEarnings) * 100
      : 100;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2 sm:p-6">
          <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
          <div className="text-2xl font-bold">${accountBalance.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">+2.5% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2 sm:p-6">
          <CardTitle className="text-sm font-medium">Pending Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
          <div className="text-2xl font-bold">${pendingBalance.toFixed(2)}</div>
          {/* <p className="text-xs text-muted-foreground">+2.5% from last month</p> */}
          <p className="text-xs text-muted-foreground">
            Pending transactions to be processed
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2 sm:p-6">
          <CardTitle className="text-sm font-medium">
            This Month&apos;s Earnings
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
          <div className="text-2xl font-bold">
            ${thisMonthsEarnings.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {monthlyPercentageIncrease}% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2 sm:p-6">
          <CardTitle className="text-sm font-medium">Yearly Earnings</CardTitle>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
          <div className="text-2xl font-bold">
            ${thisYearsEarnings.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {yearlyPercentageIncrease}% from last year
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

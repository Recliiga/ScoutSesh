import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart, DollarSign, PiggyBank } from "lucide-react";
import { TransactionType } from "@/app/dashboard/billings-and-payments/page";
import { calculateMonthlyEarnings } from "@/lib/utils";

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

function calculateUserBalance(transactions: TransactionType[]) {
  return transactions.reduce(
    (total, transaction) =>
      total +
      (transaction.price * (100 - (transaction.platformPercentage || 20))) /
        100,
    0,
  );
}

export default function EarningsSummary({
  allOrders,
}: {
  allOrders: TransactionType[];
}) {
  const thisMonthsEarnings = calculateThisMonthsEarnings(allOrders);
  const lastMonthsEarnings = calculateLastMonthsEarnings(allOrders);

  const monthlyPercentageIncrease =
    lastMonthsEarnings > 0
      ? ((thisMonthsEarnings - lastMonthsEarnings) / lastMonthsEarnings) * 100
      : 100;

  const thisYearsEarnings = calculateThisYearsEarnings(allOrders);
  const lastYearsEarnings = calculateLastYearsEarnings(allOrders);

  const yearlyPercentageIncrease =
    lastYearsEarnings > 0
      ? ((thisYearsEarnings - lastYearsEarnings) / lastYearsEarnings) * 100
      : 100;

  const userAccountBalance = calculateUserBalance(allOrders);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2 sm:p-6">
          <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
          <div className="text-2xl font-bold">
            ${userAccountBalance.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">+2.5% from last month</p>
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

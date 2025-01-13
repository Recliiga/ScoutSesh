import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, DollarSign, PiggyBank } from "lucide-react";
import MonthlyStatements from "@/components/billings-and-payments/MonthlyStatements";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchCoachEvaluationOrders } from "@/services/AthleteEvaluationServices";
import { fetchCoachGroupClassOrders } from "@/services/groupClassOrderServices";
import toast from "react-hot-toast";
import { calculateMonthlyEarnings, getLast12Months } from "@/lib/utils";

export type TransactionType = {
  _id: string;
  price: number;
  purchaseDate: Date;
};

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
  const currentMonth = new Date().getFullYear();
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

export default async function BillingsAndPaymentsPage() {
  const user = await getSessionFromHeaders();

  const { orders, error } = await fetchCoachEvaluationOrders(user._id);
  if (error !== null) toast.error("An error occured fetching data");

  const { coachGroupClassOrders, error: groupClassOrderError } =
    await fetchCoachGroupClassOrders(user._id);
  if (groupClassOrderError !== null)
    toast.error("An error occured fetching data");

  const evaluationOrders = orders || [];
  const groupClassOrders = coachGroupClassOrders || [];

  const allOrders = [
    ...evaluationOrders.map((order) => ({
      _id: order._id,
      price: order.totalPrice,
      purchaseDate: order.createdAt,
    })),
    ...groupClassOrders.map((order) => ({
      _id: order._id,
      price: order.price,
      purchaseDate: order.createdAt,
    })),
  ];

  const monthlyEarnings = generateMonthlyEarnings(allOrders);

  const maxEarning = Math.max(...monthlyEarnings.map((e) => e.amount));

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

  return (
    <main className="mx-auto w-[90%] max-w-7xl flex-1 space-y-8 py-4">
      <h1 className="text-3xl font-bold">Billing & Payments</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Account Balance
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${user.accountBalance.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              This Month&apos;s Earnings
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${thisMonthsEarnings.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {monthlyPercentageIncrease}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Yearly Earnings
            </CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${thisYearsEarnings.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {yearlyPercentageIncrease}% from last year
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Earnings Statistics</CardTitle>
          <CardDescription>
            Your earnings over the past 12 months
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-16 pl-2">
          <div className="h-[270px] w-full">
            {monthlyEarnings.map((earning, index) => (
              <div key={index} className="mb-2 flex items-center">
                <span className="w-8 text-sm">{earning.month}</span>
                <div
                  className="h-5 rounded bg-green-500"
                  style={{
                    width: `${(earning.amount / maxEarning) * 100}%`,
                  }}
                />
                <span className="ml-2 text-sm">${earning.amount}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <MonthlyStatements transactions={allOrders} />

      <Card>
        <CardHeader>
          <CardTitle>Bank Account Information</CardTitle>
          <CardDescription>
            Add or update your bank account details for withdrawals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accountName">Account Holder Name</Label>
              <Input id="accountName" placeholder="Enter account holder name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                placeholder="Enter account number"
                type="password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="routingNumber">Routing Number</Label>
              <Input id="routingNumber" placeholder="Enter routing number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input id="bankName" placeholder="Enter bank name" />
            </div>
            <Button className="w-full border border-input bg-background text-foreground transition-colors hover:bg-green-600 hover:text-white">
              Save Bank Information
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Withdraw Funds</CardTitle>
          <CardDescription>
            Transfer your earnings to your bank account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount to Withdraw</Label>
              <Input id="amount" placeholder="Enter amount" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bank">Select Bank Account</Label>
              {/* <select
                id="bank"
                className="rounded-md border p-2 text-sm"
              >
                <option value={"bank0"} hidden>
                  Select Bank Account
                </option>
                <option value={"bank1"}>
                  Bank of America - Checking ****1234
                </option>
                <option value={"bank2"}>Chase - Savings ****5678</option>
                <option value={"bank3"}>Wells Fargo - Checking ****9012</option>
              </select> */}

              <Select>
                <SelectTrigger id="bank2">
                  <SelectValue placeholder="Select bank account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank1">
                    Bank of America - Checking ****1234
                  </SelectItem>
                  <SelectItem value="bank2">
                    Chase - Savings ****5678
                  </SelectItem>
                  <SelectItem value="bank3">
                    Wells Fargo - Checking ****9012
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full border border-input bg-background text-foreground transition-colors hover:bg-green-600 hover:text-white">
              Withdraw Funds
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

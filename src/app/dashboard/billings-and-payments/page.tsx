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

export default function BillingsAndPaymentsPage() {
  const monthlyEarnings = [
    { month: "Jan", amount: 5200 },
    { month: "Feb", amount: 4800 },
    { month: "Mar", amount: 6100 },
    { month: "Apr", amount: 5500 },
    { month: "May", amount: 6800 },
    { month: "Jun", amount: 7200 },
    { month: "Jul", amount: 6900 },
    { month: "Aug", amount: 7500 },
    { month: "Sep", amount: 8100 },
    { month: "Oct", amount: 7800 },
    { month: "Nov", amount: 8500 },
    { month: "Dec", amount: 9200 },
  ];

  const maxEarning = Math.max(...monthlyEarnings.map((e) => e.amount));

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
            <div className="text-2xl font-bold">$12,450.80</div>
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
            <div className="text-2xl font-bold">$7,800.00</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
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
            <div className="text-2xl font-bold">$84,600.00</div>
            <p className="text-xs text-muted-foreground">+18% from last year</p>
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

      <MonthlyStatements />

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
              <Select>
                <SelectTrigger id="bank">
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

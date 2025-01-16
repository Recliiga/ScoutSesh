"use client";

import React, { useMemo, useState } from "react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "../ui/card";
import Select from "../Select";
import { Button } from "../ui/button";
import {
  calculateMonthlyEarnings,
  calculateMonthlyPlatformFees,
  getFullname,
  getLast12Months,
} from "@/lib/utils";
import { format } from "date-fns";
import { TransactionType } from "@/app/dashboard/billings-and-payments/page";
import AccountStatement from "./AccountStatement";
import { UserType } from "@/db/models/User";
import { fetchAllTransactions } from "@/actions/userActions";
import LoadingIndicator from "../LoadingIndicator";
import toast from "react-hot-toast";

export default function MonthlyStatements({
  transactions,
  user,
}: {
  transactions: TransactionType[];
  user: UserType;
}) {
  const [selectedMonth, setSelectedMonth] = React.useState(
    format(new Date().toDateString(), "LLLL yyyy"),
  );
  const [loading, setLoading] = useState(false);
  const [statement, setStatement] = useState<TransactionType[] | null>(null);

  const calculateOpeningBalance = (
    transactions: TransactionType[],
    selectedMonth: string,
  ) => {
    const selectedDate = new Date(selectedMonth);

    const earningsBeforeSelectedMonth = transactions.reduce(
      (total, transaction) => {
        const transactionDate = new Date(transaction.purchaseDate);
        if (transactionDate < selectedDate) {
          return total + transaction.price;
        }
        return total;
      },
      0,
    );

    const feesBeforeSelectedMonth = transactions.reduce(
      (total, transaction) => {
        const transactionDate = new Date(transaction.purchaseDate);
        if (transactionDate < selectedDate) {
          return (
            total +
            ((transaction.platformPercentage || 20) * transaction.price) / 100
          );
        }
        return total;
      },
      0,
    );

    return earningsBeforeSelectedMonth - feesBeforeSelectedMonth;
  };

  const openingBalance = useMemo(
    () => calculateOpeningBalance(transactions, selectedMonth),
    [transactions, selectedMonth],
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

  const platFormFees = calculateMonthlyPlatformFees(
    transactions,
    currentSelectedMonth,
    currentSelectedYear,
  );

  const netEarnings = useMemo(() => {
    return currentMonthEarnings - platFormFees;
  }, [currentMonthEarnings, platFormFees]);

  async function handleGenerateStatement() {
    setLoading(true);
    const startDate = new Date(currentSelectedYear, currentSelectedMonth, 1);
    const endDate = new Date(currentSelectedYear, currentSelectedMonth + 1, 0);

    const { transactions: allTransactions, error } = await fetchAllTransactions(
      user._id,
    );
    if (error !== null) {
      toast.error("Failed to fetch transactions. Please try again later.");
    } else {
      const selectedMonthTransactions = allTransactions.filter(
        (transaction) => {
          const transactionDate = new Date(transaction.purchaseDate);
          return transactionDate >= startDate && transactionDate <= endDate;
        },
      );

      setStatement(selectedMonthTransactions);
    }
    setLoading(false);
  }

  return (
    <>
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
              onChange={(value) => {
                setSelectedMonth(value);
                setStatement(null);
              }}
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
            <Button disabled={loading} onClick={handleGenerateStatement}>
              {loading ? (
                <>
                  <LoadingIndicator />
                  Generating...
                </>
              ) : (
                "Generate Statement"
              )}
            </Button>
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
      {statement && (
        <AccountStatement
          userName={getFullname(user)}
          organizationName={user.organization!.name}
          date={format(new Date(selectedMonth), "MMMM yyyy")}
          statementTransactions={statement}
          openingBalance={openingBalance}
        />
      )}
    </>
  );
}

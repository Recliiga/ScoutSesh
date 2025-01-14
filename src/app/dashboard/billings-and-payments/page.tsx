import React from "react";
import MonthlyStatements from "@/components/billings-and-payments/MonthlyStatements";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchCoachEvaluationOrders } from "@/services/AthleteEvaluationServices";
import { fetchCoachGroupClassOrders } from "@/services/groupClassOrderServices";
import toast from "react-hot-toast";
import { getLast12Months } from "@/lib/utils";
import AccountInformationForm from "@/components/billings-and-payments/AccountInformationForm";
import FundsWithdrawalForm from "@/components/billings-and-payments/FundsWithdrawalForm";
import EarningStatistics from "@/components/billings-and-payments/EarningStatistics";
import EarningsSummary from "@/components/billings-and-payments/EarningsSummary";

export type TransactionType = {
  _id: string;
  price: number;
  purchaseDate: Date;
  platformPercentage: number;
  referrerPercentage?: number;
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

  const allOrders: TransactionType[] = [
    ...evaluationOrders.map((order) => ({
      _id: order._id,
      price: order.totalPrice,
      purchaseDate: order.createdAt,
      platformPercentage: order.platformPercentage,
      referrerPercentage: order.referrerPercentage,
    })),
    ...groupClassOrders.map((order) => ({
      _id: order._id,
      price: order.price,
      purchaseDate: order.createdAt,
      platformPercentage: order.platformPercentage,
      referrerPercentage: order.referrerPercentage,
    })),
  ];

  const monthlyEarnings = generateMonthlyEarnings(allOrders);

  return (
    <main className="mx-auto w-[90%] max-w-7xl flex-1 space-y-8 py-4">
      <h1 className="text-2xl font-bold sm:text-3xl">Billing & Payments</h1>

      <EarningsSummary allOrders={allOrders} />

      <EarningStatistics monthlyEarnings={monthlyEarnings} />

      <MonthlyStatements transactions={allOrders} />

      <AccountInformationForm user={user} />

      <FundsWithdrawalForm />
    </main>
  );
}

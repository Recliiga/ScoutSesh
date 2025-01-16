import React from "react";
import MonthlyStatements from "@/components/billings-and-payments/MonthlyStatements";
import { getSessionFromHeaders } from "@/services/authServices";
import { getLast12Months } from "@/lib/utils";
import AccountInformationForm from "@/components/billings-and-payments/AccountInformationForm";
import FundsWithdrawalForm from "@/components/billings-and-payments/FundsWithdrawalForm";
import EarningStatistics from "@/components/billings-and-payments/EarningStatistics";
import EarningsSummary from "@/components/billings-and-payments/EarningsSummary";
import { fetchUserStripeAccount } from "@/services/stripeServices";
import {
  fetchAccountBalance,
  fetchTransactions,
} from "@/services/userServices";

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

  const {
    accountBalance,
    pendingBalance,
    error: accountBalanceError,
  } = await fetchAccountBalance(user._id);

  const { stripeAccount } = await fetchUserStripeAccount(user.stripeAccountId);
  const stripeAccountVerified = stripeAccount
    ? stripeAccount.requirements?.currently_due?.length === 0
    : false;

  // const { externalAccounts } = await fetchUserStripeExternalAccount(
  //   user.stripeAccountId,
  // );

  const { transactions } = await fetchTransactions(user._id);

  const monthlyEarnings = generateMonthlyEarnings(transactions);

  return (
    <main className="mx-auto w-[90%] max-w-7xl flex-1 space-y-8 py-4 text-accent-black">
      <h1 className="text-2xl font-bold sm:text-3xl">Billing & Payments</h1>

      <EarningsSummary
        transactions={transactions}
        accountBalance={accountBalance}
        pendingBalance={pendingBalance}
        accountBalanceError={accountBalanceError}
      />

      <EarningStatistics monthlyEarnings={monthlyEarnings} />

      <MonthlyStatements
        transactions={transactions}
        stripeAccountId={user.stripeAccountId}
        user={user}
      />

      <AccountInformationForm
        user={user}
        stripeAccountVerified={stripeAccountVerified}
      />

      <FundsWithdrawalForm
        stripeAccountId={user.stripeAccountId}
        stripeAccountVerified={stripeAccountVerified}
        userId={user._id}
      />
    </main>
  );
}

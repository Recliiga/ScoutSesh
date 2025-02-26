import React from "react";
import MonthlyStatements from "@/components/billings-and-payments/MonthlyStatements";
import { getSessionFromHeaders } from "@/services/authServices";
import AccountInformationForm from "@/components/billings-and-payments/AccountInformationForm";
import FundsWithdrawalForm from "@/components/billings-and-payments/FundsWithdrawalForm";
import EarningStatistics from "@/components/billings-and-payments/EarningStatistics";
import EarningsSummary from "@/components/billings-and-payments/EarningsSummary";
import { fetchUserStripeAccount } from "@/services/stripeServices";
import {
  fetchAccountBalance,
  fetchTransactions,
} from "@/services/userServices";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Billing & Payments",
  description: "View and manage your earnings and payments.",
};

export type TransactionType = {
  _id: string;
  price: number;
  purchaseDate: Date;
  platformPercentage: number;
  referrerPercentage?: number;
};

export default async function BillingsAndPaymentsPage() {
  const user = await getSessionFromHeaders();

  if (user.role !== "Head Coach") notFound();

  const {
    accountBalance,
    pendingBalance,
    error: accountBalanceError,
  } = await fetchAccountBalance(user._id);

  const { stripeAccount } = await fetchUserStripeAccount(user.stripeAccountId);
  const stripeAccountVerified = stripeAccount
    ? stripeAccount.requirements?.currently_due?.length === 0
    : false;

  const { transactions } = await fetchTransactions(user._id);

  return (
    <main className="mx-auto w-[90%] max-w-7xl flex-1 space-y-8 py-4 text-accent-black">
      <h1 className="text-2xl font-bold sm:text-3xl">Billing & Payments</h1>

      <EarningsSummary
        transactions={transactions}
        accountBalance={accountBalance}
        pendingBalance={pendingBalance}
        accountBalanceError={accountBalanceError}
      />

      <EarningStatistics transactions={transactions} />

      <MonthlyStatements transactions={transactions} user={user} />

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

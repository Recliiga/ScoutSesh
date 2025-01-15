"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Select from "../Select";
import Link from "next/link";
import { requestWithdrawal } from "@/actions/stripeActions";
import toast from "react-hot-toast";
import Error from "../AuthError";

export default function FundsWithdrawalForm({
  stripeAccountId,
  stripeAccountVerified,
  accountInformationList,
  accountBalance,
}: {
  stripeAccountId?: string;
  stripeAccountVerified: boolean;
  accountInformationList: {
    id: string;
    bankName: string;
    accountNumber: string;
    verified: boolean;
  }[];
  accountBalance: number;
}) {
  const [selectedAccountId, setSelectedAccountId] = useState<string>();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRequestWithdrawal(e: React.FormEvent) {
    e.preventDefault();
    if (isNaN(Number(amount)) || !stripeAccountId) return;

    if (Number(amount) > accountBalance) {
      setError("Withdrawal amount exceeds account balance.");
      return;
    }

    const selectedAccount = accountInformationList.find(
      (account) => account.id === selectedAccountId,
    );
    if (!selectedAccount) {
      setError("Please select a bank account to withdraw funds.");
      return;
    }

    if (!selectedAccount.verified) {
      setError(
        "The selected bank account is not verified. Please select a verified bank account.",
      );
      return;
    }

    setLoading(true);
    const { error } = await requestWithdrawal(Number(amount), stripeAccountId);
    if (error) {
      toast.error(error);
    }
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle>Withdraw Funds</CardTitle>
        <CardDescription>
          Transfer your earnings to your bank account
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
        {!stripeAccountVerified ? (
          <p className="text-sm text-muted-foreground">
            Please complete your KYC onboarding in order to request a
            withdrawal. You can do this on your{" "}
            <Link
              href="/dashboard/profile"
              className="text-accent-green-100 hover:underline"
            >
              profile page
            </Link>
            .
          </p>
        ) : (
          <form className="space-y-4" onSubmit={handleRequestWithdrawal}>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount to Withdraw</Label>
              <Input
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                min={0}
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bank">Select Bank Account</Label>
              <Select
                onChange={(value) => setSelectedAccountId(value)}
                placeholder="Select bank account"
                value={selectedAccountId}
              >
                <Select.Content>
                  {accountInformationList.map((accountInfo) => (
                    <Select.Option value={accountInfo.id} key={accountInfo.id}>
                      {accountInfo.bankName} {accountInfo.accountNumber}{" "}
                      <span
                        className={`ml-2 rounded-full px-2 py-1 text-xs font-medium ${accountInfo.verified ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}
                      >
                        {accountInfo.verified ? "verified" : "unverified"}
                      </span>
                    </Select.Option>
                  ))}
                </Select.Content>
              </Select>
            </div>
            {error && <Error error={error} />}
            <Button
              disabled={loading || !amount}
              className="w-full border border-input bg-background text-foreground transition-colors hover:bg-green-600 hover:text-white"
            >
              {loading ? "Processing..." : "Withdraw Funds"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

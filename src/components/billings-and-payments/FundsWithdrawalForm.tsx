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
import Link from "next/link";
import Error from "../AuthError";
import { InfoIcon } from "lucide-react";
import { requestWithdrawal } from "@/actions/stripeActions";

export default function FundsWithdrawalForm({
  stripeAccountId,
  stripeAccountVerified,
  userId,
}: {
  stripeAccountId?: string;
  userId: string;
  stripeAccountVerified: boolean;
}) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRequestWithdrawal(e: React.FormEvent) {
    e.preventDefault();
    if (isNaN(Number(amount))) {
      setError("Invalid amount!");
      return;
    }

    if (!stripeAccountId) {
      setError("Invalid account please complete your KYC!");
      return;
    }

    setLoading(true);
    setError("");

    const { error } = await requestWithdrawal(
      userId,
      stripeAccountId,
      Number(amount),
    );

    if (error) {
      setError(error);
    } else {
      setAmount("");
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
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) return;
                  setAmount(e.target.value);
                }}
                type="text"
                min={0}
                autoComplete="off"
                inputMode="numeric"
                className="mt-0"
              />
              <div className="flex gap-2">
                <InfoIcon className="mt-0.5 h-4 w-4 text-amber-500" />
                <p className="flex-1 text-sm text-muted-foreground">
                  The payout will go to your default payout account. To
                  configure this, click on manage payout accounts.
                </p>
              </div>
            </div>

            {/* <div className="space-y-2">
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
                        className={`ml-2 rounded-full px-2 py-1 text-xs font-medium ${accountInfo.isVerified ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}
                      >
                        {accountInfo.isVerified ? "verified" : "unverified"}
                      </span>
                    </Select.Option>
                  ))}
                </Select.Content>
              </Select>
            </div> */}

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

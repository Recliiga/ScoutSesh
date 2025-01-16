"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { UserType } from "@/db/models/User";
import Link from "next/link";
import { createStripeLoginLink } from "@/actions/stripeActions";
import toast from "react-hot-toast";

// const initialAccountInformation = {
//   accountName: "",
//   accountNumber: "",
//   bankName: "",
//   routingNumber: "",
// };

export default function AccountInformationForm({
  user,
  stripeAccountVerified,
}: {
  user: UserType;
  stripeAccountVerified: boolean;
}) {
  const [loading, setLoading] = useState(false);
  // const [accountInformation, setAccountInformation] = useState(
  //   initialAccountInformation,
  // );
  // const [error, setError] = useState("");

  // const { accountName, accountNumber, bankName, routingNumber } =
  //   accountInformation;

  // const cannotSubmit = Object.values(accountInformation).some(
  //   (value) => value.trim() === "",
  // );

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   if (!user.stripeAccountId) {
  //     setError(
  //       "An error occured while adding new payout account. Please contact support for assistance.",
  //     );
  //     return;
  //   }

  //   setLoading(true);
  //   const { error: accountInfoError } = await addAccountInformation(
  //     user,
  //     accountInformation,
  //   );
  //   if (accountInfoError) setError(accountInfoError);
  //   setLoading(false);
  // }

  async function handleRedirectToStripeDashboard() {
    if (!user.stripeAccountId) {
      toast.error(
        "Invalid stripe account ID. Please complete your stripe onboarding",
      );
      return;
    }
    setLoading(true);
    const { url, error } = await createStripeLoginLink(user.stripeAccountId);
    if (error === null) {
      window.open(url, "_blank");
    } else {
      toast.error(error);
    }
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle>Bank Account Information</CardTitle>
        <CardDescription>
          Add or update your bank account details for withdrawals
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
        {!stripeAccountVerified ? (
          <p className="text-sm text-muted-foreground">
            Please complete your KYC onboarding in order to add a withdrawal
            account. You can do this on your{" "}
            <Link
              href="/dashboard/profile"
              className="text-accent-green-100 hover:underline"
            >
              profile page
            </Link>
            .
          </p>
        ) : (
          <Button disabled={loading} onClick={handleRedirectToStripeDashboard}>
            Add new payout account
          </Button>
          // <form className="space-y-4" onSubmit={handleSubmit}>
          //   <div className="space-y-2">
          //     <Label htmlFor="accountName">Account Holder Name</Label>
          //     <Input
          //       id="accountName"
          //       value={accountName}
          //       onChange={(e) =>
          //         setAccountInformation({
          //           ...accountInformation,
          //           accountName: e.target.value,
          //         })
          //       }
          //       placeholder="Enter account holder name"
          //       className="text-sm"
          //       required
          //       autoComplete="off"
          //     />
          //   </div>
          //   <div className="space-y-2">
          //     <Label htmlFor="accountNumber">Account Number</Label>
          //     <Input
          //       id="accountNumber"
          //       value={accountNumber}
          //       onChange={(e) => {
          //         if (isNaN(Number(e.target.value))) return;
          //         setAccountInformation({
          //           ...accountInformation,
          //           accountNumber: e.target.value,
          //         });
          //       }}
          //       inputMode="numeric"
          //       placeholder="Enter account number"
          //       className="text-sm"
          //       type="text"
          //       required
          //       maxLength={12}
          //       autoComplete="off"
          //     />
          //   </div>
          //   <div className="space-y-2">
          //     <Label htmlFor="routingNumber">Routing Number</Label>
          //     <Input
          //       id="routingNumber"
          //       value={routingNumber}
          //       onChange={(e) => {
          //         if (isNaN(Number(e.target.value))) return;
          //         setAccountInformation({
          //           ...accountInformation,
          //           routingNumber: e.target.value,
          //         });
          //       }}
          //       inputMode="numeric"
          //       type="text"
          //       maxLength={9}
          //       placeholder="Enter routing number"
          //       className="text-sm"
          //       required
          //       autoComplete="off"
          //     />
          //   </div>
          //   <div className="space-y-2">
          //     <Label htmlFor="bankName">Bank Name</Label>
          //     <Input
          //       id="bankName"
          //       value={bankName}
          //       onChange={(e) =>
          //         setAccountInformation({
          //           ...accountInformation,
          //           bankName: e.target.value,
          //         })
          //       }
          //       placeholder="Enter bank name"
          //       className="text-sm"
          //       required
          //       autoComplete="off"
          //     />
          //   </div>
          //   {error && <Error error={error} />}
          //   <Button
          //     disabled={loading || cannotSubmit}
          //     className="w-full border border-input bg-background text-foreground transition-colors hover:bg-green-600 hover:text-white"
          //   >
          //     Save Bank Information
          //   </Button>
          // </form>
        )}
      </CardContent>
    </Card>
  );
}

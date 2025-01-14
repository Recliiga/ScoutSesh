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
import { UserType } from "@/db/models/User";
import { saveAccountInformation } from "@/actions/userActions";
import toast from "react-hot-toast";

const initialAccountInformation = {
  accountName: "",
  accountNumber: "",
  bankName: "",
  routingNumber: "",
};

export default function AccountInformationForm({ user }: { user: UserType }) {
  const [accountInformation, setAccountInformation] = useState(
    initialAccountInformation,
  );
  const { accountName, accountNumber, bankName, routingNumber } =
    accountInformation;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cannotSubmit = Object.values(accountInformation).some(
      (value) => value.trim() === "",
    );

    if (cannotSubmit) return;

    const { error } = await saveAccountInformation(
      user._id,
      accountInformation,
    );
    if (error) {
      toast.error("Failed to save account information.");
    } else {
      setAccountInformation(initialAccountInformation);
      toast.success("Account information saved successfully.");
    }
  }

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle>Bank Account Information</CardTitle>
        <CardDescription>
          Add or update your bank account details for withdrawals
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 sm:p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="accountName">Account Holder Name</Label>
            <Input
              id="accountName"
              value={accountName}
              onChange={(e) =>
                setAccountInformation({
                  ...accountInformation,
                  accountName: e.target.value,
                })
              }
              placeholder="Enter account holder name"
              className="text-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => {
                if (isNaN(Number(e.target.value))) return;
                setAccountInformation({
                  ...accountInformation,
                  accountNumber: e.target.value,
                });
              }}
              inputMode="numeric"
              placeholder="Enter account number"
              className="text-sm"
              type="text"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="routingNumber">Routing Number</Label>
            <Input
              id="routingNumber"
              value={routingNumber}
              onChange={(e) => {
                if (isNaN(Number(e.target.value))) return;
                setAccountInformation({
                  ...accountInformation,
                  routingNumber: e.target.value,
                });
              }}
              inputMode="numeric"
              type="text"
              placeholder="Enter routing number"
              className="text-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              value={bankName}
              onChange={(e) =>
                setAccountInformation({
                  ...accountInformation,
                  bankName: e.target.value,
                })
              }
              placeholder="Enter bank name"
              className="text-sm"
              required
            />
          </div>
          <Button className="w-full border border-input bg-background text-foreground transition-colors hover:bg-green-600 hover:text-white">
            Save Bank Information
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

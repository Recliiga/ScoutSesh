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

export default function FundsWithdrawalForm() {
  const [selectedBankAccount, setSelectedBankAccount] = useState<string>();

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle>Withdraw Funds</CardTitle>
        <CardDescription>
          Transfer your earnings to your bank account
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount to Withdraw</Label>
            <Input id="amount" placeholder="Enter amount" type="number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bank">Select Bank Account</Label>
            <Select
              onChange={(value) => setSelectedBankAccount(value)}
              placeholder="Select bank account"
              value={selectedBankAccount}
            >
              <Select.Content>
                <Select.Option value="bank2">
                  Bank of America - Checking ****1234
                </Select.Option>
              </Select.Content>
            </Select>

            {/* <Select>
              <SelectTrigger id="bank2">
                <SelectValue placeholder="Select bank account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank1">
                  Bank of America - Checking ****1234
                </SelectItem>
                <SelectItem value="bank2">Chase - Savings ****5678</SelectItem>
                <SelectItem value="bank3">
                  Wells Fargo - Checking ****9012
                </SelectItem>
              </SelectContent>
            </Select> */}
          </div>
          <Button className="w-full border border-input bg-background text-foreground transition-colors hover:bg-green-600 hover:text-white">
            Withdraw Funds
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

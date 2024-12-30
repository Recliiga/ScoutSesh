"use client";

import React from "react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "../ui/card";
import Select from "../Select";
import { Button } from "../ui/button";

export default function MonthlyStatements() {
  const [selectedMonth, setSelectedMonth] = React.useState("2023-10");

  return (
    <Card className="mt-24">
      <CardHeader>
        <CardTitle>Monthly Statements</CardTitle>
        <CardDescription>
          View and download your monthly statements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex space-x-2">
          <Select
            value={selectedMonth}
            onChange={setSelectedMonth}
            containerClassName="w-[180px]"
            placeholder="Select month"
          >
            <Select.Content>
              <Select.Option value="2023-12">December 2023</Select.Option>
              <Select.Option value="2023-11">November 2023</Select.Option>
              <Select.Option value="2023-10">October 2023</Select.Option>
              <Select.Option value="2023-09">September 2023</Select.Option>
              <Select.Option value="2023-08">August 2023</Select.Option>
            </Select.Content>
          </Select>
          <Button>Download Statement</Button>
        </div>
        <div className="rounded border p-4">
          <h3 className="mb-2 font-semibold">
            Statement Summary for {selectedMonth}
          </h3>
          <p>Total Earnings: $7,800.00</p>
          <p>Number of Projects: 12</p>
          <p>Platform Fees: $780.00</p>
          <p>Net Earnings: $7,020.00</p>
        </div>
      </CardContent>
    </Card>
  );
}

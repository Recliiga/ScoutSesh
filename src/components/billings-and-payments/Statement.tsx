import { TransactionType } from "@/app/dashboard/billings-and-payments/page";
import { format } from "date-fns";
import React, { useMemo, useRef } from "react";
import { Button } from "../ui/button";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Statement({
  userName,
  organizationName,
  date,
  statementTransactions,
  openingBalance,
}: {
  userName: string;
  organizationName: string;
  date: string;
  statementTransactions: TransactionType[];
  openingBalance: number;
}) {
  const statementRef = useRef<HTMLDivElement | null>(null);

  const transactions = useMemo(() => {
    const newStatement: {
      amount: number;
      date: string;
      balance: number;
      description: string;
    }[] = [];
    let currentBalance = openingBalance;
    statementTransactions.forEach((transaction) => {
      const netPrice =
        (transaction.price * (100 - transaction.platformPercentage)) / 100;
      currentBalance = currentBalance + netPrice;
      newStatement.push({
        amount: netPrice,
        date: format(new Date(transaction.purchaseDate), "yyyy-MM-dd"),
        balance: currentBalance,
        description: "Payment Received",
      });
    });
    return newStatement;
  }, [openingBalance, statementTransactions]);

  function handleDownload() {
    if (!statementRef.current) return;
    html2canvas(statementRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF();

      const imgWidth = doc.internal.pageSize.width - 40; // Set width with a small margin
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // M

      doc.addImage(imgData, "PNG", 20, 20, imgWidth, imgHeight);
      doc.save(
        `${date.toLowerCase().split(" ").join("_")}_scoutsesh_account_statement.pdf`,
      );
    });
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 text-sm shadow-[0_0_6px_2px_#eee]">
      <div ref={statementRef}>
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-bold text-accent-green-100">ScoutSesh</h2>
          <p className="text-base font-semibold">Account Statement</p>
        </div>
        <div className="my-2 flex justify-between">
          <div>
            <p className="font-medium text-zinc-600">
              Name:{" "}
              <span className="font-semibold text-accent-black">
                {userName}
              </span>
            </p>
            <p className="font-medium text-zinc-600">
              Organization:{" "}
              <span className="font-semibold text-accent-black">
                {organizationName}
              </span>
            </p>
            <p className="font-medium text-zinc-600">
              Statement Period:{" "}
              <span className="font-semibold text-accent-black">{date}</span>
            </p>
          </div>
          <div>
            <p className="font-medium text-zinc-600">
              Opening Balance:{" "}
              <span className="font-semibold text-accent-black">
                {openingBalance}
              </span>
            </p>
            <p className="font-medium text-zinc-600">
              Total Credit:{" "}
              <span className="font-semibold text-accent-black">
                {statementTransactions
                  .reduce(
                    (prev, curr) =>
                      prev +
                      (curr.price * (100 - curr.platformPercentage)) / 100,
                    0,
                  )
                  .toFixed(2)}
              </span>
            </p>
            <p className="font-medium text-zinc-600">
              Total Debit:{" "}
              <span className="font-semibold text-accent-black">0</span>
            </p>
            <p className="font-medium text-zinc-600">
              Closing Balance:{" "}
              <span className="font-semibold text-accent-black">
                {openingBalance}
              </span>
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-200 bg-gray-100 px-4 py-2 text-left text-sm font-medium uppercase leading-4 tracking-wider text-gray-600">
                  Date
                </th>
                <th className="border-b-2 border-gray-200 bg-gray-100 px-4 py-2 text-left text-sm font-medium uppercase leading-4 tracking-wider text-gray-600">
                  Description
                </th>
                <th className="border-b-2 border-gray-200 bg-gray-100 px-4 py-2 text-right text-sm font-medium uppercase leading-4 tracking-wider text-gray-600">
                  Debit
                </th>
                <th className="border-b-2 border-gray-200 bg-gray-100 px-4 py-2 text-right text-sm font-medium uppercase leading-4 tracking-wider text-gray-600">
                  Credit
                </th>
                <th className="border-b-2 border-gray-200 bg-gray-100 px-4 py-2 text-right text-sm font-medium uppercase leading-4 tracking-wider text-gray-600">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border-b border-gray-200 px-4 py-2">
                    {transaction.date}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-2">
                    {transaction.description}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-2 text-right text-red-500">
                    {transaction.amount < 0
                      ? `-$${Math.abs(transaction.amount).toFixed(2)}`
                      : ""}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-2 text-right text-green-500">
                    {transaction.amount > 0
                      ? `+$${transaction.amount.toFixed(2)}`
                      : ""}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-2 text-right">
                    ${transaction.balance.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button onClick={handleDownload}>Download Statement</Button>
      </div>
    </div>
  );
}

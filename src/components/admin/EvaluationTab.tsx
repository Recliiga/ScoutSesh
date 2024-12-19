import { TabsContent } from "@radix-ui/react-tabs";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import Link from "next/link";
import { getFullname } from "@/lib/utils";
import { AdminDataType } from "./AdminPageMain";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";

type SortOptionsType = {
  column: "active" | "total" | "revenue";
  direction: "desc" | "asc";
};

const initialSortOptions: SortOptionsType = {
  column: "revenue",
  direction: "desc",
};

export default function EvaluationTab({
  adminData,
}: {
  adminData: AdminDataType;
}) {
  const [evaluationSearchQuery, setEvaluationSearchQuery] = useState("");
  const [evaluationSortOptions, setEvaluationSortOptions] =
    useState<SortOptionsType>(initialSortOptions);

  const filteredEvaluations = adminData.evaluationOrders
    .filter((evaluationOrder) => {
      const matchCoach = getFullname(evaluationOrder.coach)
        .toLowerCase()
        .includes(evaluationSearchQuery.toLowerCase());
      const matchOrganization = evaluationOrder.coach.organization?.name
        .toLowerCase()
        .includes(evaluationSearchQuery.toLowerCase());

      return matchCoach || matchOrganization;
    })
    .filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          (order) =>
            order.coach.organization?._id === item.coach.organization?._id,
        ),
    );

  const sortedEvaluations = filteredEvaluations.sort((a, b) => {
    switch (evaluationSortOptions.column) {
      case "active":
        return evaluationSortOptions.direction === "asc"
          ? getActiveEvaluations(a.coach.organization!._id) -
              getActiveEvaluations(b.coach.organization!._id)
          : getActiveEvaluations(b.coach.organization!._id) -
              getActiveEvaluations(a.coach.organization!._id);

      case "total":
        return evaluationSortOptions.direction === "asc"
          ? getTotalEvaluations(a.coach.organization!._id) -
              getTotalEvaluations(b.coach.organization!._id)
          : getTotalEvaluations(b.coach.organization!._id) -
              getTotalEvaluations(a.coach.organization!._id);

      case "revenue":
        return evaluationSortOptions.direction === "asc"
          ? getOrganizationEvaluationRevenue(a.coach.organization!._id) -
              getOrganizationEvaluationRevenue(b.coach.organization!._id)
          : getOrganizationEvaluationRevenue(b.coach.organization!._id) -
              getOrganizationEvaluationRevenue(a.coach.organization!._id);

      default:
        return 0;
    }
  });

  function handleSort(column: "active" | "total" | "revenue") {
    console.log(column);
    if (column === evaluationSortOptions.column) {
      setEvaluationSortOptions((prev) => ({
        column,
        direction: prev.direction === "asc" ? "desc" : "asc",
      }));
    } else {
      setEvaluationSortOptions({ column, direction: "desc" });
    }
  }

  function getTotalEvaluations(organizationId: string) {
    return adminData.evaluationOrders
      .filter(
        (evalOrder) => evalOrder.coach.organization?._id === organizationId,
      )
      .reduce((acc, curr) => acc + curr.evaluationDates.length, 0);
  }

  function getActiveEvaluations(organizationId: string) {
    return adminData.evaluationOrders
      .filter(
        (evalOrder) => evalOrder.coach.organization?._id === organizationId,
      )
      .reduce(
        (acc, curr) =>
          acc +
          curr.evaluationDates.filter((date) => !date.dateAthleteEvaluated)
            .length,
        0,
      );
  }

  function getOrganizationEvaluationRevenue(organizationId: string) {
    return adminData.evaluationOrders
      .filter(
        (evalOrder) => evalOrder.coach.organization?._id === organizationId,
      )
      .reduce((acc, curr) => acc + curr.totalPrice, 0);
  }

  return (
    <TabsContent tabIndex={undefined} value="evaluations" className="space-y-4">
      <div className="mt-6 space-y-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-semibold">Athlete Evaluations</h2>
          <Input
            placeholder="Search organizations or head coaches..."
            value={evaluationSearchQuery}
            onChange={(e) => setEvaluationSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 text-sm sm:max-w-sm"
          />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Athlete Evaluation Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30%]">Organization</TableHead>
                  <TableHead className="w-[15%]">Head Coach</TableHead>
                  <TableHead
                    className="w-[17%] cursor-pointer text-right"
                    onClick={() => handleSort("active")}
                  >
                    <div className="flex items-center justify-end">
                      Active Evaluations
                      {evaluationSortOptions.column === "active" ? (
                        evaluationSortOptions.direction === "asc" ? (
                          <ChevronUp className="ml-1" />
                        ) : (
                          <ChevronDown className="ml-1" />
                        )
                      ) : (
                        <ChevronsUpDown className="ml-1" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="w-[17%] cursor-pointer text-right"
                    onClick={() => handleSort("total")}
                  >
                    <div className="flex items-center justify-end">
                      Total Evaluations
                      {evaluationSortOptions.column === "total" ? (
                        evaluationSortOptions.direction === "asc" ? (
                          <ChevronUp className="ml-1" />
                        ) : (
                          <ChevronDown className="ml-1" />
                        )
                      ) : (
                        <ChevronsUpDown className="ml-1" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="w-[11%] cursor-pointer text-right"
                    onClick={() => handleSort("revenue")}
                  >
                    <div className="flex items-center justify-end">
                      Revenue
                      {evaluationSortOptions.column === "revenue" ? (
                        evaluationSortOptions.direction === "asc" ? (
                          <ChevronUp className="ml-1" />
                        ) : (
                          <ChevronDown className="ml-1" />
                        )
                      ) : (
                        <ChevronsUpDown className="ml-1" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="w-[10%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedEvaluations.map((evaluationOrder) => (
                  <TableRow key={evaluationOrder._id}>
                    <TableCell className="font-medium">
                      {evaluationOrder.coach.organization?.name}
                    </TableCell>
                    <TableCell>{getFullname(evaluationOrder.coach)}</TableCell>
                    <TableCell className="text-right">
                      {getActiveEvaluations(
                        evaluationOrder.coach.organization!._id,
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {getTotalEvaluations(
                        evaluationOrder.coach.organization!._id,
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      $
                      {getOrganizationEvaluationRevenue(
                        evaluationOrder.coach.organization!._id,
                      )}
                    </TableCell>
                    <TableCell className="flex justify-end">
                      <Link
                        href={`/admin/evaluations/${evaluationOrder.coach.organization?._id}`}
                        className="rounded-md border px-2 py-1 text-xs font-medium duration-200 hover:bg-accent-gray-100"
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}

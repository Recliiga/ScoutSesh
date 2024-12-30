"use client";
import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AthleteEvaluationOrderType } from "@/db/models/AthleteEvaluationOrder";
import { getFullname } from "@/lib/utils";
import StatusBadge from "./StatusBadge";
import Select from "../Select";

export default function EvaluationResultsTable({
  evaluations,
}: {
  evaluations: AthleteEvaluationOrderType[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  function getEvaluationStatus(evaluationOrder: AthleteEvaluationOrderType): {
    variant: "default" | "success" | "warning";
    text: "Completed" | "In progress" | "Scheduled";
  } {
    if (
      evaluationOrder.evaluationDates.some(
        (date) => date.dateCoachEvaluated || !date.dateAthleteEvaluated,
      )
    )
      return { variant: "warning", text: "In progress" };
    if (
      !evaluationOrder.evaluationDates.some((date) => date.dateAthleteEvaluated)
    )
      return { variant: "success", text: "Completed" };

    return { variant: "default", text: "Scheduled" };
  }

  const filteredEvaluations = useMemo(() => {
    return evaluations.filter((evaluation) => {
      const matchesSearch =
        getFullname(evaluation.athlete)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        getFullname(evaluation.coach)
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        getEvaluationStatus(evaluation).text.toLowerCase() ===
          statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [evaluations, searchQuery, statusFilter]);

  function getTotalEvaluations(evaluationOrder: AthleteEvaluationOrderType) {
    return evaluationOrder.evaluationDates.length;
  }

  function getCompletedEvaluations(
    evaluationOrder: AthleteEvaluationOrderType,
  ) {
    return evaluationOrder.evaluationDates.filter(
      (date) => date.dateCoachEvaluated && date.dateAthleteEvaluated,
    ).length;
  }

  function formatEvaluationDate(date: Date) {
    const evaluationDate = new Date(date);
    const evaluationMonth = evaluationDate.getMonth() + 1;
    const evaluationDay = evaluationDate.getDate();
    return `${evaluationDate.getFullYear()}-${evaluationMonth < 10 ? "0" : ""}${evaluationMonth}-${evaluationDay < 10 ? "0" : ""}${evaluationDay}`;
  }

  const totalPages = Math.ceil(filteredEvaluations.length / itemsPerPage);
  const paginatedEvaluations = filteredEvaluations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <Card className="flex flex-col gap-6 p-4 sm:p-6">
          <CardHeader className="p-0">
            <CardTitle>Evaluation Results</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row">
              <div className="flex-grow">
                <Input
                  placeholder="Search athletes or evaluators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 text-sm sm:px-4"
                />
              </div>
              <div className="flex items-center gap-4 text-sm">
                <p>Filter:</p>
                <Select
                  value={statusFilter}
                  onChange={setStatusFilter}
                  defaultChild={"All"}
                  containerClassName="flex-1 sm:w-40"
                >
                  <Select.Content className="z-20">
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="scheduled">Scheduled</Select.Option>
                    <Select.Option value="in progress">
                      In Progress
                    </Select.Option>
                    <Select.Option value="completed">Completed</Select.Option>
                  </Select.Content>
                </Select>
              </div>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-white">
                  <TableRow>
                    <TableHead>Athlete Name</TableHead>
                    <TableHead>Evaluator</TableHead>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedEvaluations.map((evaluation) => (
                    <TableRow key={evaluation._id}>
                      <TableCell className="font-medium">
                        {getFullname(evaluation.athlete)}
                      </TableCell>
                      <TableCell>{getFullname(evaluation.coach)}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        {formatEvaluationDate(evaluation.createdAt)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge
                          variant={getEvaluationStatus(evaluation).variant}
                        >
                          {getEvaluationStatus(evaluation).text}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>{evaluation.plan}</TableCell>
                      <TableCell>
                        {evaluation.plan !== "custom"
                          ? `${getCompletedEvaluations(evaluation)}/${getTotalEvaluations(evaluation)}`
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Issue Refund
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 py-4">
              <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
                Showing {paginatedEvaluations.length} of{" "}
                {filteredEvaluations.length} results
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

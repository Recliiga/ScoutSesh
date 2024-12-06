"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchIcon } from "lucide-react";
import { AthleteEvaluationTemplateType } from "@/db/models/AthleteEvaluationTemplate";
import Link from "next/link";

type PropsType = {
  templates: AthleteEvaluationTemplateType[];
};

export default function AthleteEvaluationTemplateList({
  templates,
}: PropsType) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <div>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
          <Input
            type="search"
            placeholder="Search templates..."
            className="w-full py-2 pl-10 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {templates.length > 0 ? (
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">File Name</TableHead>
                <TableHead className="w-[30%]">Last Modified</TableHead>
                <TableHead className="w-[20%]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.map((template) => (
                <TableRow key={template._id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>
                    {new Date(template.updatedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="flex flex-wrap gap-2">
                    <Link
                      href={`/dashboard/athlete-evaluation/templates/edit/${template._id}`}
                      className="mr-2 rounded-md border px-3 py-1.5 text-xs font-medium duration-200 hover:bg-accent-gray-100"
                    >
                      Edit
                    </Link>
                    <Button variant="outline" size="sm">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="p-4 text-sm text-accent-gray-300">
          You currently do not have any Evaluation Templates.{" "}
          <Link
            href={"/dashboard/athlete-evaluation/templates/new"}
            className="text-green-600 hover:underline"
          >
            Create
          </Link>{" "}
          one now to simplify and enhance your evaluation workflow!
        </p>
      )}
    </>
  );
}

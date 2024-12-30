import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "../ui/tabs";
import { GroupClassType } from "@/db/models/GroupClass";
import { getFullname } from "@/lib/utils";
import { GroupClassOrderType } from "@/db/models/GroupClassOrder";

type SortOptionsType = {
  column: "enrolled" | "revenue" | "date";
  direction: "desc" | "asc";
};

const initialSortOptions: SortOptionsType = {
  column: "revenue",
  direction: "desc",
};

export default function CoursesTab({
  classOrders,
  groupClasses,
}: {
  classOrders: GroupClassOrderType[];
  groupClasses: GroupClassType[];
}) {
  const [classSearchQuery, setClassSearchQuery] = useState("");
  const [courseSortOptions, setCourseSortOptions] =
    useState<SortOptionsType>(initialSortOptions);
  const [liveClassSortOptions, setLiveClassSortOptions] =
    useState<SortOptionsType>(initialSortOptions);

  function getGroupClassRevenue(groupClass: GroupClassType) {
    return classOrders
      .filter((order) => order.course._id === groupClass._id)
      .reduce((curr, acc) => curr + acc.price, 0);
  }

  function getNumberOfClassStudents(groupClass: GroupClassType) {
    return classOrders.filter((order) => order.course._id === groupClass._id)
      .length;
  }

  const filteredGroupClasses = groupClasses.filter(
    (groupClass) =>
      groupClass.title.toLowerCase().includes(classSearchQuery.toLowerCase()) ||
      groupClass.coaches[0].organization?.name
        .toLowerCase()
        .includes(classSearchQuery.toLowerCase()) ||
      getFullname(groupClass.user)
        .toLowerCase()
        .includes(classSearchQuery.toLowerCase()),
  );

  const sortedGroupClasses = filteredGroupClasses
    .filter((groupClass) => groupClass.courseType === "live")
    .sort((a, b) => {
      if (liveClassSortOptions.column === "enrolled") {
        return liveClassSortOptions.direction === "asc"
          ? getNumberOfClassStudents(a) - getNumberOfClassStudents(b)
          : getNumberOfClassStudents(b) - getNumberOfClassStudents(a);
      } else if (liveClassSortOptions.column === "revenue") {
        return liveClassSortOptions.direction === "asc"
          ? getGroupClassRevenue(a) - getGroupClassRevenue(b)
          : getGroupClassRevenue(b) - getGroupClassRevenue(a);
      }
      return 0;
    });

  function handleSort(
    column: "enrolled" | "revenue" | "date",
    table: "courses" | "liveClasses" | "evaluations",
  ) {
    if (table === "courses") {
      if (column === courseSortOptions.column) {
        setCourseSortOptions((prev) => ({
          column,
          direction: prev.direction === "asc" ? "desc" : "asc",
        }));
      } else {
        setCourseSortOptions({ column, direction: "desc" });
      }
    } else if (table === "liveClasses") {
      if (column === liveClassSortOptions.column) {
        setLiveClassSortOptions((prev) => ({
          column,
          direction: prev.direction === "asc" ? "desc" : "asc",
        }));
      } else {
        setLiveClassSortOptions({ column, direction: "desc" });
      }
    }
  }

  const sortedCourses = filteredGroupClasses
    .filter((groupClass) => groupClass.courseType === "video")
    .sort((a, b) => {
      if (courseSortOptions.column === "enrolled") {
        return courseSortOptions.direction === "asc"
          ? getNumberOfClassStudents(a) - getNumberOfClassStudents(b)
          : getNumberOfClassStudents(b) - getNumberOfClassStudents(a);
      } else if (courseSortOptions.column === "revenue") {
        return courseSortOptions.direction === "asc"
          ? getGroupClassRevenue(a) - getGroupClassRevenue(b)
          : getGroupClassRevenue(b) - getGroupClassRevenue(a);
      }
      return 0;
    });

  return (
    <TabsContent tabIndex={undefined} value="courses" className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-semibold">Courses & Classes</h2>
        <Input
          placeholder="Search courses and classes..."
          value={classSearchQuery}
          onChange={(e) => setClassSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 text-sm sm:max-w-sm"
        />
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Video Courses</CardTitle>
          </CardHeader>
          <CardContent className="min-h-[450px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Title</TableHead>
                  <TableHead className="w-[250px]">Organization</TableHead>
                  <TableHead className="w-[150px]">Instructor</TableHead>
                  <TableHead
                    className="w-[100px] cursor-pointer text-right"
                    onClick={() => handleSort("enrolled", "courses")}
                  >
                    <div className="flex items-center justify-end">
                      Enrolled
                      {courseSortOptions.column === "enrolled" ? (
                        courseSortOptions.direction === "asc" ? (
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
                    className="w-[150px] cursor-pointer text-right"
                    onClick={() => handleSort("revenue", "courses")}
                  >
                    <div className="flex items-center justify-end">
                      Revenue
                      {courseSortOptions.column === "revenue" ? (
                        courseSortOptions.direction === "asc" ? (
                          <ChevronUp className="ml-1" />
                        ) : (
                          <ChevronDown className="ml-1" />
                        )
                      ) : (
                        <ChevronsUpDown className="ml-1" />
                      )}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCourses.map((course) => (
                  <TableRow key={course._id}>
                    <TableCell className="min-w-28 font-medium">
                      {course.title}
                    </TableCell>
                    <TableCell className="min-w-28">
                      {course.coaches[0].organization?.name}
                    </TableCell>
                    <TableCell>{getFullname(course.coaches[0])}</TableCell>
                    <TableCell className="text-right">
                      {getNumberOfClassStudents(course)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${getGroupClassRevenue(course)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Live Classes</CardTitle>
          </CardHeader>
          <CardContent className="min-h-[450px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Name</TableHead>
                  <TableHead className="w-[250px]">Organization</TableHead>
                  <TableHead className="w-[200px]">Instructor</TableHead>
                  <TableHead
                    className="w-[150px] cursor-pointer text-right"
                    onClick={() => handleSort("enrolled", "liveClasses")}
                  >
                    <div className="flex items-center justify-end">
                      Enrolled
                      {liveClassSortOptions.column === "enrolled" ? (
                        liveClassSortOptions.direction === "asc" ? (
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
                    className="w-[150px] cursor-pointer text-right"
                    onClick={() => handleSort("revenue", "liveClasses")}
                  >
                    <div className="flex items-center justify-end">
                      Revenue
                      {liveClassSortOptions.column === "revenue" ? (
                        liveClassSortOptions.direction === "asc" ? (
                          <ChevronUp className="ml-1" />
                        ) : (
                          <ChevronDown className="ml-1" />
                        )
                      ) : (
                        <ChevronsUpDown className="ml-1" />
                      )}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedGroupClasses.map((liveClass) => (
                  <TableRow key={liveClass._id}>
                    <TableCell className="min-w-28 font-medium">
                      {liveClass.title}
                    </TableCell>
                    <TableCell>
                      {liveClass.coaches[0].organization?.name}
                    </TableCell>
                    <TableCell>{getFullname(liveClass.coaches[0])}</TableCell>
                    <TableCell className="text-right">
                      {getNumberOfClassStudents(liveClass)}/
                      {liveClass.totalSpots}
                    </TableCell>
                    <TableCell className="text-right">
                      ${getGroupClassRevenue(liveClass)}
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

"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { OrganizationType } from "@/db/models/Organization";
import { UserType } from "@/db/models/User";
import { GroupClassType } from "@/db/models/GroupClass";
import { GroupClassOrderType } from "@/db/models/GroupClassOrder";
import { AthleteEvaluationOrderType } from "@/db/models/AthleteEvaluationOrder";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";
import EvaluationTab from "./EvaluationTab";
import UsersTab from "./UsersTab";
import FinancialsTab from "./FinancialsTab";
import CoursesTab from "./CoursesTab";

export type AdminDataType = {
  users: UserType[];
  organizations: OrganizationType[];
  groupClasses: GroupClassType[];
  classOrders: GroupClassOrderType[];
  evaluationOrders: AthleteEvaluationOrderType[];
  evaluations: AthleteEvaluationType[];
};

export default function AdminPageMain({
  adminData,
}: {
  adminData: AdminDataType;
}) {
  return (
    <main className="mx-auto w-[90%] max-w-7xl flex-1 space-y-6 py-6 text-accent-black">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users" className="px-2 sm:px-3">
            Users
          </TabsTrigger>
          <TabsTrigger value="financials" className="px-2 sm:px-3">
            Financials
          </TabsTrigger>
          <TabsTrigger value="courses" className="px-2 sm:px-3">
            <span className="hidden sm:inline">Courses & Classes</span>
            <span className="sm:hidden">Classes</span>
          </TabsTrigger>
          <TabsTrigger value="evaluations" className="px-2 sm:px-3">
            <span className="hidden sm:inline">Athlete Evaluations</span>
            <span className="sm:hidden">Athlete</span>
          </TabsTrigger>
        </TabsList>

        <UsersTab
          organizations={adminData.organizations}
          users={adminData.users}
        />

        <FinancialsTab />

        <CoursesTab
          classOrders={adminData.classOrders}
          groupClasses={adminData.groupClasses}
        />

        <EvaluationTab adminData={adminData} />
      </Tabs>
    </main>
  );
}

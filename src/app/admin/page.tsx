import React from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminPageMain from "@/components/admin/AdminPageMain";
import { fetchAdminData } from "@/services/adminServices";
import AdminLoginPage from "@/components/admin/AdminLoginPage";
import { getAdminSession } from "@/services/authServices";

export default async function AdminPage() {
  const { isAuthenticated } = await getAdminSession();

  const { adminData, error } = await fetchAdminData();
  if (error !== null) throw new Error(error);

  return (
    <div className="flex flex-1 flex-col">
      <AdminHeader isAuthenticated={isAuthenticated} />
      {isAuthenticated ? (
        <AdminPageMain adminData={adminData} />
      ) : (
        <AdminLoginPage />
      )}
    </div>
  );
}

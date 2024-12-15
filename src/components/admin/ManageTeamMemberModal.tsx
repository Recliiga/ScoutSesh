import React, { useState } from "react";
import { UserType } from "@/db/models/User";
import Select from "../Select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { getFullname } from "@/lib/utils";
import { XIcon } from "lucide-react";

export default function ManageTeamMemberModal({
  userToManage,
  closeModal,
}: {
  userToManage: UserType | null;
  closeModal: () => void;
}) {
  const [userStatus, setUserStatus] = useState(
    userToManage?.status || "Active",
  );
  const [userRole, setUserRole] = useState(userToManage?.role || "Athlete");

  function handleSave() {
    closeModal();
  }

  return (
    <div
      className={`absolute left-[50%] top-[50%] w-[90%] max-w-lg -translate-x-[50%] -translate-y-[50%] rounded-md bg-white p-4 ${userToManage ? "visible scale-100 opacity-100" : "invisible scale-90 opacity-0"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="font-semibold">
        Manage User: {userToManage ? getFullname(userToManage) : null}
      </h3>
      <div className="grid gap-4 py-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="status">Status</label>
          <Select
            placeholder="Select user status"
            value={userStatus}
            onChange={(value) => setUserStatus(value as typeof userStatus)}
          >
            <Select.Content>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Suspended">Suspended</Select.Option>
              <Select.Option value="Banned">Banned</Select.Option>
            </Select.Content>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="role">Role</label>
          <Select
            value={userRole}
            placeholder="Select user role"
            onChange={(value) => setUserRole(value as typeof userRole)}
          >
            <Select.Content>
              <Select.Option value="Head Coach">Head Coach</Select.Option>
              <Select.Option value="Assistant Coach">
                Assistant Coach
              </Select.Option>
              <Select.Option value="Athlete">Athlete</Select.Option>
            </Select.Content>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="notes">Admin Notes</label>
          <Textarea
            id="notes"
            rows={3}
            placeholder="Add any relevant notes about this user"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button onClick={closeModal} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
      <button
        onClick={closeModal}
        className="absolute right-2 top-2 p-1 text-accent-gray-300 duration-200 hover:text-accent-black"
      >
        <XIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

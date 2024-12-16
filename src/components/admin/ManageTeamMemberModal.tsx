import React, { useState } from "react";
import { UserStatusType, UserType } from "@/db/models/User";
import Select from "../Select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { getFullname } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { updateTeamMember } from "@/actions/adminActions";
import Error from "../AuthError";
import LoadingIndicator from "../LoadingIndicator";
import { AdminNoteType } from "@/db/models/AdminNotes";

export default function ManageTeamMemberModal({
  open,
  user,
  closeModal,
  setTeamMembers,
  adminNote,
}: {
  open: boolean;
  user: UserType;
  closeModal: () => void;
  setTeamMembers: React.Dispatch<React.SetStateAction<UserType[]>>;
  adminNote?: AdminNoteType;
}) {
  const [status, setStatus] = useState(user.status);
  const [note, setNote] = useState(adminNote?.note || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasChanged = status !== user.status;

  async function handleSave() {
    if (hasChanged) {
      setError(null);
      setLoading(true);
      const updateData = { status, note };
      const { updatedUser, error } = await updateTeamMember(
        user._id,
        updateData,
      );
      if (error !== null) {
        setError(error);
        setLoading(false);
        return;
      }
      setTeamMembers((prev) =>
        prev.map((member) => (member._id === user._id ? updatedUser : member)),
      );
      setLoading(false);
    }
    closeModal();
  }

  return (
    <div
      className={`absolute left-[50%] top-[50%] w-[90%] max-w-lg -translate-x-[50%] -translate-y-[50%] rounded-md bg-white p-4 text-left ${open ? "visible scale-100 opacity-100" : "invisible scale-90 opacity-0"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-lg font-semibold">
        Manage User: {getFullname(user)}
      </h3>
      <div className="grid gap-4 py-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="status">Status</label>
          <Select
            placeholder="Select user status"
            value={status}
            onChange={(value) => setStatus(value as UserStatusType)}
          >
            <Select.Content>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Suspended">Suspended</Select.Option>
              <Select.Option value="Banned">Banned</Select.Option>
            </Select.Content>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="notes">Admin Notes</label>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            id="notes"
            rows={3}
            placeholder="Add any relevant notes about this user"
          />
          {error && <Error error={error} />}
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          disabled={loading}
          onClick={() => {
            setNote(adminNote?.note || "");
            closeModal();
          }}
          variant="outline"
        >
          Cancel
        </Button>
        <Button disabled={loading} onClick={handleSave}>
          {loading ? (
            <>
              <LoadingIndicator /> Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
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

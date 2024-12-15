import { VideoType } from "@/db/models/GroupClass";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { XIcon } from "lucide-react";

export default function RemoveVideoModal({
  video,
  closeModal,
}: {
  video: VideoType | null;
  closeModal(): void;
}) {
  function handleRemoveVideo() {
    closeModal();
  }

  const [reason, setReason] = useState("");

  return (
    <div
      className={`absolute left-[50%] top-[50%] w-[90%] max-w-lg -translate-x-[50%] -translate-y-[50%] rounded-md bg-white p-4 ${video ? "visible scale-100 opacity-100" : "invisible scale-90 opacity-0"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="font-semibold">Confirm Video Removal: {video?.title}</h3>
      <div className="grid gap-4 py-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="removalReason">Reason for Removal</label>
          <Textarea
            id="removalReason"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Please provide a reason for removing this video"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleRemoveVideo}>
          Confirm Removal
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

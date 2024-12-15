import { VideoType } from "@/db/models/GroupClass";
import React from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

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

  return (
    <div
      className={`absolute left-[50%] top-[50%] w-[90%] max-w-lg -translate-x-[50%] -translate-y-[50%] rounded-md bg-white p-4 ${video ? "visible scale-100 opacity-100" : "invisible scale-90 opacity-0"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="font-semibold">Confirm Video Removal: {video?.title}</h3>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="removalReason" className="text-right">
            Reason for Removal
          </label>
          <Textarea
            id="removalReason"
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
    </div>
  );
}

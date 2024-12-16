import { VideoType } from "@/db/models/GroupClass";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { XIcon } from "lucide-react";
import { removeVideo } from "@/actions/adminActions";
import LoadingIndicator from "../LoadingIndicator";
import Error from "../AuthError";

export default function RemoveVideoModal({
  open,
  video,
  liveClassId,
  closeModal,
  setOrganizationVideos,
}: {
  open: boolean;
  video: VideoType;
  liveClassId: string;
  closeModal(): void;
  setOrganizationVideos: React.Dispatch<React.SetStateAction<VideoType[]>>;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  async function handleRemoveVideo() {
    setLoading(true);
    setError(null);
    const { error } = await removeVideo(video._id, liveClassId);
    if (error !== null) {
      setError(error);
    } else {
      setOrganizationVideos((prev) =>
        prev.filter((vid) => vid._id !== video._id),
      );
      closeModal();
    }
    setLoading(false);
  }

  return (
    <div
      className={`absolute left-[50%] top-[50%] w-[90%] max-w-md -translate-x-[50%] -translate-y-[50%] rounded-md bg-white p-4 text-left ${open ? "visible scale-100 opacity-100" : "invisible scale-90 opacity-0"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-lg font-semibold">
        Confirm Video Removal: {video.title}
      </h3>
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
          {error && <Error error={error} />}
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button disabled={loading} variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          disabled={loading || !reason.trim()}
          variant="destructive"
          onClick={handleRemoveVideo}
        >
          {loading ? (
            <>
              <LoadingIndicator /> Removing...
            </>
          ) : (
            "Confirm Removal"
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

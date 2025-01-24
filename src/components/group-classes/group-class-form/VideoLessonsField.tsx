import Error from "@/components/AuthError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowBigDown, ArrowBigUp, Trash2Icon } from "lucide-react";
import { VideoDataType } from "../CreateClassForm";
import { nanoid } from "nanoid";

export default function VideoLessonsField({
  videoLessons,
  setVideoLessons,
  videoError,
  handleChangeVideo,
  required,
}: {
  videoLessons: VideoDataType[];
  setVideoLessons(value: VideoDataType[]): void;
  videoError: string;
  handleChangeVideo(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ): Promise<void>;
  required?: boolean;
}) {
  function handleLoadedMetadata(
    e: React.SyntheticEvent<HTMLVideoElement, Event>,
    id: string,
  ) {
    const duration = e.currentTarget?.duration;
    if (duration) {
      setVideoLessons(
        videoLessons.map((vid) =>
          vid._id === id ? { ...vid, duration } : vid,
        ),
      );
    }
  }

  function handleUpdateVideoLessonTitle(value: string, id: string) {
    setVideoLessons(
      videoLessons.map((vid) =>
        vid._id === id ? { ...vid, title: value } : vid,
      ),
    );
  }

  function deleteVideoLesson(id: string) {
    setVideoLessons(videoLessons.filter((vid) => vid._id !== id));
  }

  function moveVideoLessonUp(id: string) {
    const videoLessonIndex = videoLessons.findIndex(
      (video) => video._id === id,
    );
    if (videoLessonIndex <= 0) return;
    const newVideoLessons = [...videoLessons];
    const [videoLesson] = newVideoLessons.splice(videoLessonIndex, 1);
    newVideoLessons.splice(videoLessonIndex - 1, 0, videoLesson);
    setVideoLessons(newVideoLessons);
  }

  function moveVideoLessonDown(id: string) {
    const videoLessonIndex = videoLessons.findIndex(
      (video) => video._id === id,
    );
    if (videoLessonIndex >= videoLessons.length - 1) return;
    const newVideoLessons = [...videoLessons];
    const [videoLesson] = newVideoLessons.splice(videoLessonIndex, 1);
    newVideoLessons.splice(videoLessonIndex + 1, 0, videoLesson);
    setVideoLessons(newVideoLessons);
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium">Video Lessons</h3>
      {videoLessons.map((videoLesson) => (
        <div
          key={videoLesson._id}
          className="flex flex-col gap-2 sm:flex-row sm:items-center"
        >
          <Label
            htmlFor={`video-upload-${videoLesson._id}`}
            className="flex-center relative aspect-video w-full cursor-pointer overflow-hidden rounded-sm border bg-zinc-50 duration-200 hover:bg-zinc-100 sm:w-40"
          >
            {videoLesson.url ? (
              <>
                <video
                  src={videoLesson.url}
                  onLoadedMetadata={(e) =>
                    handleLoadedMetadata(e, videoLesson._id)
                  }
                />
                <span className="absolute bottom-1 right-1 rounded-sm bg-black/50 p-1 px-2 text-xs text-white">
                  Change video
                </span>
              </>
            ) : (
              <span className="text-xs text-accent-gray-300">
                Select a video
              </span>
            )}
          </Label>
          <div className="flex flex-1 flex-col gap-2">
            <Input
              type="text"
              placeholder="Video title"
              required={required}
              value={videoLesson.title}
              onChange={(e) =>
                handleUpdateVideoLessonTitle(e.target.value, videoLesson._id)
              }
            />
            <Input
              id={`video-upload-${videoLesson._id}`}
              name={`videoUpload-${videoLesson._id}`}
              onChange={(e) => handleChangeVideo(e, videoLesson._id)}
              type="file"
              accept="video/*"
              required={required}
              className="hidden text-sm"
            />
            <div className="flex gap-4">
              <div className="flex flex-1 gap-4">
                <Button
                  type="button"
                  variant={"outline"}
                  className="sm:flex-0 flex-1 p-1.5"
                  onClick={() => moveVideoLessonUp(videoLesson._id)}
                >
                  <ArrowBigUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant={"outline"}
                  className="sm:flex-0 flex-1 p-1.5"
                  onClick={() => moveVideoLessonDown(videoLesson._id)}
                >
                  <ArrowBigDown className="h-4 w-4" />
                </Button>
              </div>
              <Button
                type="button"
                variant={"outline"}
                className="sm:flex-0 flex-1 p-1.5"
                onClick={() => deleteVideoLesson(videoLesson._id)}
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {videoError && <Error error={videoError} />}
        </div>
      ))}
      <Button
        type="button"
        variant={"outline"}
        className="mt-4"
        onClick={() =>
          setVideoLessons([
            ...videoLessons,
            { _id: nanoid(8), title: "", url: "", duration: 0 },
          ])
        }
      >
        Add {videoLessons.length > 0 ? "another" : "video"}
      </Button>
    </div>
  );
}

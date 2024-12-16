"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowBigDown,
  ArrowBigUp,
  CalendarIcon,
  Trash2Icon,
} from "lucide-react";
import { format } from "date-fns";
import { createClass } from "@/actions/groupClassActions";
import { UserType } from "@/db/models/User";
import Image from "next/image";
import placeholderThumbnail from "@/assets/placeholder-thumbnail.png";
import {
  getDatesBetween,
  resizeImage,
  uploadImageClient,
  uploadVideosClient,
} from "@/lib/utils";
import LoadingIndicator from "../LoadingIndicator";
import { nanoid } from "nanoid";
import { RepeatFrequencyType } from "@/db/models/GroupClass";
import Error from "../AuthError";
import BackButton from "../dashboard/BackButton";

export default function CreateClassForm({
  assistantCoaches,
}: {
  assistantCoaches: UserType[];
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseType, setCourseType] = useState<"live" | "video" | undefined>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startTime, setStartTime] = useState<{ hours: string; mins: string }>({
    hours: "10",
    mins: "00",
  });
  const [duration, setDuration] = useState("");
  const [customDuration, setCustomDuration] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [repeatFrequency, setRepeatFrequency] = useState<RepeatFrequencyType>();
  const [loading, setLoading] = useState({ status: false, message: "" });
  const [error, setError] = useState("");
  const [videoError, setVideoError] = useState("");
  const [thumbnailError, setThumbnailError] = useState("");
  const [coaches, setCoaches] = useState<string[]>(
    assistantCoaches
      .filter((user) => user.role === "Head Coach")
      .map((user) => user._id),
  );
  const [thumbnail, setThumbnail] = useState("");
  const [videoLessons, setVideoLessons] = useState<
    { _id: string; title: string; url: string; duration: number }[]
  >([]);
  const [skillLevels, setSkillLevels] = useState<string[]>([]);
  const [totalSpots, setTotalSpots] = useState("");
  const [price, setPrice] = useState("");

  async function handleChangeThumbnail(e: React.ChangeEvent<HTMLInputElement>) {
    if (!(e.target.files && e.target.files.length)) {
      return;
    }
    const imageFile = e.target.files[0];
    if (imageFile.size > 4194304) {
      setThumbnailError(
        "File too large: Please select an image less than 4mb in size",
      );
      return;
    }
    const resizedImage = await resizeImage(imageFile, 800);
    if (!resizedImage) return;
    setThumbnail(resizedImage);
  }

  async function handleChangeVideo(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) {
    setVideoError("");
    if (!(e.target.files && e.target.files.length)) {
      return;
    }
    const videoFile = e.target.files[0];
    if (videoFile.size > 4194304) {
      setVideoError(
        "File too large: Please select a video less than 4mb in size",
      );
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(videoFile);
    fileReader.onload = async (e) => {
      if (!(e.target && e.target.result)) return;
      const videoDataUrl = e.target.result as string;
      setVideoLessons((prev) =>
        prev.map((vid) =>
          vid._id === id ? { ...vid, url: videoDataUrl } : vid,
        ),
      );
    };
  }

  function handleLoadedMetadata(
    e: React.SyntheticEvent<HTMLVideoElement, Event>,
    id: string,
  ) {
    const duration = e.currentTarget?.duration;
    if (duration) {
      setVideoLessons((prev) =>
        prev.map((vid) => (vid._id === id ? { ...vid, duration } : vid)),
      );
    }
  }

  function handleUpdateVideoLessonTitle(value: string, id: string) {
    setVideoLessons((prev) =>
      prev.map((vid) => (vid._id === id ? { ...vid, title: value } : vid)),
    );
  }

  function deleteVideoLesson(id: string) {
    setVideoLessons((prev) => prev.filter((vid) => vid._id !== id));
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

  function toggleCoaches(coachId: string) {
    if (coaches.includes(coachId)) {
      setCoaches(coaches.filter((coach) => coach !== coachId));
    } else {
      setCoaches([...coaches, coachId]);
    }
  }

  function toggleSkillLevel(level: "beginner" | "intermediate" | "advanced") {
    if (skillLevels.includes(level)) {
      setSkillLevels(skillLevels.filter((skillLevel) => skillLevel !== level));
    } else {
      setSkillLevels([...skillLevels, level]);
    }
  }

  function clearLiveClassFields() {
    setStartDate(undefined);
    setEndDate(undefined);
    setStartTime({ hours: "10", mins: "00" });
    setDuration("");
    setCustomDuration("");
    setRepeatFrequency(undefined);
    setTotalSpots("");
    setIsRecurring(false);
  }

  const formFieldVacant =
    !Boolean(title.trim()) ||
    !Boolean(description.trim()) ||
    !Boolean(skillLevels.length) ||
    !Boolean(courseType?.trim()) ||
    !Boolean(price.trim());
  const videoFieldVacant = !Boolean(
    videoLessons.length &&
      videoLessons.some((vid) => vid.url.trim() && vid.title.trim()),
  );
  const liveClassFieldVacant =
    !Boolean(startDate) ||
    !Boolean(endDate) ||
    !Boolean(startTime.hours) ||
    !Boolean(startTime.mins) ||
    (isRecurring && !Boolean(repeatFrequency?.trim())) ||
    (!Boolean(duration.trim()) && !Boolean(customDuration.trim())) ||
    !Boolean(totalSpots.trim());

  const cannotSubmit =
    loading.status ||
    formFieldVacant ||
    (courseType === "video" && videoFieldVacant) ||
    (courseType === "live" && liveClassFieldVacant);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isLiveClass = courseType === "live";
    if (isLiveClass && (!startDate || !endDate)) return;
    setLoading((prev) => ({ ...prev, status: true }));
    setError("");
    if (cannotSubmit) return;

    const classData = {
      title,
      description,
      thumbnail,
      coaches,
      courseType,
      startDate,
      endDate,
      startTime,
      duration: Number(duration) || 0,
      customDuration: Number(customDuration) || 0,
      isRecurring,
      repeatFrequency,
      totalSpots: Number(totalSpots) || 0,
      skillLevels,
      videos: videoLessons.map((vid) => ({
        title: vid.title,
        duration: vid.duration,
        url: vid.url,
      })),
      price: Number(price),
    };

    // Upload thumbnail
    setLoading({ message: "Uploading Thumbnail", status: true });
    if (!classData.thumbnail)
      setError("Please select an image for the thumbnail");

    const { url, error: uploadThumbnailError } = await uploadImageClient(
      classData.thumbnail,
    );
    if (uploadThumbnailError !== null) {
      setError(uploadThumbnailError);
      return;
    }
    classData.thumbnail = url;

    // Upload videos
    setLoading({ message: "Uploading Videos", status: true });
    if (!classData.thumbnail)
      setError("Please select an image for the thumbnail");

    const { uploadedVideos, error: uploadVideoError } =
      await uploadVideosClient(classData.videos);

    if (uploadVideoError !== null) {
      setError(uploadVideoError);
      return;
    }
    classData.videos = uploadedVideos;

    setLoading({ message: "", status: true });
    const data = await createClass(classData);
    if (data?.error) setError(data.error);

    setLoading({ message: "", status: false });
  }

  return (
    <div className="mx-auto w-[90%] max-w-3xl py-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Create Class</h1>
        <BackButton />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">Thumbnail</h3>
          <div className="flex-center relative aspect-video w-full overflow-hidden rounded-md border">
            <Image
              src={thumbnail || placeholderThumbnail}
              alt="Thumbnail"
              fill
              sizes="1024px"
              priority
              className="absolute h-full w-full object-cover"
            />
          </div>
          <Input
            id="thumbnail"
            name="thumbnail"
            onChange={handleChangeThumbnail}
            type="file"
            accept="image/*"
            required
            className="text-sm"
          />
          {thumbnailError && <Error error={thumbnailError} />}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your course..."
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Coach(es)</Label>
          <div className="mt-2 flex flex-wrap gap-x-8 gap-y-4">
            {assistantCoaches.map((user) => (
              <div
                onClick={() => {
                  if (user.role === "Head Coach") return;
                  toggleCoaches(user._id);
                }}
                key={user._id}
                className={`flex cursor-pointer items-center gap-2 rounded-md p-2 px-4 duration-200 ${
                  coaches.includes(user._id) ? "bg-green-50" : "grayscale"
                }`}
              >
                <div className="relative h-10 w-10 overflow-hidden rounded-full font-medium">
                  <div className="flex-center absolute h-full w-full bg-accent-gray-100">
                    {user.firstName[0] + user.lastName[0]}
                  </div>
                  <Image
                    src={user.profilePicture}
                    alt={user.firstName}
                    fill
                    sizes="160px"
                    className="absolute h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-accent-black">
                    {user.firstName} {user.lastName}
                  </h4>
                  <p className="text-xs text-accent-gray-300">{user.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Skill Level</Label>
          <div className="mt-2 flex flex-col space-y-2">
            <Label
              htmlFor={"beginner"}
              className="flex items-center gap-2 capitalize"
            >
              <Checkbox
                id={"beginner"}
                checked={skillLevels.includes("beginner")}
                onCheckedChange={() => toggleSkillLevel("beginner")}
              />
              Beginner
            </Label>
            <Label
              htmlFor={"intermediate"}
              className="flex items-center gap-2 capitalize"
            >
              <Checkbox
                id={"intermediate"}
                checked={skillLevels.includes("intermediate")}
                onCheckedChange={() => toggleSkillLevel("intermediate")}
              />
              Intermediate
            </Label>
            <Label
              htmlFor={"advanced"}
              className="flex items-center gap-2 capitalize"
            >
              <Checkbox
                id={"advanced"}
                checked={skillLevels.includes("advanced")}
                onCheckedChange={() => toggleSkillLevel("advanced")}
              />
              Advanced
            </Label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Course Type</Label>
          <RadioGroup
            name="courseType"
            value={courseType}
            onValueChange={(value: "live" | "video") => {
              if (value === "live") setVideoLessons([]);
              if (value === "video") clearLiveClassFields();
              setCourseType(value);
            }}
            className="mt-2 flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="live" id="live-course" />
              <Label htmlFor="live-course">Live Class</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="video" id="video-course" />
              <Label htmlFor="video-course">Video Course</Label>
            </div>
          </RadioGroup>
        </div>

        {courseType === "live" && (
          <>
            <div className="space-y-2">
              <Label>Course Dates</Label>
              <div className="flex flex-wrap gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex items-center gap-2">
                      Start Date:
                      <Button variant="outline" type="button">
                        {startDate ? format(startDate, "PPP") : "Select Date"}
                        <CalendarIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      fromDate={new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex items-center gap-2">
                      End Date:
                      <Button
                        variant="outline"
                        type="button"
                        disabled={!startDate}
                      >
                        {endDate ? format(endDate, "PPP") : "Select Date"}
                        <CalendarIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      fromDate={startDate}
                      disabled={!startDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                name="startTime"
                value={`${startTime.hours}:${startTime.mins}`}
                onChange={(e) =>
                  setStartTime({
                    hours: e.target.value.split(":")[0],
                    mins: e.target.value.split(":")[1],
                  })
                }
                type="time"
                required
                className="w-fit"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Lesson Duration (minutes)</Label>
              <RadioGroup
                name="lessonDuration"
                value={duration}
                onValueChange={(value) => {
                  setDuration(value);
                  if (value !== "custom") setCustomDuration("");
                }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-2">
                  {["15", "30", "45", "60"].map((duration) => (
                    <div key={duration} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={duration}
                        id={`duration-${duration}`}
                      />
                      <Label
                        htmlFor={`duration-${duration}`}
                      >{`${duration} minutes`}</Label>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {["75", "90", "120", "custom"].map((duration) => (
                    <div key={duration} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={duration}
                        id={`duration-${duration}`}
                      />
                      <Label htmlFor={`duration-${duration}`}>
                        {duration === "custom"
                          ? "Custom"
                          : `${duration} minutes`}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
              {duration === "custom" && (
                <Input
                  type="number"
                  min="1"
                  name="customDuration"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  placeholder="Enter custom duration"
                  className="mt-2 w-full"
                  required
                />
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="recurring"
                checked={isRecurring}
                onCheckedChange={setIsRecurring}
              />
              <Label htmlFor="recurring">Recurring Course</Label>
            </div>

            {isRecurring && (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="repeatFrequency">Repeat</Label>
                  <Select
                    name="repeatFrequency"
                    value={repeatFrequency}
                    onValueChange={(value) =>
                      setRepeatFrequency(value as RepeatFrequencyType)
                    }
                  >
                    <SelectTrigger id="repeatFrequency">
                      <SelectValue placeholder="Select repeat option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Every Day</SelectItem>
                      <SelectItem value="weekly">Every Week</SelectItem>
                      <SelectItem value="bi-weekly">Every 2 Weeks</SelectItem>
                      <SelectItem value="monthly">Every Month</SelectItem>
                      <SelectItem value="yearly">Every Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {startDate && endDate && repeatFrequency && (
                  <div>
                    <h3 className="mb-2 font-medium">Class Sessions</h3>
                    <ul className="grid grid-cols-2 gap-4 gap-y-2 text-sm sm:grid-cols-3 md:grid-cols-4">
                      {getDatesBetween(startDate, endDate, repeatFrequency).map(
                        (date) => (
                          <li
                            key={date.getTime()}
                            className="list-inside list-disc text-zinc-700"
                          >
                            {date.toDateString()}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
              </>
            )}
            <div className="flex flex-col gap-2">
              <Label htmlFor="totalSpots">Total Spots</Label>
              <Input
                id="totalSpots"
                name="totalSpots"
                value={totalSpots}
                onChange={(e) => setTotalSpots(e.target.value)}
                type="number"
                min="1"
                required
              />
            </div>
          </>
        )}

        {courseType === "video" && (
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
                    required
                    value={videoLesson.title}
                    onChange={(e) =>
                      handleUpdateVideoLessonTitle(
                        e.target.value,
                        videoLesson._id,
                      )
                    }
                  />
                  <Input
                    id={`video-upload-${videoLesson._id}`}
                    name={`videoUpload-${videoLesson._id}`}
                    onChange={(e) => handleChangeVideo(e, videoLesson._id)}
                    type="file"
                    accept="video/*"
                    required
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
                setVideoLessons((prev) => [
                  ...prev,
                  { _id: nanoid(8), title: "", url: "", duration: 0 },
                ])
              }
            >
              Add {videoLessons.length > 0 ? "another" : "video"}
            </Button>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            min="0"
            step="0.01"
            required
          />
          {error.trim() !== "" && <Error error={error} />}
        </div>

        <Button
          disabled={cannotSubmit}
          type="submit"
          className="flex-center bg-green-500 text-white hover:bg-green-600"
        >
          {loading.status ? (
            <>
              <LoadingIndicator /> {loading.message || "Creating"}...
            </>
          ) : (
            "Create Class"
          )}
        </Button>
      </form>
    </div>
  );
}

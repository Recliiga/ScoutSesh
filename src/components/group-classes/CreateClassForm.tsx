"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClass, scheduleMeeting } from "@/actions/groupClassActions";
import { UserType } from "@/db/models/User";
import placeholderThumbnail from "@/assets/placeholder-thumbnail.png";
import {
  getDatesBetween,
  resizeImage,
  uploadImageClient,
  uploadVideosClient,
} from "@/lib/utils";
import LoadingIndicator from "../LoadingIndicator";
import { RepeatFrequencyType } from "@/db/models/GroupClass";
import BackButton from "../dashboard/BackButton";
import { calendar_v3 } from "googleapis";
import {
  ClassSessions,
  CoachesField,
  CourseDateField,
  CourseDurationField,
  CourseTimeField,
  CourseTypeField,
  DescriptionField,
  PriceField,
  RecurringField,
  RepeatFrequencyField,
  SkillLevelField,
  ThumbnailField,
  TitleField,
  TotalSpotsField,
  VideoLessonsField,
} from "./group-class-form";

export type VideoDataType = {
  _id: string;
  title: string;
  url: string;
  duration: number;
};

export default function CreateClassForm({
  assistantCoaches,
  user,
}: {
  assistantCoaches: UserType[];
  user: UserType;
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
  const [videoLessons, setVideoLessons] = useState<VideoDataType[]>([]);
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
    try {
      const resizedImage = await resizeImage(imageFile, 800);
      if (!resizedImage) return;
      setThumbnail(resizedImage);
    } catch {
      setThumbnailError("Error resizing image");
    }
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

  function handleChangeCourseType(value: "live" | "video") {
    if (value === "live") setVideoLessons([]);
    if (value === "video") clearLiveClassFields();
    setCourseType(value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isLiveClass = courseType === "live";
    if (isLiveClass && (!startDate || !endDate)) return;

    if (cannotSubmit) return;

    setLoading((prev) => ({ ...prev, status: true }));
    setError("");

    let meetingData: calendar_v3.Schema$Event | undefined = undefined;

    if (courseType === "live") {
      if (!startDate || !endDate) return;

      setLoading({ message: "Scheduling Meetings", status: true });

      const meetingStartTime = new Date(startDate);
      meetingStartTime.setHours(
        Number(startTime.hours),
        Number(startTime.mins),
      );
      const meetingEndTime = meetingStartTime;
      meetingEndTime.setMinutes(
        meetingStartTime.getMinutes() + Number(duration),
      );

      const { event, error } = await scheduleMeeting({
        title,
        description,
        startTime: meetingStartTime,
        endTime: meetingEndTime,
        recurring: true,
        userId: user._id,
      });
      if (error !== null) {
        setLoading({ message: "", status: false });
        setError(error);
        return;
      }
      meetingData = event;
    }

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
      meetingData,
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
    <div className="mx-auto w-[90%] max-w-3xl flex-1 py-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Create Class</h1>
        <BackButton />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <TitleField title={title} setTitle={setTitle} />

        <ThumbnailField
          handleChangeThumbnail={handleChangeThumbnail}
          placeholderThumbnail={placeholderThumbnail}
          thumbnail={thumbnail}
          thumbnailError={thumbnailError}
        />

        <DescriptionField
          description={description}
          setDescription={setDescription}
        />

        <CoachesField
          assistantCoaches={assistantCoaches}
          coaches={coaches}
          toggleCoaches={toggleCoaches}
        />

        <SkillLevelField
          skillLevels={skillLevels}
          toggleSkillLevel={toggleSkillLevel}
        />

        <CourseTypeField
          courseType={courseType}
          handleChangeCourseType={handleChangeCourseType}
        />

        {courseType === "live" ? (
          <>
            <CourseDateField
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />

            <CourseTimeField
              startTime={startTime}
              setStartTime={setStartTime}
            />

            <CourseDurationField
              customDuration={customDuration}
              duration={duration}
              setCustomDuration={setCustomDuration}
              setDuration={setDuration}
            />

            <RecurringField
              isRecurring={isRecurring}
              setIsRecurring={setIsRecurring}
            />

            {isRecurring && (
              <>
                <RepeatFrequencyField
                  repeatFrequency={repeatFrequency}
                  setRepeatFrequency={setRepeatFrequency}
                />

                {startDate && endDate && repeatFrequency && (
                  <ClassSessions
                    dates={getDatesBetween(startDate, endDate, repeatFrequency)}
                  />
                )}
              </>
            )}
            <TotalSpotsField
              totalSpots={totalSpots}
              setTotalSpots={setTotalSpots}
            />
          </>
        ) : null}

        {courseType === "video" && (
          <VideoLessonsField
            handleChangeVideo={handleChangeVideo}
            setVideoLessons={setVideoLessons}
            videoError={videoError}
            videoLessons={videoLessons}
          />
        )}

        <PriceField price={price} setPrice={setPrice} error={error} />

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

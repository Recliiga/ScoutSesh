"use client";
import React, { useReducer, useState } from "react";
import { Button } from "@/components/ui/button";
import { updateClass, updateMeeting } from "@/actions/groupClassActions";
import { UserType } from "@/db/models/User";
import placeholderThumbnail from "@/assets/placeholder-thumbnail.png";
import {
  getDatesBetween,
  resizeImage,
  uploadImageClient,
  uploadVideosClient,
} from "@/lib/utils";
import LoadingIndicator from "../LoadingIndicator";
import {
  GroupClassType,
  RepeatFrequencyType,
  SkillLevelType,
  VideoType,
} from "@/db/models/GroupClass";
import BackButton from "../dashboard/BackButton";
import { calendar_v3 } from "googleapis";
import {
  ClassSessions,
  CoachesField,
  CourseDurationField,
  CourseTimeField,
  CourseTypeField,
  DescriptionField,
  EndDateField,
  PriceField,
  RecurringField,
  RepeatFrequencyField,
  SkillLevelField,
  StartDateField,
  ThumbnailField,
  TitleField,
  TotalSpotsField,
  VideoLessonsField,
} from "./group-class-form";
import Link from "next/link";

export type VideoDataType = {
  _id: string;
  title: string;
  url: string;
  duration: number;
};

export type ClassDataType = {
  title: string;
  description: string;
  courseType: "live" | "video";
  startDate: Date;
  endDate?: Date;
  startTime: { hours: number; mins: number };
  duration: string;
  customDuration: string;
  isRecurring: boolean;
  repeatFrequency?: RepeatFrequencyType;
  coaches: string[];
  thumbnail: string;
  videoLessons: VideoDataType[];
  videos: { title: string; duration: number; url: string }[];
  skillLevels: SkillLevelType[];
  totalSpots: string;
  price: string;
  meetingData?: calendar_v3.Schema$Event;
};

type ActionType<T extends keyof ClassDataType> = {
  type: T;
  payload: ClassDataType[T];
};

function reducer<K extends keyof ClassDataType>(
  state: ClassDataType,
  action: ActionType<K>,
): ClassDataType {
  return { ...state, [action.type]: action.payload };
}

const durationList = ["15", "30", "45", "custom"];

export default function EditClassForm({
  assistantCoaches,
  course,
  user,
}: {
  assistantCoaches: UserType[];
  course: GroupClassType;
  user: UserType;
}) {
  const initialState: ClassDataType = {
    title: course.title,
    description: course.description,
    courseType: course.courseType,
    startDate: course.startDate,
    endDate: course.endDate,
    startTime: course.startTime,
    duration: durationList.includes(course.duration.toString())
      ? course.duration.toString()
      : "custom",
    customDuration: course.duration.toString(),
    isRecurring: course.isRecurring,
    repeatFrequency: course.repeatFrequency,
    coaches: course.coaches.map((coach) => coach._id),
    thumbnail: course.thumbnail,
    videoLessons: course.videos,
    videos: course.videos,
    skillLevels: course.skillLevels,
    totalSpots: course.totalSpots.toString(),
    price: course.price.toString(),
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    title,
    description,
    courseType,
    startDate,
    endDate,
    startTime,
    duration,
    customDuration,
    isRecurring,
    repeatFrequency,
    coaches,
    thumbnail,
    videoLessons,
    skillLevels,
    totalSpots,
    price,
  } = state;

  function updateField<T extends keyof ClassDataType>(field: T) {
    return (value: ClassDataType[T]) => {
      dispatch({ type: field, payload: value });
    };
  }

  const [loading, setLoading] = useState({ status: false, message: "" });
  const [error, setError] = useState("");
  const [videoError, setVideoError] = useState("");
  const [thumbnailError, setThumbnailError] = useState("");

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
      dispatch({ type: "thumbnail", payload: resizedImage });
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
      dispatch({
        type: "videoLessons",
        payload: videoLessons.map((vid) =>
          vid._id === id ? { ...vid, url: videoDataUrl } : vid,
        ),
      });
    };
  }

  function toggleCoaches(coachId: string) {
    if (coaches.includes(coachId)) {
      dispatch({
        type: "coaches",
        payload: coaches.filter((coach) => coach !== coachId),
      });
    } else {
      dispatch({ type: "coaches", payload: [...coaches, coachId] });
    }
  }

  function toggleSkillLevel(level: "beginner" | "intermediate" | "advanced") {
    if (skillLevels.includes(level)) {
      dispatch({
        type: "skillLevels",
        payload: skillLevels.filter((skillLevel) => skillLevel !== level),
      });
    } else {
      dispatch({ type: "skillLevels", payload: [...skillLevels, level] });
    }
  }

  function clearLiveClassFields() {
    dispatch({ type: "startDate", payload: undefined });
    dispatch({ type: "endDate", payload: undefined });
    dispatch({ type: "startTime", payload: { hours: 10, mins: 0 } });
    dispatch({ type: "duration", payload: "" });
    dispatch({ type: "customDuration", payload: "" });
    dispatch({ type: "repeatFrequency", payload: "" });
    dispatch({ type: "totalSpots", payload: "" });
    dispatch({ type: "isRecurring", payload: false });
  }

  function clearRecurringFields() {
    dispatch({ type: "endDate", payload: undefined });
    dispatch({ type: "repeatFrequency", payload: "" });
  }

  const formFieldVacant =
    !title.trim() ||
    !description.trim() ||
    skillLevels.length <= 0 ||
    !courseType?.trim() ||
    !price.trim();

  const videoFieldVacant = !Boolean(
    videoLessons.length &&
      videoLessons.some((vid) => vid.url.trim() && vid.title.trim()),
  );

  const liveClassFieldVacant =
    !startDate ||
    (isRecurring && !endDate) ||
    (isRecurring && !repeatFrequency) ||
    (!duration.trim() && !customDuration.trim()) ||
    !totalSpots.trim();

  const cannotSubmit =
    loading.status ||
    formFieldVacant ||
    (courseType === "video" && videoFieldVacant) ||
    (courseType === "live" && liveClassFieldVacant) ||
    (!duration && !customDuration);

  function handleChangeCourseType(value: "live" | "video") {
    if (value === "live") dispatch({ type: "videoLessons", payload: [] });
    if (value === "video") clearLiveClassFields();
    dispatch({ type: "courseType", payload: value });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (cannotSubmit) return;

    setLoading((prev) => ({ ...prev, status: true }));
    setError("");

    const meetingDuration =
      duration === "custom" ? Number(customDuration) : Number(duration);

    type MeetingDataType = calendar_v3.Schema$Event | undefined;
    const meetingData = course.meetingData;

    const classData = {
      userId: course.user._id,
      title,
      description,
      thumbnail,
      coaches,
      courseType,
      startDate,
      endDate,
      startTime,
      duration: meetingDuration,
      isRecurring,
      repeatFrequency,
      totalSpots: Number(totalSpots),
      skillLevels,
      meetingData: meetingData as MeetingDataType,
      videos: videoLessons.map((vid) => ({
        title: vid.title,
        duration: vid.duration,
        url: vid.url,
      })) as VideoType[],
      price: Number(price),
    };

    if (courseType === "live" && course.meetingData?.id) {
      if (!startDate || (isRecurring && !endDate)) return;

      setLoading({ message: "Scheduling Meetings", status: true });

      const meetingStartTime = new Date(startDate);
      meetingStartTime.setHours(startTime.hours, startTime.mins);
      const meetingEndTime = new Date(meetingStartTime);
      meetingEndTime.setMinutes(
        meetingStartTime.getMinutes() + meetingDuration,
      );

      const { event, error } = await updateMeeting(course.meetingData.id, {
        title,
        description,
        startTime: meetingStartTime,
        endTime: meetingEndTime,
        repeatFrequency,
        repeatCount:
          endDate && repeatFrequency
            ? getDatesBetween(startDate, endDate, repeatFrequency).length
            : undefined,
        userId: course.user._id,
      });
      if (error !== null) {
        setError(error);
        setLoading({ message: "", status: false });
        return;
      }
      classData.meetingData = event;
    }

    // Upload thumbnail
    setLoading({ message: "Uploading Thumbnail", status: true });
    if (!classData.thumbnail)
      setError("Please select an image for the thumbnail");

    const { url, error: uploadThumbnailError } = await uploadImageClient(
      classData.thumbnail,
    );
    if (uploadThumbnailError !== null) {
      setError(uploadThumbnailError);
      setLoading({ message: "", status: false });
      return;
    }
    classData.thumbnail = url;

    // Upload videos
    if (courseType === "video") {
      setLoading({ message: "Uploading Videos", status: true });

      const { uploadedVideos, error: uploadVideoError } =
        await uploadVideosClient(classData.videos);

      if (uploadVideoError !== null) {
        setError(uploadVideoError);
        setLoading({ message: "", status: false });
        return;
      }
      classData.videos = uploadedVideos as VideoType[];
    }

    setLoading({ message: "", status: true });

    const data = await updateClass(course._id, classData);
    if (data?.error) setError(data.error);

    setLoading({ message: "", status: false });
  }

  return (
    <div className="mx-auto w-[90%] max-w-3xl flex-1 py-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Edit Class</h1>
        <BackButton />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <TitleField title={title} setTitle={updateField("title")} />

        <ThumbnailField
          handleChangeThumbnail={handleChangeThumbnail}
          placeholderThumbnail={placeholderThumbnail}
          thumbnail={thumbnail}
          thumbnailError={thumbnailError}
        />

        <DescriptionField
          description={description}
          setDescription={updateField("description")}
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
          user.googleTokens ? (
            <>
              <StartDateField
                startDate={startDate}
                setStartDate={updateField("startDate")}
              />

              <CourseTimeField
                startTime={startTime}
                setStartTime={updateField("startTime")}
              />

              <CourseDurationField
                customDuration={customDuration}
                duration={duration}
                setCustomDuration={updateField("customDuration")}
                setDuration={updateField("duration")}
              />

              <RecurringField
                isRecurring={isRecurring}
                setIsRecurring={updateField("isRecurring")}
                clearRecurringFields={clearRecurringFields}
              />

              {isRecurring && (
                <>
                  <EndDateField
                    startDate={startDate}
                    endDate={endDate}
                    setEndDate={updateField("endDate")}
                  />

                  <RepeatFrequencyField
                    repeatFrequency={repeatFrequency}
                    setRepeatFrequency={updateField("repeatFrequency")}
                  />

                  {startDate && endDate && repeatFrequency && (
                    <ClassSessions
                      dates={getDatesBetween(
                        startDate,
                        endDate,
                        repeatFrequency,
                      )}
                    />
                  )}
                </>
              )}
              <TotalSpotsField
                totalSpots={totalSpots}
                setTotalSpots={updateField("totalSpots")}
              />
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Please connect your Google account in your profile settings to
              schedule live classes. Visit your{" "}
              <Link
                href="/dashboard/profile"
                className="text-accent-green-100 underline"
              >
                profile
              </Link>{" "}
              to set it up.
            </p>
          )
        ) : null}

        {courseType === "video" && (
          <VideoLessonsField
            handleChangeVideo={handleChangeVideo}
            setVideoLessons={updateField("videoLessons")}
            videoError={videoError}
            videoLessons={videoLessons}
          />
        )}

        <PriceField
          price={price}
          setPrice={updateField("price")}
          error={error}
        />

        <Button
          disabled={cannotSubmit}
          type="submit"
          className="flex-center bg-green-500 text-white hover:bg-green-600"
        >
          {loading.status ? (
            <>
              <LoadingIndicator /> {loading.message || "Updating"}...
            </>
          ) : (
            "Update Class"
          )}
        </Button>
      </form>
    </div>
  );
}

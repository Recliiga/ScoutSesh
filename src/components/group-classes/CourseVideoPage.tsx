"use client";

import React, { useState } from "react";
import { PlayCircle, CheckCircle, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { GroupClassType, VideoType } from "@/db/models/GroupClass";
import VideoPlayer from "./VideoPlayer";
import { addVideoToCompletedLessons } from "@/actions/groupClassOrderActions";
import BackButton from "../dashboard/BackButton";

function formatVideoDuration(duration: number) {
  let suffix = "secs";
  let videoDuration = duration;

  if (videoDuration / 60 > 1) {
    suffix = "mins";
    videoDuration /= 60;
  }
  if (videoDuration / 60 > 1) {
    suffix = "hours";
    videoDuration /= 60;
  }

  return Math.round(videoDuration) + " " + suffix;
}

export default function CourseVideoPage({
  course,
  completedLessons,
}: {
  course: GroupClassType;
  completedLessons: VideoType[];
}) {
  const videos = course.videos;
  const [selectedVideoId, setSelectedVideoId] = useState(videos[0]._id);
  const [completedVideos, setCompletedVideos] = useState(completedLessons);

  const selectedVideo =
    videos.find((video) => video._id === selectedVideoId) || videos[0];

  const progress = Math.floor(
    (completedVideos.length / course.videos.length) * 100,
  );

  function isCompleted(video: VideoType) {
    return completedVideos.some((vid) => vid.url === video.url);
  }

  async function updateCompletedVideos(video: VideoType) {
    const prevCompletedVideos = completedVideos;
    setCompletedVideos((curr) =>
      isCompleted(video) ? curr : [...curr, video],
    );
    setSelectedVideoId((curr) => {
      const currentIndex = videos.findIndex((video) => video._id === curr);
      if (currentIndex >= videos.length - 1) return curr;
      return videos[currentIndex + 1]._id;
    });
    const { error } = await addVideoToCompletedLessons(
      course._id,
      selectedVideo,
    );
    if (error !== null) {
      setCompletedVideos(prevCompletedVideos);
    }
  }

  return (
    <div className="mx-auto flex w-[90%] max-w-7xl flex-1 flex-col gap-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="line-clamp-1 text-xl font-semibold sm:text-2xl">
          {course.title}
        </h1>
        <BackButton />
      </div>
      <div className="flex flex-1 flex-col gap-4 lg:flex-row">
        <div className="lg:flex-1">
          <div className="bg-white shadow-md">
            <VideoPlayer
              selectedVideo={selectedVideo}
              updateCompletedVideos={updateCompletedVideos}
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold sm:text-xl md:text-2xl">
                {selectedVideo.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="relative lg:w-96">
          <div className="flex h-full w-full flex-col lg:absolute">
            <div className="border-b pb-2">
              <h2 className="text-lg font-semibold">Course content</h2>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4">
                {videos.map((video, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVideoId(video._id)}
                    className={`mt-1 flex w-full items-start rounded-lg p-2 hover:bg-gray-100 ${
                      selectedVideo === video ? "bg-gray-100" : ""
                    }`}
                  >
                    <div className="mr-3 mt-1">
                      {isCompleted(video) ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <PlayCircle className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium">{video.title}</div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{formatVideoDuration(video.duration)}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      <div className="order-1 border-t">
        <Progress value={progress > 100 ? 100 : progress} className="mb-2" />
        <div className="text-sm text-gray-600">
          {progress > 100 ? 100 : progress}% complete
        </div>
      </div>
    </div>
  );
}

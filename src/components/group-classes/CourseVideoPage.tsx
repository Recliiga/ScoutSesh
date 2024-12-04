"use client";

import React, { useState } from "react";
import { PlayCircle, CheckCircle, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { GroupClassType, VideoType } from "@/db/models/GroupClass";
import VideoPlayer from "./VideoPlayer";
import { addVideoToCompletedLessons } from "@/actions/OrderActions";

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
    (completedVideos.length / course.videos.length) * 100
  );

  function isCompleted(video: VideoType) {
    return completedVideos.some((vid) => vid.url === video.url);
  }

  async function updateCompletedVideos(video: VideoType) {
    const prevCompletedVideos = completedVideos;
    setCompletedVideos((curr) =>
      isCompleted(video) ? curr : [...curr, video]
    );
    setSelectedVideoId((curr) => {
      const currentIndex = videos.findIndex((video) => video._id === curr);
      if (currentIndex >= videos.length - 1) return curr;
      return videos[currentIndex + 1]._id;
    });
    const { error } = await addVideoToCompletedLessons(
      course._id,
      selectedVideo
    );
    if (error !== null) {
      setCompletedVideos(prevCompletedVideos);
    }
  }

  return (
    <div className="py-6 flex-1 flex flex-col max-w-7xl w-[90%] mx-auto">
      <div className="flex-1 flex flex-col lg:flex-row gap-4">
        <div className="lg:flex-1">
          <div className="bg-white shadow-md">
            <VideoPlayer
              selectedVideo={selectedVideo}
              updateCompletedVideos={updateCompletedVideos}
            />
            <div className="p-4">
              <h1 className="text-xl sm:text-2xl font-bold mb-2">
                {selectedVideo.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="lg:w-96 relative">
          <div className="w-full h-full lg:absolute flex flex-col">
            <div className="pb-2 border-b">
              <h2 className="text-lg font-semibold">Course content</h2>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4">
                {videos.map((video, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVideoId(video._id)}
                    className={`flex items-start w-full p-2 hover:bg-gray-100 rounded-lg mt-1 ${
                      selectedVideo === video ? "bg-gray-100" : ""
                    }`}
                  >
                    <div className="mt-1 mr-3">
                      {isCompleted(video) ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <PlayCircle className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium">{video.title}</div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
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

      <div className="mt-6 border-t order-1">
        <Progress value={progress} className="mb-2" />
        <div className="text-sm text-gray-600">{progress}% complete</div>
      </div>
    </div>
  );
}

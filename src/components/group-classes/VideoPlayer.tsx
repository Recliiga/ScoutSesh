import React, { useState, useEffect, useRef, useCallback } from "react";
import VideoControls from "./VideoControls";
import { Pause, Play } from "lucide-react";
import { VideoType } from "@/db/models/GroupClass";

export default function VideoPlayer({
  selectedVideo,
}: {
  selectedVideo: VideoType;
}) {
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMediaIcon, setShowMediaIcon] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const percentageComplete = videoRef.current
    ? Math.round((currentTime / videoRef.current.duration) * 100)
    : 0;

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === "f") {
        e.preventDefault();
        toggleFullScreen();
      }
      if (e.key === "Escape") {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }

    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setShowMediaIcon(true);
    const timeout = setTimeout(() => {
      setShowMediaIcon(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isPlaying]);

  function resetIdleTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsIdle(true);
      setShowControls(false);
    }, 3000);
  }

  const handleMouseMoveInVideoContainer = useCallback(() => {
    setIsIdle(false);
    setShowControls(true);
    resetIdleTimeout();
  }, []);

  useEffect(() => {
    resetIdleTimeout();
    const videoContainer = videoContainerRef.current;
    if (!videoContainer) return;

    videoContainer.addEventListener(
      "mousemove",
      handleMouseMoveInVideoContainer
    );
    videoContainer.addEventListener("click", handleMouseMoveInVideoContainer);
    videoContainer.addEventListener("keydown", handleMouseMoveInVideoContainer);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      videoContainer.removeEventListener(
        "mousemove",
        handleMouseMoveInVideoContainer
      );
      videoContainer.removeEventListener(
        "click",
        handleMouseMoveInVideoContainer
      );
      videoContainer.removeEventListener(
        "keydown",
        handleMouseMoveInVideoContainer
      );
    };
  }, [handleMouseMoveInVideoContainer]);

  function togglePlay() {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  }

  function handleVideoEnded() {
    setIsPlaying(false);
    console.log("Video Completed");
  }

  function toggleFullScreen() {
    const videoContainer = videoContainerRef.current;
    if (videoContainer) {
      if (document.fullscreenElement === videoContainer) {
        document.exitFullscreen();
        setIsFullScreen(false);
      } else {
        videoContainer.requestFullscreen();
        setIsFullScreen(true);
      }
    }
  }

  function calculateCurrentTime(
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    duration: number,
    clientX: number
  ) {
    const { width, left } = e.currentTarget.getBoundingClientRect();
    const clickPosition = clientX - left;
    const newTime = Number(((clickPosition / width) * duration).toFixed(6));

    return newTime;
  }

  function handleSeekStart(
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    clientX: number
  ) {
    if (!videoRef.current) return;
    setIsSeeking(true);
    const newTime = calculateCurrentTime(e, videoRef.current.duration, clientX);
    setCurrentTime(newTime);
    videoRef.current.currentTime = newTime;
  }

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    handleSeekStart(e, e.clientX);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isSeeking) return;
    handleSeekStart(e, e.clientX);
  }

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    if (!videoRef.current) return;
    handleSeekStart(e, e.touches[0].clientX);
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (!isSeeking) return;
    handleSeekStart(e, e.touches[0].clientX);
  }

  function handleMouseUp() {
    setIsSeeking(false);
  }

  function handleMouseLeave() {
    setIsSeeking(false);
  }

  const handleSeek = {
    handleMouseDown,
    handleTouchStart,
    handleMouseMove,
    handleTouchMove,
    handleMouseUp,
    handleMouseLeave,
  };

  return (
    <div
      className={`relative w-full aspect-video ${isIdle ? "cursor-none" : ""}`}
      ref={videoContainerRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        src={selectedVideo.url}
        onContextMenu={(e) => e.preventDefault()}
        autoFocus
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onEnded={handleVideoEnded}
      >
        Your browser does not support the video tag.
      </video>

      <VideoControls
        percentageComplete={percentageComplete}
        togglePlay={togglePlay}
        toggleFullScreen={toggleFullScreen}
        isPlaying={isPlaying}
        isFullScreen={isFullScreen}
        showControls={showControls}
        handleSeek={handleSeek}
      />
      <div
        className={`absolute rounded-full p-4 bg-black/40 top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] duration-200 text-white ${
          showMediaIcon ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {isPlaying ? (
          <Play className="w-8 sm:w-12 h-8 sm:h-12" />
        ) : (
          <Pause className="w-8 sm:w-12 h-8 sm:h-12" />
        )}
      </div>
    </div>
  );
}

import { Play, Maximize, Pause, Minimize } from "lucide-react";
import React from "react";

export default function VideoControls({
  percentageComplete,
  isPlaying,
  togglePlay,
  isFullScreen,
  toggleFullScreen,
  showControls,
  handleSeek,
}: {
  percentageComplete: number;
  isPlaying: boolean;
  togglePlay(): void;
  isFullScreen: boolean;
  toggleFullScreen(): void;
  showControls: boolean;
  handleSeek: {
    handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
    handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    handleTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
    handleTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
    handleMouseUp: () => void;
    handleMouseLeave: () => void;
  };
}) {
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
  } = handleSeek;
  return (
    <div
      className={`absolute px-3 sm:px-6 bottom-0 left-0 w-full gap-4 py-3 sm:py-4 from-black/50 via-black/25 to-transparent bg-gradient-to-t flex duration-200 ${
        showControls || !isPlaying
          ? "visible opacity-100"
          : "invisible opacity-0"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="p-1 hover:text-green-500 text-white duration-200"
        onClick={togglePlay}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </button>

      <div
        className="flex-1 cursor-pointer flex-center"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <div className="w-full rounded-full h-[3px] bg-white">
          <div
            className="h-full bg-green-500 rounded-full relative"
            style={{ width: `${percentageComplete}%` }}
          >
            <div className="w-3 h-3 bg-green-500 absolute top-[50%] right-0 translate-x-[50%] -translate-y-[50%] rounded-full"></div>
          </div>
        </div>
      </div>

      <button
        className="p-1 hover:text-green-500 text-white duration-200"
        onClick={toggleFullScreen}
      >
        {isFullScreen ? (
          <Minimize className="w-5 h-5" />
        ) : (
          <Maximize className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}

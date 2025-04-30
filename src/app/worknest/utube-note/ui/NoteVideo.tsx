import YouTube, { YouTubePlayer } from "react-youtube";
import { VideoState, YouTubeNote } from "../type";
import React from "react";

const NoteVideo = React.memo(
  ({
    id,
    takeNote,
    setPlayer,
    setVideoState,
    videoState,
  }: Partial<YouTubeNote> & {
    takeNote: () => void;
    noteTime: number | null;
    videoState: VideoState;
    setPlayer: (param: YouTubePlayer) => void;
    setVideoState: (param: VideoState) => void;
  }) => {
    const onPlayerReady = ({ target }: { target: YouTubePlayer }) => {
      setPlayer(target);
    };

    return (
      <div
        className={`flex h-3/5 flex-col items-center gap-2 border-b-2 border-solid border-red-900 p-2 sm:h-full sm:w-3/5 sm:border-r-2 sm:border-b-0 ${videoState === "paused" ? "bg-red-200" : ""}`}
      >
        <YouTube
          iframeClassName="w-full h-full"
          className="h-full w-full flex-grow"
          onPlay={() => {
            setVideoState("playing");
          }}
          onPause={() => {
            setVideoState("paused");
          }}
          videoId={id}
          onReady={onPlayerReady}
        />
        <button
          className="bg-red-900 px-2 py-1 text-white hover:bg-red-700 active:bg-red-700"
          onClick={takeNote}
        >
          Take note
        </button>
      </div>
    );
  },
);

NoteVideo.displayName = "NoteVideo";

export default NoteVideo;

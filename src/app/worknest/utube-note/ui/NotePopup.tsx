"use client";

import { YouTubePlayer } from "react-youtube";
import { VideoState } from "../type";
import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import dataService from "../libs/dataService";
import NoteEditor from "./NoteEditor";
import NoteVideo from "./NoteVideo";

interface NotePopupProps {
  ref: React.RefObject<HTMLDivElement | null>;
  videoId: string;
}

const NotePopup = ({ videoId, ref }: NotePopupProps) => {
  const [videoState, setVideoState] = useState<VideoState>("paused");
  const [noteTime, setNoteTime] = useState<number | null>(null);
  const [timelapsed, setTimelapsed] = useState(0);

  const { data: notes, isLoading } = useQuery({
    queryKey: ["videoNotes", videoId],
    queryFn: () => dataService.getNotes(videoId),
  });

  console.log("videoNotes", notes, isLoading, videoId);

  let currentNoteIndex = -1;

  const nextNoteIndex = notes?.findIndex(({ from }) => from > timelapsed);

  if (typeof nextNoteIndex === "number" && notes) {
    if (nextNoteIndex > 0) {
      currentNoteIndex = nextNoteIndex - 1;
    } else {
      if (notes[notes.length - 1]?.from < timelapsed)
        currentNoteIndex = notes.length - 1;
    }
  }

  const playerRef = useRef<YouTubePlayer>(null);

  const setPlayer = (player: YouTubePlayer) => {
    playerRef.current = player;
  };

  const takeNote = () => {
    playerRef.current.pauseVideo();
    const noteTime = Math.floor(playerRef.current.getCurrentTime());
    setNoteTime(noteTime > 0 ? noteTime - 1 : noteTime);
  };

  const playAt = (timeStamp: number) => {
    setTimelapsed(timeStamp);
    playerRef.current.seekTo(timeStamp);
    playerRef.current.playVideo();
  };

  useEffect(() => {
    let timeInterval: ReturnType<typeof setInterval>;
    if (videoState === "playing") {
      timeInterval = setInterval(() => {
        setTimelapsed(Math.floor(playerRef.current.getCurrentTime()));
      });
    }

    return () => {
      if (timeInterval) {
        clearInterval(timeInterval);
      }
    };
  }, [videoState]);

  const skipNote = () => {
    setNoteTime(null);
  };

  const clickOnPopup = () => {
    if (ref?.current) {
      ref?.current?.hidePopover();
      playerRef.current.pauseVideo();
    }
  };

  return (
    <div
      onClick={() => {
        clickOnPopup();
      }}
      ref={ref}
      id="utubeNote-popover"
      popover=""
      className="bg-opacity-80 absolute top-0 left-0 h-full w-full bg-black"
    >
      <div className="grid h-full w-full place-items-center">
        <div
          className="h-4/5 w-4/5 rounded-md bg-white p-1 sm:p-2"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex h-full w-full flex-col items-stretch justify-center overflow-hidden rounded-md border-2 border-solid border-red-900 sm:flex-row">
            {isLoading || !notes ? (
              <div>Loading</div>
            ) : (
              <>
                <NoteVideo
                  id={videoId}
                  setPlayer={setPlayer}
                  noteTime={noteTime}
                  takeNote={takeNote}
                  videoState={videoState}
                  setVideoState={(param: VideoState) => {
                    setVideoState(param);
                  }}
                />
                <NoteEditor
                  notes={notes}
                  videoId={videoId}
                  noteTime={noteTime}
                  skipNote={skipNote}
                  playAt={playAt}
                  currentNoteIndex={currentNoteIndex}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotePopup;

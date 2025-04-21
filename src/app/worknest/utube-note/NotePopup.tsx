"use client";

import YouTube, { YouTubePlayer } from "react-youtube";
import { YouTubeNote, Note as NoteType, VideoState } from "./youtubeData";
import { useState, useRef, useEffect, forwardRef } from "react";
import { postWithCredential, getWithCredential } from "@/utils/fetcher";
import useSWR from "swr";
import { useAuth } from "@/libs/auth/authContext";
import guestDataManager from "./libs/guestDataManager";
import { Note } from "./type";

const formatTime = (time: number) => {
  const sec = time % 60;
  const min = Math.floor(time / 60);
  const hour = Math.floor(time / (60 * 60));

  const result = [];

  if (hour) {
    result.unshift(hour);
  }

  result.push(min, sec);

  return result.join(":").replace(/\b(\d)\b/g, "0$1");
};

const AddNote = ({
  skipNote,
  noteTime,
  addNote,
}: {
  skipNote: () => void;
  noteTime: number;
  addNote: (from: number, text: string) => void;
}) => {
  const [note, setNote] = useState("");

  const timeStr = formatTime(noteTime);

  const noteLegend = `Your note at ${timeStr}`;

  const onInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  return (
    <div className="absolute bottom-0 left-0 z-0 w-full border-t-2 border-red-900 bg-white p-1">
      <div className="flex gap-1">
        <div className="flex flex-col items-center justify-between">
          <p className="col-span-1">{noteLegend}</p>
          <button
            className="col-span-1 -translate-y-2 bg-red-900 px-1 text-white hover:bg-red-700 active:bg-red-700"
            type="submit"
            onClick={() => {
              addNote(noteTime, note);
              skipNote();
            }}
          >
            Set note
          </button>
        </div>
        <textarea
          className="customScrollBar col-span-1 row-span-2 mr-1 h-16 flex-grow resize-none bg-red-100 px-1 focus:outline-red-900"
          value={note}
          onInput={onInput}
        ></textarea>
      </div>
    </div>
  );
};

const NoteItem = ({
  from,
  text,
  playAt,
  highlighted,
}: NoteType & {
  highlighted: boolean;
  playAt: (timeStamp: number) => void;
}) => {
  const timeAsString = formatTime(from);

  return (
    <div className={`${highlighted ? "bg-red-200" : ""}`}>
      <p>
        <span
          className={`${highlighted ? "underline decoration-red-900" : ""} cursor-pointer hover:underline hover:decoration-red-900`}
          role="button"
          onClick={() => {
            playAt(from);
          }}
        >
          {timeAsString}
        </span>
        : {text}
      </p>
    </div>
  );
};

const NoteContainer = ({
  noteTime,
  playAt,
  skipNote,
  notes,
  currentNoteIndex,
  addNote,
}: {
  notes: Note[];
  videoId: string;
  noteTime: number | null;
  skipNote: () => void;
  playAt: (timeStamp: number) => void;
  currentNoteIndex: number;
  addNote: (from: number, text: string) => void;
}) => {
  return (
    <div className="relative flex-grow p-2">
      <div className="customScrollBar flex max-h-full min-h-0 flex-grow flex-col overflow-y-scroll">
        {notes.length === 0 && (
          <>
            <div className=""> No note for this clip</div>
          </>
        )}
        {notes.map((d, index) => {
          return (
            <NoteItem
              key={d.from}
              {...d}
              playAt={playAt}
              highlighted={currentNoteIndex === index}
            />
          );
        })}
      </div>
      {typeof noteTime === "number" ? (
        <AddNote skipNote={skipNote} addNote={addNote} noteTime={noteTime} />
      ) : null}
    </div>
  );
};

const VideoBox = ({
  id,
  isValidId,
  takeNote,
  setPlayer,
  setVideoState,
  videoState,
}: Partial<YouTubeNote> & {
  takeNote: () => void;
  isValidId: boolean;
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
      {isValidId ? (
        <>
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
        </>
      ) : (
        <div className="grid h-full place-items-center text-red-900">
          Invalid video ID, please add video before viewing it
        </div>
      )}
    </div>
  );
};

interface NotePopupProps {
  videoId: string;
}

const NotePopup = forwardRef<HTMLDivElement, NotePopupProps>(function NotePopup(
  { videoId },
  popOverRef,
) {
  const { isAuthorized } = useAuth();
  const [videoState, setVideoState] = useState<VideoState>("paused");
  const [noteTime, setNoteTime] = useState<number | null>(null);
  const [timelapsed, setTimelapsed] = useState(0);
  const [notes, setNotes] = useState(guestDataManager.getNotes(videoId));
  const [guestVideo, setGuestVideo] = useState(guestDataManager.getVideos());

  // const { data: data_video } = useSWR(
  //   isAuthorized ? `${process.env.NEXT_PUBLIC_BE_ORIGIN}/api/videos` : null,
  //   getWithCredential<{ data: Video[] }>,
  // );

  useEffect(() => {
    setNotes(guestDataManager.getNotes(videoId));
  }, [videoId]);

  const _data_videos = guestVideo;

  // if (isAuthorized && data_video) {
  //   _data_videos = data_video.data;
  // }

  useEffect(() => {
    const listener = () => {
      setGuestVideo(guestDataManager.getVideos());
    };
    if (!isAuthorized) {
      guestDataManager.eventEmitter.on("videoAdded", listener);
    }
    guestDataManager.eventEmitter.on("videoAdded", listener);

    return () => {
      if (!isAuthorized) {
        guestDataManager.eventEmitter.off("videoAdded", listener);
      }
    };
  }, [isAuthorized]);

  const { data } = useSWR(
    isAuthorized
      ? `${process.env.NEXT_PUBLIC_BE_ORIGIN}/api/notes/${videoId}`
      : null,
    getWithCredential<{ data: Note[] }>,
  );

  useEffect(() => {
    if (data) {
      const notes = data.data;
      setNotes(
        notes.sort((a, b) => {
          return a.from - b.from;
        }),
      );
    }
  }, [data]);

  const addNote = async (from: number, text: string) => {
    if (!isAuthorized) {
      guestDataManager.setNote(videoId, { from, text });

      setNotes(
        guestDataManager.getNotes(videoId).sort((a, b) => {
          return a.from - b.from;
        }),
      );
    } else {
      await postWithCredential(
        `${process.env.NEXT_PUBLIC_BE_ORIGIN}/api/notes/${videoId}`,
        {
          from,
          text,
        },
      );
    }
  };

  let currentNoteIndex = -1;
  const nextNoteIndex = notes.findIndex(({ from }) => from > timelapsed);

  if (nextNoteIndex > 0) {
    currentNoteIndex = nextNoteIndex - 1;
  } else {
    if (notes[notes.length - 1]?.from < timelapsed)
      currentNoteIndex = notes.length - 1;
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

  const isValidId = _data_videos.some((video) => video.youtubeId === videoId);

  const clickOnPopup = () => {
    const _popOverRef = popOverRef as React.MutableRefObject<HTMLDivElement>;
    if (_popOverRef.current) {
      _popOverRef.current.hidePopover();
      playerRef.current.pauseVideo();
    }
  };

  return (
    <div
      onClick={() => {
        clickOnPopup();
      }}
      ref={popOverRef}
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
            <VideoBox
              isValidId={isValidId}
              id={videoId}
              setPlayer={setPlayer}
              noteTime={noteTime}
              takeNote={takeNote}
              videoState={videoState}
              setVideoState={(param: VideoState) => {
                setVideoState(param);
              }}
            />
            <NoteContainer
              videoId={videoId}
              noteTime={noteTime}
              skipNote={skipNote}
              playAt={playAt}
              currentNoteIndex={currentNoteIndex}
              addNote={addNote}
              notes={notes}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default NotePopup;

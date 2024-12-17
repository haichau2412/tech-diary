"use client";

import YouTube, { YouTubePlayer } from "react-youtube";
import { YouTubeNote, Note as NoteType, VideoState } from "./youtubeData";
import { useState, useRef, useEffect, useContext } from "react";
import { postWithCredential, getWithCredential } from "@/utils/fetcher";
import useSWR from "swr";
import { AuthContext } from "@/components/authContext";

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
  videoId,
  playAt,
  timelapsed,
  skipNote,
}: {
  videoId: string;
  noteTime: number | null;
  timelapsed: number;
  skipNote: () => void;
  playAt: (timeStamp: number) => void;
}) => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_BE_ORIGIN}/api/notes/${videoId}`,
    getWithCredential,
  );

  const [notes, setNotes] = useState<{ from: number; text: string }[]>([]);

  useEffect(() => {
    if (data) {
      const _data = data as unknown as {
        data: { from: number; text: string }[];
      };
      const notes = _data.data;

      setNotes(notes.sort((a, b) => a.from - b.from));
    }
  }, [data]);

  const addNote = async (from: number, text: string) => {
    const _notes = structuredClone(notes);
    _notes.push({
      from,
      text,
    });
    setNotes(_notes.sort((a, b) => a.from - b.from));

    const data = await postWithCredential(
      `${process.env.NEXT_PUBLIC_BE_ORIGIN}/api/notes/${videoId}`,
      {
        from,
        text,
      },
    );

    const _data = data as unknown as {
      data?: { from: number; text: string }[];
    };

    setNotes((_data.data || []).sort((a, b) => a.from - b.from));
  };

  let currentNoteIndex = -1;
  const nextNoteIndex = notes.findIndex(({ from }) => from > timelapsed);

  if (nextNoteIndex > 0) {
    currentNoteIndex = nextNoteIndex - 1;
  } else {
    if (notes[notes.length - 1]?.from < timelapsed)
      currentNoteIndex = notes.length - 1;
  }

  return (
    <div className="relative col-span-1 row-span-1 border-2 border-b-0 border-solid border-red-900 p-2 sm:border-l-0">
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
      className={`flex flex-col items-center gap-2 border-2 border-b-0 border-solid border-red-900 p-2 ${videoState === "paused" ? "bg-red-200" : ""}`}
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
};

const UtubeNote = ({ videoId }: { videoId: string }) => {
  const { isAuthorized } = useContext(AuthContext);
  const [videoState, setVideoState] = useState<VideoState>("paused");
  const [noteTime, setNoteTime] = useState<number | null>(null);
  const [timelapsed, setTimelapsed] = useState(0);

  const playerRef = useRef<YouTubePlayer>(null);

  const setPlayer = (player: YouTubePlayer) => {
    playerRef.current = player;
  };

  const takeNote = () => {
    playerRef.current.pauseVideo();
    setNoteTime(Math.floor(playerRef.current.getCurrentTime()));
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

  return (
    <>
      {isAuthorized ? (
        <>
          <VideoBox
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
            timelapsed={timelapsed}
          />
        </>
      ) : (
        <div className="col-span-2 flex items-center justify-center bg-red-50 text-center text-xl font-bold uppercase">
          <p className="max-w-[600px]">
            This feature is used for those who want to take note on youtube
          </p>
        </div>
      )}
    </>
  );
};

export default UtubeNote;

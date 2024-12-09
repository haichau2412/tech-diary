"use client";

import YouTube, { YouTubePlayer } from "react-youtube";
import { YouTubeNote, Note as NoteType, VideoState } from "./youtubeData";
import { useState, useRef, useEffect } from "react";

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

const DUMMY_NOTE = [
  {
    from: 10,
    note: "anbvlksdd sdkjjd  kjdsk ",
  },
  {
    from: 40,
    note: "dffds tyer 0789 gjg ",
  },
  {
    from: 67,
    note: "anbvlksdd sdkjjd  kjdsk ",
  },
  {
    from: 120,
    note: "sdfsdf sdgfs cvxcv  ",
  },
  {
    from: 300,
    note: "sdf  sdfs vcbb mnmnm  ",
  },
  {
    from: 310,
    note: "212 r6ert i867ij dsfrs ",
  },
];

const AddNote = ({}) => {
  const [note, setNote] = useState("");

  const onInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  return (
    <form>
      <fieldset>
        <legend>Your note</legend>
        <textarea value={note} onInput={onInput}></textarea>
        <input type="submit" value="Send" />
      </fieldset>
    </form>
  );
};

const NoteItem = ({
  from,
  note,
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
          className="cursor-pointer"
          role="button"
          onClick={() => {
            playAt(from);
          }}
        >
          {timeAsString}
        </span>
        : {note}
      </p>
    </div>
  );
};

const NoteContainer = ({
  noteTime,
  playAt,
  timelapsed,
}: {
  noteTime: number;
  timelapsed: number;
  skipNote: () => void;
  playAt: (timeStamp: number) => void;
}) => {
  let currentNoteIndex = -1;
  const nextNoteIndex = DUMMY_NOTE.findIndex(({ from }) => from >= timelapsed);

  if (nextNoteIndex > 0) {
    currentNoteIndex = nextNoteIndex - 1;
  }

  return (
    <div className="flex flex-grow flex-col">
      {DUMMY_NOTE.map((d, index) => {
        return (
          <NoteItem
            key={d.from}
            {...d}
            playAt={playAt}
            highlighted={currentNoteIndex === index}
          />
        );
      })}
      {noteTime && <AddNote />}
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
  noteTime: number;
  videoState: VideoState;
  setPlayer: (param: YouTubePlayer) => void;
  setVideoState: (param: VideoState) => void;
}) => {
  const onPlayerReady = ({ target }: { target: YouTubePlayer }) => {
    setPlayer(target);
  };

  return (
    <div
      className={`flex basis-1/2 flex-col items-center gap-2 border-2 border-solid border-red-900 p-2 ease-in-out ${videoState === "paused" ? "bg-red-300" : ""}`}
    >
      <YouTube
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
        className="bg-red-700 px-2 py-1 text-white hover:bg-red-400 active:bg-red-400"
        onClick={takeNote}
      >
        Take Note
      </button>
    </div>
  );
};

const UtubeNote = ({ videoId }: { videoId: string }) => {
  const [videoState, setVideoState] = useState<VideoState>("paused");
  const [noteTime, setNoteTime] = useState(0);
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
    setNoteTime(0);
  };

  return (
    <div className="flex gap-2">
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
        noteTime={noteTime}
        skipNote={skipNote}
        playAt={playAt}
        timelapsed={timelapsed}
      />
    </div>
  );
};

export default UtubeNote;

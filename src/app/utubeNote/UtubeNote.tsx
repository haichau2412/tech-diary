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
    from: 1,
    note: "anbvlksdd sdkjjd  kjdsk ",
  },
  {
    from: 2,
    note: "dffds tyer 0789 gjg ",
  },
  {
    from: 3,
    note: "anbvlksdd sdkjjd  kjdsk ",
  },
  {
    from: 4,
    note: "sdfsdf sdgfs cvxcv  ",
  },
  {
    from: 5,
    note: "sdf  sdfs vcbb mnmnm  ",
  },
  {
    from: 6,
    note: "212 r6ert i867ij dsfrs ",
  },
  {
    from: 7,
    note: "anbvlksdd sdkjjd  kjdsk ",
  },
  {
    from: 8,
    note: "dffds tyer 0789 gjg ",
  },
  {
    from: 9,
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
  {
    from: 311,
    note: "anbvlksdd sdkjjd  kjdsk ",
  },
  {
    from: 312,
    note: "dffds tyer 0789 gjg ",
  },
  {
    from: 313,
    note: "anbvlksdd sdkjjd  kjdsk ",
  },
  {
    from: 314,
    note: "sdfsdf sdgfs cvxcv  ",
  },
  {
    from: 315,
    note: "sdf  sdfs vcbb mnmnm  ",
  },
  {
    from: 316,
    note: "212 r6ert i867ij dsfrs ",
  },
  {
    from: 317,
    note: "anbvlksdd sdkjjd  kjdsk ",
  },
  {
    from: 318,
    note: "dffds tyer 0789 gjg ",
  },
  {
    from: 319,
    note: "anbvlksdd sdkjjd  kjdsk ",
  },
  {
    from: 320,
    note: "sdfsdf sdgfs cvxcv  ",
  },
  {
    from: 340,
    note: "dffds tyer 0789 gjg ",
  },
  {
    from: 341,
    note: "anbvlksdd sdkjjd  kjdsk ",
  },
  {
    from: 342,
    note: "sdfsdf sdgfs cvxcv  ",
  },
];

const AddNote = ({
  skipNote,
  noteTime,
}: {
  skipNote: () => void;
  noteTime: number;
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
              console.log("send note to server");

              skipNote();
            }}
          >
            Set note
          </button>
        </div>
        <textarea
          className="customScrollBarUtube col-span-1 row-span-2 mr-1 h-16 flex-grow resize-none bg-red-100 px-1 focus:outline-red-900"
          value={note}
          onInput={onInput}
        ></textarea>
      </div>
    </div>
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
          className={`${highlighted ? "underline decoration-red-900" : ""} cursor-pointer hover:underline hover:decoration-red-900`}
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
  skipNote,
}: {
  noteTime: number | null;
  timelapsed: number;
  skipNote: () => void;
  playAt: (timeStamp: number) => void;
}) => {
  let currentNoteIndex = -1;
  const nextNoteIndex = DUMMY_NOTE.findIndex(({ from }) => from > timelapsed);

  if (nextNoteIndex > 0) {
    currentNoteIndex = nextNoteIndex - 1;
  }

  return (
    <div className="relative col-span-1 row-span-1 border-2 border-l-0 border-solid border-red-900 p-2">
      <div className="customScrollBarUtube flex max-h-full min-h-0 flex-grow flex-col overflow-y-scroll">
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
      </div>
      {typeof noteTime === "number" ? (
        <AddNote skipNote={skipNote} noteTime={noteTime} />
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
      className={`col-span-1 row-span-1 flex max-h-full min-h-0 basis-1/2 flex-col items-center gap-2 border-2 border-solid border-red-900 p-2 ease-in-out ${videoState === "paused" ? "bg-red-300" : ""}`}
    >
      <YouTube
        iframeClassName="w-full h-full"
        className="w-full flex-grow"
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
    </>
  );
};

export default UtubeNote;

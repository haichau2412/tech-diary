import { Note } from "../type";
import NoteItem from "./NoteItem";
import NodeUpdate from "./NodeUpdate";

const NoteEditor = ({
  videoId,
  noteTime,
  playAt,
  skipNote,
  notes,
  currentNoteIndex,
}: {
  notes: Note[];
  videoId: string;
  noteTime: number | null;
  skipNote: () => void;
  playAt: (timeStamp: number) => void;
  currentNoteIndex: number;
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
        <NodeUpdate skipNote={skipNote} noteTime={noteTime} videoId={videoId} />
      ) : null}
    </div>
  );
};

export default NoteEditor;

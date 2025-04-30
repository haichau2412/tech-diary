import { formatTime } from "../libs/util";
import { Note } from "../type";

const NoteItem = ({
  from,
  text,
  playAt,
  highlighted,
}: Note & {
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

export default NoteItem;

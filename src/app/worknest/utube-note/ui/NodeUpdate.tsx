import { useState } from "react";
import { formatTime } from "../libs/util";
import { useUpdateVideoName } from "../hook/queryHook";

const NodeUpdate = ({
  skipNote,
  noteTime,
  videoId,
}: {
  skipNote: () => void;
  noteTime: number;
  videoId: string;
}) => {
  const mutation = useUpdateVideoName();

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
              mutation.mutate({
                youtubeId: videoId,
                note: {
                  from: noteTime,
                  text: note,
                },
              });
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

export default NodeUpdate;

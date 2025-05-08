import Image from "next/image";
import { memo } from "react";
import { useState } from "react";

interface Props {
  customName: string;
  openNotePopover: (id: string) => void;
  openRenamePopover: (func: () => void) => void;
  id: string;
  setCustomName: (value: {
    id: string;
    newName: string;
    oldName: string;
  }) => void;
  newCustomName?: string;
}

const VideoBox = ({
  customName,
  openNotePopover,
  openRenamePopover,
  setCustomName,
  id,
}: Props) => {
  const [newCustomName, setNewCustomName] = useState<string | null>(null);

  const videoName = newCustomName ?? (customName || "Empty name");

  const onBlur = () => {
    if (newCustomName && customName !== newCustomName) {
      setCustomName({
        id,
        newName: newCustomName,
        oldName: customName,
      });
      openRenamePopover(() => {
        setNewCustomName(null);
      });
    } else {
      setNewCustomName(null);
    }
  };
  return (
    <div className="utubeElement videoBox relative flex flex-col items-center justify-between gap-1 border border-transparent bg-red-200 hover:border-orange-300">
      <div
        className="thumbnail relative mt-1 aspect-[3/2] w-[240px] cursor-pointer truncate"
        onClick={() => openNotePopover(id)}
      >
        <Image
          role="presentation"
          priority={false}
          fill={true}
          src={`https://img.youtube.com/vi/${id}/0.jpg`}
          alt=""
        />
      </div>

      <div className="absolute top-[2px] right-[2px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16px"
          viewBox="0 -960 960 960"
          width="16px"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </div>

      <input
        aria-label={`videoNameChangeInput`}
        onChange={(e) => {
          setNewCustomName(e.target.value);
        }}
        onBlur={onBlur}
        type="text"
        className="max-w-full truncate rounded-t-md border-none bg-red-900 py-[2px] text-center leading-tight text-ellipsis text-slate-200 outline-none hover:bg-red-800"
        value={videoName}
      />
    </div>
  );
};

const MemoVideoBox = memo(VideoBox);

export default MemoVideoBox;

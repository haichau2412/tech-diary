import Image from "next/image";

interface Props {
  srcSet: string;
  customName: string;
  setCustomName: (value: {
    id: string;
    newName: string;
    oldName: string;
  }) => void;
  newCustomName?: string;
  openNotePopover: (id: string) => void;
  openRenamePopover: () => void;
  id: string;
}

const VideoBox = ({
  srcSet,
  customName,
  setCustomName,
  newCustomName,
  openNotePopover,
  openRenamePopover,
  id,
}: Props) => {
  const videoName = newCustomName || customName || "Empty name";
  return (
    <div className="utubeElement videoBox relative flex flex-col items-center justify-between gap-1 border border-transparent bg-red-200 hover:border-orange-300">
      <div
        className="relative mt-1 aspect-[3/2] w-[240px] cursor-pointer truncate rounded-t-md"
        onClick={() => openNotePopover(id)}
      >
        <Image
          role="presentation"
          priority={false}
          fill={true}
          src={srcSet}
          alt=""
        />
      </div>

      <div className="absolute right-[2px] top-[2px]">
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
        onChange={(e) => {
          setCustomName({
            id,
            newName: e.target.value,
            oldName: customName,
          });
        }}
        onBlur={openRenamePopover}
        type="text"
        className="max-w-full truncate text-ellipsis rounded-t-md border-none bg-red-900 py-[2px] text-center leading-tight text-slate-200 outline-none hover:bg-red-800"
        value={videoName}
      />
    </div>
  );
};

export default VideoBox;

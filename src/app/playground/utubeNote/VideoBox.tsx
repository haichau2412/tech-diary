"use client";

import Image from "next/image";
import { useState } from "react";

const VideoBox = ({
  srcSet,
  customName,
  setRename,
  renameValue,
  onCancelRename,
  setVideoId,
  id,
}: {
  srcSet: string;
  customName: string;
  renameValue: string;
  id: string;
  onCancelRename: (cb: () => void) => void;
  setRename: (value: string) => void;
  setVideoId: (value: string) => void;
}) => {
  const [inputValue, setInputValue] = useState(customName || "Empty name");

  const showPopover = () => {
    const popover = document.getElementById("rename-popover");
    if (popover) {
      if (renameValue === "") {
        setInputValue(customName || "Empty name");
      } else {
        onCancelRename(() => {
          setInputValue(customName || "Empty name");
        });
        popover.showPopover();
      }
    }
  };

  const showNote = () => {
    const popover = document.getElementById("utubeNote-popover");
    if (popover) {
      setVideoId(id);
      popover.showPopover();
    }
  };

  return (
    <div className="utubeElement videoBox relative flex flex-col items-center justify-between gap-1 border border-transparent bg-red-200 hover:border-orange-300">
      <div
        className="relative mt-1 aspect-[3/2] w-[240px] cursor-pointer truncate rounded-t-md"
        onClick={showNote}
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
          setInputValue(e.target.value);
          setRename(e.target.value);
        }}
        onBlur={showPopover}
        type="text"
        className="max-w-full truncate text-ellipsis rounded-t-md border-none bg-red-900 py-[2px] text-center leading-tight text-slate-200 outline-none hover:bg-red-800"
        value={inputValue}
      />
    </div>
  );
};

export default VideoBox;

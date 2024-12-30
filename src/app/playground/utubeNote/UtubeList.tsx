"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import guestDataManager from "../../lib/guestDataManager";
import VideoAdd from "./VideoAdd";
import VideoBox from "./VideoBox";
import UtubeNote from "./UtubeNote";

const UtubeList = () => {
  const [guestData, setGuestData] = useState(guestDataManager.getVideos());
  const [renameValue, setRename] = useState("");
  const [videoId, setVideoId] = useState("");
  const popOverRef = useRef<HTMLDivElement>(null);
  const confirmFuncRef = useRef<(() => void) | null>(null);

  const _setRename = useCallback((value: string) => {
    setRename(value);
  }, []);

  const _setVideoId = useCallback((value: string) => {
    setVideoId(value);
  }, []);

  const _setCbRename = useCallback((cb: () => void) => {
    confirmFuncRef.current = cb;
  }, []);

  const _data = guestData;

  useEffect(() => {
    const listener = () => {
      setGuestData(guestDataManager.getVideos());
    };
    guestDataManager.eventEmitter.on("videoAdded", listener);

    return () => {
      guestDataManager.eventEmitter.off("videoAdded", listener);
    };
  }, []);

  const onConfirm = (value: boolean) => {
    if (popOverRef.current) {
      if (value === false) {
        confirmFuncRef.current?.();
        setRename("");
      }
      popOverRef.current.hidePopover();
    }
  };

  return (
    <div className="relative mt-4 grid h-full w-full grid-cols-utubeDashboard grid-rows-utubeDashboard gap-4">
      <VideoAdd />
      {_data.map((i) => {
        return (
          <VideoBox
            setVideoId={_setVideoId}
            renameValue={renameValue}
            setRename={_setRename}
            onCancelRename={_setCbRename}
            key={i.youtubeId}
            id={i.youtubeId}
            srcSet={`https://img.youtube.com/vi/${i.youtubeId}/0.jpg`}
            customName={i.customName}
          />
        );
      })}
      <div
        ref={popOverRef}
        popover="auto"
        id="rename-popover"
        className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-30"
      >
        <div className="grid h-full w-full place-items-center">
          <div className="flex flex-col items-center gap-3 rounded-md bg-slate-100 px-5 py-2">
            <div>
              Rename video to:{" "}
              <span className="text-red-800">{renameValue}</span> ?
            </div>
            <div className="confirmDiv">
              <button
                onClick={() => {
                  onConfirm(true);
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  onConfirm(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>

      <UtubeNote videoId={videoId} />
    </div>
  );
};

export default UtubeList;

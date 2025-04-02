"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import guestDataManager from "utubeNote/libs/guestDataManager";
import VideoAdd from "./VideoAddBox";
import VideoBox from "./VideoBox";
import NotePopup from "./NotePopup";
import RenamePopup from "./RenamePopup";

const UtubeList = () => {
  const [guestData, setGuestData] = useState(guestDataManager.getVideos());
  const [rename, setRename] = useState<{
    id: string;
    newName: string;
    oldName: string;
  } | null>(null);

  const [videoId, setVideoId] = useState("");

  const renameRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement | null>(null);

  const _setRename = useCallback(
    (value: { id: string; newName: string; oldName: string }) => {
      setRename(value);
    },
    [],
  );

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
    if (renameRef.current) {
      if (value) {
        guestDataManager.updateVideoName(
          rename?.id || "",
          rename?.newName || "",
        );
        setGuestData(guestDataManager.getVideos());
      }
      setRename(null);
      renameRef.current.hidePopover();
    }
  };

  const openRenamePopover = () => {
    if (renameRef) {
      if (rename?.newName === rename?.oldName) {
        setRename(null);
      } else {
        renameRef.current?.showPopover();
      }
    }
  };

  const openNotePopover = (videoId: string) => {
    if (noteRef.current) {
      setVideoId(videoId);
      noteRef.current.showPopover();
    }
  };

  return (
    <div className="customScrollBar relative mt-4 grid h-full w-fit grid-cols-(--grid-cols-utubeDashboard) grid-rows-(--grid-rows-utubeDashboard) gap-4 overflow-y-scroll p-4 sm:w-full sm:p-0">
      <VideoAdd />
      {_data.map((i) => {
        return (
          <VideoBox
            setCustomName={_setRename}
            newCustomName={rename?.id === i.youtubeId ? rename.newName : ""}
            openNotePopover={openNotePopover}
            openRenamePopover={openRenamePopover}
            key={i.youtubeId}
            id={i.youtubeId}
            srcSet={`https://img.youtube.com/vi/${i.youtubeId}/0.jpg`}
            customName={i.customName}
          />
        );
      })}
      <RenamePopup
        onConfirm={onConfirm}
        newName={rename?.newName}
        ref={renameRef}
      />
      <NotePopup videoId={videoId} ref={noteRef} />
    </div>
  );
};

export default UtubeList;

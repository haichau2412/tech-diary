"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import guestDataManager from "../libs/guestDataManager";
import VideoAddBox from "./VideoAddBox";
import VideoBox from "./VideoBox";
import NotePopup from "./NotePopup";
import RenamePopup from "./RenamePopup";
import dataService from "../libs/dataService";
import { useGetVideos } from "../hook/queryHook";
import UtubeSearchBar from "./UtubeSearchBar";
import { useUpdateVideoName } from "../hook/queryHook";

const UtubeList = () => {
  useEffect(() => {
    dataService.updateMode("guest");
  }, []);

  const { data, isLoading } = useGetVideos();
  const [rename, setRename] = useState<{
    id: string;
    newName: string;
    oldName: string;
  } | null>(null);
  const [videoId, setVideoId] = useState("");
  const renameRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement | null>(null);
  const [query, setFilterOption] = useState("");
  const childRenameRef = useRef<() => void | null>(null);
  const mutation = useUpdateVideoName();

  const _setRename = useCallback(
    (value: { id: string; newName: string; oldName: string }) => {
      setRename(value);
    },
    [],
  );

  const openRenamePopover = useCallback((func: () => void | null) => {
    if (renameRef) {
      renameRef.current?.showPopover();
      childRenameRef.current = func;
    }
  }, []);

  const openNotePopover = useCallback((videoId: string) => {
    if (noteRef.current) {
      setVideoId(videoId);
      noteRef.current.showPopover();
    }
  }, []);

  const onConfirm = (value: boolean) => {
    if (renameRef.current) {
      if (value && rename) {
        guestDataManager.updateVideoName(
          rename?.id || "",
          rename?.newName || "",
        );
        mutation.mutate({
          youtubeId: rename.id,
          customName: rename.newName,
        });
      }

      if (childRenameRef.current) {
        if (!value) {
          childRenameRef.current();
        }
        childRenameRef.current = null;
      }
      setRename(null);
      renameRef.current.hidePopover();
    }
  };
  if (isLoading || !data) {
    return <></>;
  }

  return (
    <>
      <UtubeSearchBar videos={data} setFilterOption={setFilterOption} />
      <div className="customScrollBar relative mt-4 grid h-full w-fit grid-cols-(--grid-cols-utubeDashboard) grid-rows-(--grid-rows-utubeDashboard) gap-4 overflow-y-scroll p-4 sm:w-full sm:p-0">
        <VideoAddBox />
        {data
          .filter(({ customName }) =>
            customName.toLowerCase().includes(query.toLowerCase()),
          )
          .map((i) => {
            return (
              <VideoBox
                setCustomName={_setRename}
                openRenamePopover={openRenamePopover}
                openNotePopover={openNotePopover}
                key={i.youtubeId}
                id={i.youtubeId}
                customName={i.customName}
              />
            );
          })}
        <RenamePopup
          newName={rename?.newName}
          ref={renameRef}
          onConfirm={onConfirm}
        />
        <NotePopup videoId={videoId} ref={noteRef} />
      </div>
    </>
  );
};

export default UtubeList;

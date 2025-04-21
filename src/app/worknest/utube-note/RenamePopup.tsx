import React, { forwardRef } from "react";

interface Props {
  onConfirm: (value: boolean) => void;
  newName?: string;
}

const RenamePopup = forwardRef<HTMLDivElement, Props>(function RenamePopup(
  { onConfirm, newName },
  ref,
) {
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      popover="auto"
      id="rename-popover"
      className="bg-opacity-30 absolute top-0 left-0 h-full w-full bg-black"
    >
      <div className="grid h-full w-full place-items-center">
        <div className="flex flex-col items-center gap-3 rounded-md bg-white px-5 py-2">
          <div>
            Rename video to: <span className="text-red-800">{newName}</span> ?
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
  );
});

export default RenamePopup;

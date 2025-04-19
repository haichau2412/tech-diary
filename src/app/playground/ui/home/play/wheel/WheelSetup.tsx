import React, { useState, ChangeEvent, useEffect } from "react";
import { useWheel } from "./wheelContext";
import WarningText from "./Warning";
import WinnerToaster from "./WinnerToaster";
import { cn } from "@/libs/utils";

const WheelSetup = () => {
  const {
    setWheelData,
    wheelData,
    selectedIndex,
    wheelState,
    setWheelState,
    setSelectedIndex,
  } = useWheel();
  const [inputValue, setInputValue] = useState("");
  const [warning, setWarning] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (
      wheelData &&
      typeof selectedIndex === "number" &&
      wheelState === "stopped"
    ) {
      setSelected(wheelData[selectedIndex]);
    }
  }, [wheelData, selectedIndex, wheelState]);

  const handleAdd = () => {
    if (!inputValue || warning || wheelState === "spinning") {
      return;
    }
    setWheelData([...wheelData, inputValue]);
    setInputValue("");
  };

  const handleRemove = (item: string) => {
    if (wheelState === "spinning") {
      return;
    }
    setWheelData(wheelData.filter((d) => d !== item));
    setSelectedIndex(null);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trim();

    if (!trimmedValue) {
      setWarning("");
      setInputValue("");
      return;
    }

    if (wheelData.includes(trimmedValue)) {
      setWarning("Duplicate");
      setInputValue(trimmedValue);
      return;
    }
    setWarning("");
    setInputValue(trimmedValue);
  };

  const spin = () => {
    if (wheelState === "spinning") return;
    setSelected(null);
    setInputValue("");
    setWarning(null);
    setWheelState("spinning");
  };

  let startBtnText =
    wheelState === "spinning" ? "Spinning..." : "Spin the Wheel";

  if (wheelData.length < 3) {
    startBtnText = "Add 3 items to start spinning";
  }

  return (
    <div className="wheelArticle flex h-[400px] grow flex-col items-center justify-between">
      <div className="mt-0 h-[50px]">
        <WinnerToaster message={selected || ""} visible={!!selected} />
      </div>
      <div className="flex items-start space-x-2">
        <div className="flex flex-col">
          <input
            type="text"
            value={inputValue}
            onChange={onChange}
            placeholder="Enter item"
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-800 placeholder-gray-400 shadow-sm transition duration-150 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <div className="mt-0 h-[30px]">
            <WarningText message={warning || ""} />
          </div>
        </div>

        <button
          disabled={!!warning || wheelState === "spinning"}
          onClick={handleAdd}
          className={cn(
            "cursor-pointer rounded-xl bg-blue-600 px-4 py-2 text-white shadow transition duration-150 ease-in-out hover:bg-blue-700",
            {
              "cursor-not-allowed bg-red-600 hover:bg-red-700":
                !!warning || wheelState === "spinning",
            },
          )}
        >
          Add
        </button>
      </div>
      <div className="h-[200px] max-w-[400px] overflow-auto">
        <ul className="mt-4 flex list-inside list-none flex-wrap gap-1 gap-y-4">
          {wheelData.map((item, index) => (
            <li
              key={index}
              className="flex h-fit w-fit rounded-md bg-white px-2 py-1"
            >
              <span>{item}</span>
              <button
                disabled={wheelState === "spinning"}
                onClick={() => handleRemove(item)}
                className={cn(
                  "ml-2 cursor-pointer text-red-500 hover:text-red-700",
                  {
                    "cursor-not-allowed": wheelState === "spinning",
                  },
                )}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={spin}
        disabled={wheelState === "spinning" || wheelData.length < 3}
        className={cn(
          "gameButton green w-[150px] rounded-full px-6 py-2 text-white transition",
          {
            "red cursor-not-allowed": wheelData.length < 3,
          },
        )}
      >
        {startBtnText}
      </button>
      <p className="text-white"></p>
    </div>
  );
};

export default WheelSetup;

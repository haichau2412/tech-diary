import { createContext, useContext, useState } from "react";

type WheelState = "idle" | "spinning" | "stopped";

type WheelEventlContextValues = {
  wheelData: string[];
  wheelState: WheelState;
  selectedIndex: number | null;
  setWheelData: (data: string[]) => void;
  setSelectedIndex: (selectedIndex: number | null) => void;
  setWheelState: (state: WheelState) => void;
};

const WheelEventlContext = createContext<WheelEventlContextValues>({
  wheelData: [],
  wheelState: "idle",
  selectedIndex: null,
  setWheelData: () => {},
  setSelectedIndex: () => {},
  setWheelState: () => {},
});

export default function WheelProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wheelData, setWheelData] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [wheelState, setWheelState] = useState<WheelState>("idle");

  return (
    <WheelEventlContext.Provider
      value={{
        wheelData,
        selectedIndex,
        wheelState,
        setWheelData,
        setSelectedIndex,
        setWheelState,
      }}
    >
      {children}
    </WheelEventlContext.Provider>
  );
}

export function useWheel() {
  const context = useContext(WheelEventlContext);

  if (context === undefined) {
    throw new Error("useWheel must be used inside of a wheelContext");
  }

  return context;
}

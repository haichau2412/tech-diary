import { createContext, useContext, useState } from "react";

type PlaygroundState = "play" | "work";

type PlaygroundContextValues = {
  theme: PlaygroundState;
  setTheme: (theme: PlaygroundState) => void;
};

const PlaygroundContext = createContext<PlaygroundContextValues>({
  theme: "play",
  setTheme: () => {},
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<PlaygroundState>("play");

  return (
    <PlaygroundContext.Provider value={{ theme, setTheme }}>
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground() {
  const context = useContext(PlaygroundContext);

  if (context === undefined) {
    throw new Error("usePlayground must be used inside of a PlaygroundContext");
  }

  return context;
}

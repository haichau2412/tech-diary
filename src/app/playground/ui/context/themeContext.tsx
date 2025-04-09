import { createContext, useContext, useState } from "react";

type ThemeColors = "blog" | "beat" | "youtube";

type ThemeContextValues = {
  theme: ThemeColors;
  setTheme: (theme: ThemeColors) => void;
};

const ThemeContext = createContext<ThemeContextValues>({
  theme: "youtube",
  setTheme: () => {},
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeColors>("youtube");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used inside of a ThemeProvider");
  }

  return context;
}

"use client";
import { createContext, useContext, useState } from "react";

type MouseLocation = {
  mouseX: number;
  mouseY: number;
};

type TransitionContextValues = {
  show: boolean;
  location: MouseLocation;
  setShow: (show: boolean) => void;
  setMouseLocation: (mouseLocation: MouseLocation) => void;
};

const ThemeContext = createContext<TransitionContextValues>({
  show: false,
  location: {
    mouseX: 0,
    mouseY: 0,
  },
  setShow: () => {},
  setMouseLocation: () => {},
});

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [show, setShow] = useState<boolean>(false);
  const [location, setMouseLocation] = useState<MouseLocation>({
    mouseX: 0,
    mouseY: 0,
  });

  return (
    <ThemeContext.Provider
      value={{ show, setShow, location, setMouseLocation }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTransition must be used inside of a ThemeProvider");
  }

  return context;
}

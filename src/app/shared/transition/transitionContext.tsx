"use client";
import { createContext, useContext, useState } from "react";

type MouseLocation = {
  mouseX: number;
  mouseY: number;
};

type TransitionContextValues = {
  show: boolean;
  location: MouseLocation;
  pageName: string;
  setShow: (show: boolean) => void;
  setPageName: (name: string) => void;
  setMouseLocation: (mouseLocation: MouseLocation) => void;
};

const ThemeContext = createContext<TransitionContextValues>({
  show: false,
  location: {
    mouseX: 0,
    mouseY: 0,
  },
  pageName: "",
  setShow: () => {},
  setMouseLocation: () => {},
  setPageName: () => {},
});

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pageName, setPageName] = useState("");
  const [show, setShow] = useState<boolean>(false);
  const [location, setMouseLocation] = useState<MouseLocation>({
    mouseX: 0,
    mouseY: 0,
  });

  return (
    <ThemeContext.Provider
      value={{
        show,
        setShow,
        location,
        setMouseLocation,
        pageName,
        setPageName,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(
      "useTransition must be used inside of a TransitionProvider",
    );
  }

  return context;
}

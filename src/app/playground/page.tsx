"use client";
import { usePageTransition } from "../shared/transition/transitionContext";
import React from "react";
import Home from "./ui/home/Home";

const DefaultHome = () => {
  const { setShow } = usePageTransition();

  return (
    <Home
      onLoad={() => {
        setTimeout(() => {
          setShow(false);
        }, 500);
      }}
    />
  );
};

export default DefaultHome;

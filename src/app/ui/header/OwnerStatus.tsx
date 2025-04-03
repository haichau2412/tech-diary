"use client";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { getLocalStorage } from "@/app/libs/localStorage";
import axios from "axios";

type Status = "online" | "offline" | "busy";

interface ApiResponse {
  status: Status;
  lastSeen?: number;
}

const TEXT = {
  online: "Chau is online",
  offline: "Chau is offline",
  busy: "Chau is busy",
};

let lastClickTime = 0;

const OwnerStatus = () => {
  const [lastSeen, setLastSeen] = useState<number | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [clickCount, setClickCount] = useState<number>(0);
  const [triggering, setTriggering] = useState<boolean>(false);
  const [secretCode] = useState(getLocalStorage("secretCode"));

  const clickHandler = async () => {
    if (clickCount === 3 || !status) {
      return;
    }

    if (secretCode) {
      const currentTime = new Date().getTime();
      if (currentTime - lastClickTime < 500) {
        setClickCount(clickCount + 1);
      } else {
        setClickCount(1);
      }
      lastClickTime = currentTime;
    }
  };

  useEffect(() => {
    if (!status || triggering) {
      return;
    }

    const updateStatus = async () => {
      try {
        setTriggering(true);
        await axios.post(
          `/onlineStatus`,
          {
            secretCode,
            status: status === "online" ? "offline" : "online",
          },
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          },
        );
      } catch (err: unknown) {
        console.log("err", err);
      } finally {
        setTriggering(false);
        setClickCount(0);
      }
    };

    if (clickCount === 3) {
      updateStatus();
    }
  }, [secretCode, clickCount, status, triggering]);

  useEffect(() => {
    const getOnlineStatus = async () => {
      const result = await axios.get(`/onlineStatus`);
      const data = result.data as ApiResponse;
      setStatus(data.status);
      setLastSeen(data.lastSeen || null);
    };

    getOnlineStatus();

    const interVal = setInterval(getOnlineStatus, 5000);

    // const eventSource = new EventSource(
    //   `${process.env.NEXT_PUBLIC_BE_ORIGIN}/onlineStatus`,
    // );

    // eventSource.onmessage = (event) => {
    //   const data = JSON.parse(event.data) as ApiResponse;

    //   console.log("event", event);

    //   setStatus(data.status);
    //   setLastSeen(data.lastSeen || null);
    // };

    return () => {
      clearInterval(interVal);
    };
  }, []);

  const text = status ? TEXT[status] : "Checking Chau's online status";

  const dotCss = twMerge(
    clsx("h-3 w-3 rounded-full", {
      "bg-green-500": status === "online",
      "bg-gray-500": status === "offline",
      "bg-red-500": status === "busy",
    }),
  );

  const lastSeenAsMinute =
    lastSeen && status !== "online" ? format(new Date(lastSeen), "PPpp") : null;

  return (
    <div
      className="flex w-fit cursor-default items-center space-x-2 rounded-lg bg-gray-200 p-3"
      onClick={clickHandler}
    >
      {status && <span className={dotCss}></span>}
      <p className="text-sm font-medium text-gray-700">
        {text}
        {lastSeenAsMinute && <span>, last seen: {lastSeenAsMinute}</span>}
      </p>
    </div>
  );
};

export default OwnerStatus;

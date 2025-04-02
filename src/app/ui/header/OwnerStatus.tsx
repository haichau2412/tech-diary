"use client";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

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

const OwnerStatus = () => {
  const [lastSeen, setLastSeen] = useState<number | null>(null);
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const secretCode = localStorage.getItem("secretCode");

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_BE_ORIGIN}/onlineStatus`,
      {
        withCredentials: true,
      },
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data) as ApiResponse;

      console.log("event", event);

      setStatus(data.status);
      setLastSeen(data.lastSeen || null);
    };

    const handleBeforeUnload = () => {
      fetch(`${process.env.NEXT_PUBLIC_BE_ORIGIN}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretCode, status: "offline" }),
      });
    };

    if (secretCode) {
      fetch(`${process.env.NEXT_PUBLIC_BE_ORIGIN}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretCode }),
      });
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      eventSource.close();
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
    <div className="flex w-fit items-center space-x-2 rounded-lg bg-gray-200 p-3">
      {status && <span className={dotCss}></span>}
      <p className="text-sm font-medium text-gray-700">
        {text}
        {lastSeenAsMinute && <span>, last seen: {lastSeenAsMinute}</span>}
      </p>
    </div>
  );
};

export default OwnerStatus;

"use client";

import { format } from "date-fns";
import { memo, useState, useEffect } from "react";

const TimeInfo = memo(() => {
  const [{ greeting, dateStr }, setData] = useState({
    greeting: "",
    dateStr: "",
  });

  useEffect(() => {
    const generateData = () => {
      const today = new Date(Date.now());

      const month = format(today, "MMMM");
      const year = format(today, "yyyy");
      const day = format(today, "dd");
      const date = format(today, "EEEE");
      const hour = Number(format(today, "H"));

      let greeting;

      switch (true) {
        case hour <= 12: {
          greeting = "Good morning";
          break;
        }
        case hour <= 18: {
          greeting = "Good afternoon";
          break;
        }
        default:
          greeting = "Good evening";
      }

      setData({
        greeting,
        dateStr: `${date}, ${month} ${day}, ${year}`,
      });
    };

    const time = setInterval(generateData, 60);

    return () => {
      clearInterval(time);
    };
  }, []);

  return (
    <div className="flex flex-grow basis-0 flex-col">
      <div className="text-2xl">{greeting}</div>
      <div className="text-xs">{dateStr}</div>
    </div>
  );
});

export default TimeInfo;

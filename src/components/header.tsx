"use client";
import Link from "next/link";
import { format } from "date-fns";
import { useState, useEffect } from "react";

const Header = () => {
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
    <div className="flex items-center justify-between px-3 py-2">
      <div className="flex flex-grow basis-0 flex-col">
        <div className="text-sm sm:text-2xl">{greeting}</div>
      </div>
      <div className="flex flex-col items-center">
        <Link href="/">
          <h1 className="themeGradientText text-3xl font-bold uppercase sm:text-4xl">
            Chau Tech Shelf
          </h1>
        </Link>
        <div className="text-xs">{dateStr}</div>
      </div>
      <div className="flex flex-grow basis-0 flex-col items-end text-sm sm:text-2xl">
        <div className="text-bold text-right">Are you Chau?</div>
        <button className="loggin">Google login</button>
      </div>
    </div>
  );
};

export default Header;

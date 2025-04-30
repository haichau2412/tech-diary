"use client";
import Link from "next/link";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useAuth } from "@/libs/context/authContext";

const Header = () => {
  const [{ greeting, dateStr }, setData] = useState({
    greeting: "",
    dateStr: "",
  });

  const context = useAuth();

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
    generateData();

    const time = setInterval(generateData, 60 * 1000);

    return () => {
      clearInterval(time);
    };
  }, []);

  return (
    <div className="flex items-center justify-between px-1 py-2 sm:px-3">
      <div className="flex flex-grow basis-0 flex-col">
        <div className="text-sm sm:text-2xl">
          {greeting
            ? `${greeting}${context.isAuthorized ? `${context.userInfo ? `, ${context.userInfo.username}` : ""}` : ", stranger"}!`
            : null}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-green-900 uppercase sm:text-4xl">
            Tech Diary
          </h1>
        </Link>
        <div className="text-xs">{dateStr}</div>
      </div>
      <div className="flex flex-grow basis-0 flex-col items-end text-sm sm:text-2xl">
        {context.isAuthorized ? (
          <>
            <button onClick={context.logout} className="logout">
              Log out
            </button>
          </>
        ) : (
          <>
            <button onClick={context.login} className="loggin">
              Gmail signin
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

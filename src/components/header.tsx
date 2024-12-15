"use client";
import Link from "next/link";
import { format } from "date-fns";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/components/authContext";

const Header = () => {
  const [{ greeting, dateStr }, setData] = useState({
    greeting: "",
    dateStr: "",
  });

  const data = useContext(AuthContext);

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

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BE_ORIGIN}/auth/google`;
  };

  return (
    <div className="flex items-center justify-between px-1 py-2 sm:px-3">
      <div className="flex flex-grow basis-0 flex-col">
        <div className="text-sm sm:text-2xl">{`${greeting}, ${data.isAuthorized ? "Chau" : "stranger"} !`}</div>
      </div>
      <div className="flex flex-col items-center">
        <Link href="/">
          <h1 className="themeGradientText text-2xl font-bold uppercase sm:text-4xl">
            Chau&apos;s Tech
          </h1>
        </Link>
        <div className="text-xs">{dateStr}</div>
      </div>
      <div className="flex flex-grow basis-0 flex-col items-end text-sm sm:text-2xl">
        {data.isAuthorized ? (
          <div className="text-bold text-right">Hello Chau</div>
        ) : (
          <>
            <div className="text-bold text-right">Are you Chau?</div>
            <button onClick={handleLogin} className="loggin">
              Gmail signin
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

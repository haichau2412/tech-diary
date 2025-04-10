"use client";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-5 py-2 font-bold sm:px-[50px]">
      <Link className="flex-grow basis-0 text-blue-800" href={"/playground"}>
        Chau&apos;s playground
      </Link>
      <Link href="/">
        <h1 className="text-sm uppercase text-green-800 sm:text-2xl">
          Chau Tech Diary
        </h1>
      </Link>
      <div className="flex flex-grow basis-0 justify-end gap-1 sm:text-xl">
        <p>My</p>
        <a
          target="_blank"
          rel="noopener"
          href="https://www.linkedin.com/in/chau-luu-0a3378179/"
          className="github socialLink"
        >
          Linkedin
        </a>
        <a
          target="_blank"
          rel="noopener"
          href="https://github.com/haichau2412"
          className="linkedIn socialLink"
        >
          Github
        </a>
      </div>
    </header>
  );
};

export default Header;

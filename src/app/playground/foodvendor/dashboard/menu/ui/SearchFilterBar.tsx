"use client";

import { useState } from "react";

const Search = () => {
  const [searchText, setSearchText] = useState("");

  const onTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const onCancel = () => {
    setSearchText("");
  };

  return (
    <div className="utubeSearchBar">
      <input
        onChange={onTyping}
        type="text"
        aria-label="Search"
        className="input"
        placeholder="Video name..."
        value={searchText}
      />
      <svg
        className="searchIcon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
      </svg>
      <button onClick={onCancel}>
        <svg
          className="closeIcon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </button>
    </div>
  );
};

const Filter = () => {
  return (
    <details className="mb-4">
      <summary className="cursor-pointer text-center text-gray-300">
        Filter Menu ▼
      </summary>
      <input
        type="text"
        id="menuFilter"
        placeholder="Type to filter..."
        className="mt-2 block w-full rounded-md border p-2 text-black"
      />
    </details>
  );
};

const SearchFilterPanel = () => {
  return (
    <div className="flex justify-between">
      <Search />
      <Filter />
    </div>
  );
};

export default SearchFilterPanel;

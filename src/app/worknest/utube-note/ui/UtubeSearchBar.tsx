"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Video } from "../type";

export default function UtubeSearchBar({
  videos,
  setFilterOption,
}: {
  videos: Video[];
  setFilterOption: (d: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [typingText, setTypingText] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [hasSelectedSuggestion, setOnClick] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setTypingText(value);

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        setQuery(value);
      }, 250);
    },
    [setQuery],
  );

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
      setShowDropdown(false);
      setFilterOption("");
    } else {
      if (hasSelectedSuggestion) {
        setShowDropdown(false);
        setFilterOption(query);
        return;
      }
      const results = videos
        .map(({ customName }) => customName)
        .filter((item) => item.toLowerCase().includes(query.toLowerCase()));
      setFiltered(results);
      setShowDropdown(true);
    }
    setActiveIndex(-1);
  }, [query, videos, hasSelectedSuggestion, setFilterOption]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      setTypingText(filtered[activeIndex]);
      setQuery(filtered[activeIndex]);
      setFilterOption(filtered[activeIndex]);
      setShowDropdown(false);
    }
  };

  const handleClick = (item: string) => {
    setTypingText(item);
    setQuery(item);
    setShowDropdown(false);
    setOnClick(true);
    inputRef.current?.blur();
  };

  return (
    <div className="relative mt-1 self-start">
      <div className="utubeSearchBar">
        <input
          value={typingText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          aria-label="Search"
          className="input text-ellipsis"
          placeholder="Video name..."
        />
        <svg
          className="searchIcon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>
        <button
          onClick={() => {
            setQuery("");
            setOnClick(false);
            setTypingText("");
          }}
        >
          <svg
            className="closeIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </div>
      {showDropdown && filtered.length > 0 && (
        <Card className="absolute top-full right-0 left-0 z-10 mt-1 rounded-none py-0 shadow-lg">
          <CardContent className="p-0">
            {filtered.map((item, idx) => (
              <div
                key={item}
                onClick={() => handleClick(item)}
                className={`cursor-pointer px-4 py-2 hover:bg-red-300 ${
                  idx === activeIndex ? "bg-red-200" : ""
                }`}
              >
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

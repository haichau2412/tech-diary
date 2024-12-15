"use client";

import UtubeCarousel from "./UtubeCarousel";

const YouTubeNote = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="sm:grid-cols-utubeNoteSm sm:grid-rows-utubeNoteSm grid h-full max-h-full grid-cols-utubeNote grid-rows-utubeNote overflow-hidden text-sm sm:text-base">
      <>{children}</>
      <UtubeCarousel />
    </div>
  );
};

export default YouTubeNote;

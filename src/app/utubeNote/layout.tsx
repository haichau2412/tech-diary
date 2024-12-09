"use client";

import UtubeCarousel from "./UtubeCarousel";

const YouTubeNote = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid-cols-utubeNote grid-rows-utubeNote grid h-full max-h-full overflow-hidden text-sm sm:text-base">
      <>{children}</>
      <UtubeCarousel items={[]} />
    </div>
  );
};

export default YouTubeNote;

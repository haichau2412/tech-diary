import UtubeSearchBar from "./UtubeSearchBar";
import UtubeList from "./UtubeList";
import { Suspense } from "react";
import Loading from "./loading";

const YouTubeNote = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex h-full max-h-full flex-col items-center overflow-hidden bg-red-50 py-1 text-sm sm:p-1 sm:text-base">
        <UtubeSearchBar />
        <UtubeList />
      </div>
    </Suspense>
  );
};

export default YouTubeNote;

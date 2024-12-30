import UtubeSearchBar from "./UtubeSearchBar";
import UtubeList from "./UtubeList";

const YouTubeNote = () => {
  return (
    <div className="flex h-full max-h-full flex-col items-center overflow-hidden bg-red-50 py-1 text-sm sm:p-1 sm:text-base">
      <UtubeSearchBar />
      <UtubeList />
    </div>
  );
};

export default YouTubeNote;

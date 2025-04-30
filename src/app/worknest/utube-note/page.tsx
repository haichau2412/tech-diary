"use client";
import UtubeSearchBar from "./ui/UtubeSearchBar";
import UtubeContainer from "./ui/UtubeList";
import { Suspense } from "react";
import Loading from "./loading";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const YouTubeNote = () => {
  return (
    <main className="customScrollBar grow overflow-x-hidden overflow-y-auto bg-red-50">
      <Suspense fallback={<Loading />}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} />
          <div className="flex grow flex-col items-center py-1 text-sm sm:p-1 sm:text-base">
            <UtubeSearchBar />
            <UtubeContainer />
          </div>
        </QueryClientProvider>
      </Suspense>
    </main>
  );
};

export default YouTubeNote;

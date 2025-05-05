"use client";
import UtubeContainer from "./ui/UtubeList";
import { Suspense } from "react";
import Loading from "./loading";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HomeFooter from "@/app/ui/footer";
const queryClient = new QueryClient();

const YouTubeNote = () => {
  return (
    <main className="customScrollBar flex grow flex-col overflow-x-hidden overflow-y-auto bg-red-50">
      <Suspense fallback={<Loading />}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} />
          <div className="flex grow flex-col items-center py-1 text-sm sm:p-1 sm:text-base">
            <UtubeContainer />
          </div>
        </QueryClientProvider>
      </Suspense>
      <HomeFooter />
    </main>
  );
};

export default YouTubeNote;

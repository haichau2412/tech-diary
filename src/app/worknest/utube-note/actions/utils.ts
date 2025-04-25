"use server";
import { getVideoId } from "../libs/util";

export const verifyVideoLink = async (link: string) => {
  const videoId = getVideoId(link);

  if (!videoId) {
    return null;
  }
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
  );
  const data = await res.json();
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay for the sake of the example
  if (data.items.length === 0) {
    return null;
  }
  return data.items[0].id;
};

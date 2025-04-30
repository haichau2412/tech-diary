"use server";
import { getVideoId } from "../libs/util";
import { Server_VideoInfo } from "./type";

function removeHashtags(str = "") {
  return str.replace(/#\S+/g, "").trim();
}

export const verifyVideoLink = async (
  link: string,
): Promise<Server_VideoInfo | null> => {
  const videoId = getVideoId(link);

  if (!videoId) {
    return null;
  }

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
  );
  const data = await res.json();

  if (res.status === 200 && data.items && data.items.length > 0) {
    const item = data.items[0];

    const defaultName = removeHashtags(item.snippet.title);
    return {
      videoId,
      defaultName,
    };
  }

  return null;
};

import { postWithCredential } from "@/utils/fetcher";

type ErrorType = {
  message: string;
};

function isErrorType(error: unknown): error is ErrorType {
  return typeof error === "object" && error !== null && "message" in error;
}

function getYouTubeVideoID(url: string) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*(?:\?v=|\/embed\/|\/v\/|\/watch\?v=)([a-zA-Z0-9_-]{11})|youtu\.be\/([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] || match[2] : null;
}

export async function verifyUtube(utubeLink: string): Promise<string | null> {
  try {
    const youtubeId = getYouTubeVideoID(utubeLink);
    await postWithCredential(
      `${process.env.NEXT_PUBLIC_BE_ORIGIN}/verifyVideo`,
      {
        youtubeId,
      },
    );
    return youtubeId;
  } catch (err: unknown) {
    if (isErrorType(err)) {
      console.log("verifyUtube", err.message);
    }
  }

  return null;
}

export async function addUtube(
  utubeLink: string,
  customName?: string,
): Promise<[string | null, boolean | null]> {
  try {
    const youtubeId = getYouTubeVideoID(utubeLink);
    await postWithCredential(
      `${process.env.NEXT_PUBLIC_BE_ORIGIN}/api/videos`,
      {
        youtubeId,
        customName,
      },
    );
    return [null, true];
  } catch (err: unknown) {
    if (isErrorType(err)) {
      return [err.message, null];
    }
  }

  return ["Unknown error", null];
}

import { postWithCredential } from "@/utils/fetcher";
import { getVideoId } from "../libs/util";
type ErrorType = {
  message: string;
};

function isErrorType(error: unknown): error is ErrorType {
  return typeof error === "object" && error !== null && "message" in error;
}

export async function addUtube(
  utubeLink: string,
  customName?: string,
): Promise<[string | null, boolean | null]> {
  try {
    const youtubeId = getVideoId(utubeLink);
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

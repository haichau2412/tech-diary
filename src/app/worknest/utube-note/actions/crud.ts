"use server";
import { getUserInfo } from "@/app/actions/utube/actions";
import { Video as VideoType, Note as NoteType } from "../type";
import { ERROR_CODE } from "./type";
import {
  setNoteDB,
  getNoteDB,
  getVideoDB,
  addVideoDB,
  updateVideoNameDB,
} from "../libs/remoteDBService";

type ErrorCode = number | null;
type ServerActionReturn<T> = [ErrorCode, T];

export const setNote = async (
  youtubeId: string,
  note: NoteType,
): Promise<ServerActionReturn<boolean>> => {
  try {
    const { data } = await getUserInfo();

    if (!data.user?.id) {
      return [ERROR_CODE.NOT_FOUND_USER, false];
    }

    const result = await setNoteDB({
      youtubeId,
      userId: data.user.id,
      note,
    });

    if (result.success) {
      return [null, true];
    }

    return [result.message, false];
  } catch (err) {
    console.log("RUNTIME_ERROR", err);
    return [ERROR_CODE.RUNTIME_ERROR, false];
  }
};

export const getNotes = async (
  youtubeId: string,
): Promise<ServerActionReturn<NoteType[] | null>> => {
  try {
    const { data } = await getUserInfo();

    if (!data.user?.id) {
      return [ERROR_CODE.NOT_FOUND_USER, null];
    }

    const result = await getNoteDB({
      youtubeId,
      userId: data.user.id,
    });

    if (result.success) {
      return [null, result.returnValue];
    }

    return [result.message, null];
  } catch (err) {
    console.log("RUNTIME_ERROR", err);
    return [ERROR_CODE.RUNTIME_ERROR, null];
  }
};

export const getVideos = async (): Promise<
  ServerActionReturn<VideoType[] | null>
> => {
  try {
    const { data } = await getUserInfo();

    if (!data.user?.id) {
      return [ERROR_CODE.NOT_FOUND_USER, null];
    }

    const result = await getVideoDB({ userId: data.user.id });

    if (result.success) {
      return [null, result.returnValue];
    }

    return [result.message, null];
  } catch (err) {
    console.log("RUNTIME_ERROR", err);
    return [ERROR_CODE.RUNTIME_ERROR, null];
  }
};

export const addVideo = async ({
  youtubeId,
  customName,
}: {
  youtubeId: string;
  customName: string;
}): Promise<ServerActionReturn<boolean | null>> => {
  try {
    const { data } = await getUserInfo();

    if (!data.user?.id) {
      return [ERROR_CODE.NOT_FOUND_USER, false];
    }

    const result = await addVideoDB({
      userId: data.user.id,
      youtubeId,
      customName,
    });

    if (result.success) {
      return [null, true];
    }

    return [result.message, null];
  } catch (err) {
    console.log("RUNTIME_ERROR", err);
    return [ERROR_CODE.RUNTIME_ERROR, null];
  }
};

export const updateVideoName = async ({
  youtubeId,
  customName,
}: {
  youtubeId: string;
  customName: string;
}): Promise<ServerActionReturn<boolean | null>> => {
  try {
    const { data } = await getUserInfo();

    if (!data.user?.id) {
      return [ERROR_CODE.NOT_FOUND_USER, false];
    }

    const result = await updateVideoNameDB({
      youtubeId,
      customName,
      userId: data.user.id,
    });

    if (result.success) {
      return [null, true];
    }
    return [result.message, null];
  } catch (err) {
    console.log("RUNTIME_ERROR", err);
    return [ERROR_CODE.RUNTIME_ERROR, null];
  }
};

"use server";
import dbConnect from "@/libs/db/dbConnect";
import { Video, Note } from "@/libs/db/utubeModel";
import { getUserInfo } from "@/app/actions/utube/actions";
import { Video as VideoType, Note as NoteType } from "../type";
import { ERROR_CODE } from "./type";

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

    await dbConnect();

    const video = await Video.findOne({
      youtubeId: youtubeId,
      userId: data.user.id,
    });

    if (video === null) {
      return [ERROR_CODE.NOT_FOUND_VIDEO, false];
    }

    const { from, text } = note;

    const _note = await Note.findOne({
      videoId: video._id,
    });

    const hasNote = !!_note;
    let _allNotes: NoteType[] = [];

    if (_note) {
      _allNotes = _note.notes;
    }
    _allNotes = _allNotes.filter(({ from: _from }) => _from !== from);
    _allNotes.push({ from, text });

    if (hasNote) {
      await Note.findOneAndUpdate(
        {
          videoId: video._id,
        },
        {
          videoId: video._id,
          notes: _allNotes,
        },
        { new: true, upsert: true },
      );
    } else {
      const newNote = new Note({
        videoId: video._id,
        notes: _allNotes,
      });
      await newNote.save();
    }
    return [null, true];
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

    await dbConnect();

    const video = await Video.findOne({
      youtubeId: youtubeId,
      userId: data.user?.id,
    });

    if (video === null) {
      return [null, null];
    }

    const _note = await Note.findOne({
      videoId: video._id,
    });

    if (_note) {
      return [null, _note?.notes];
    }

    return [null, []];
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

    await dbConnect();

    const videos = await Video.find({
      userId: data.user.id,
    });

    if (videos.length === 0) {
      return [null, null];
    }

    return [
      null,
      videos.map(({ youtubeId, customName }) => ({
        youtubeId,
        customName,
      })),
    ];
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

    await dbConnect();

    const video = await Video.findOne({
      youtubeId,
      userId: data.user.id,
    });

    if (!video) {
      const newDoc = new Video({
        youtubeId,
        userId: data.user.id,
        customName: customName,
      });
      await newDoc.save();

      return [null, true];
    }
    return [ERROR_CODE.RESOURCE_EXISTED, null];
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

    await dbConnect();

    await Video.findOneAndUpdate(
      {
        videoId: youtubeId,
        userId: data.user.id,
      },
      {
        customName,
      },
    );
    return [null, true];
  } catch (err) {
    console.log("RUNTIME_ERROR", err);
    return [ERROR_CODE.RUNTIME_ERROR, null];
  }
};

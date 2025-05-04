"use server";
import dbConnect from "@/libs/db/dbConnect";
import { Video as VideoType, Note as NoteType } from "../type";
import { Video, Note } from "@/libs/db/utubeModel";
import { ERROR_CODE } from "../actions/type";

type ValueOf<T> = T[keyof T];

type DB_PostActionResult =
  | {
      success: true;
    }
  | {
      success: false;
      message: ValueOf<typeof ERROR_CODE>;
      returnValue?: never;
    };

type DB_GetActionResult<T> =
  | {
      success: true;
      returnValue: T;
    }
  | {
      success: false;
      message: ValueOf<typeof ERROR_CODE>;
      returnValue?: never;
    };

interface SetNoteProps {
  youtubeId: string;
  userId: string;
  note: NoteType;
}

export const setNoteDB = async ({
  youtubeId,
  userId,
  note,
}: SetNoteProps): Promise<DB_PostActionResult> => {
  try {
    await dbConnect();

    const video = await Video.findOne({
      youtubeId: youtubeId,
      userId,
    });

    if (video === null) {
      return {
        success: false,
        message: ERROR_CODE.NOT_FOUND_USER,
      };
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
  } catch (err) {
    console.log("DB_RUNTIME_ERROR", err);
    return {
      success: false,
      message: ERROR_CODE.DB_ACTION_ERROR,
    };
  }
  return {
    success: true,
  };
};
interface GetNoteProps {
  youtubeId: string;
  userId: string;
}

export const getNoteDB = async ({
  youtubeId,
  userId,
}: GetNoteProps): Promise<DB_GetActionResult<NoteType[]>> => {
  try {
    await dbConnect();

    const video = await Video.findOne({
      youtubeId: youtubeId,
      userId: userId,
    });

    if (video === null) {
      return {
        success: false,
        message: ERROR_CODE.NOT_FOUND_VIDEO,
      };
    }

    const note = await Note.findOne({
      videoId: video._id,
    });

    return {
      success: true,
      returnValue: note.notes || [],
    };
  } catch (err) {
    console.log("DB_RUNTIME_ERROR", err);
    return {
      success: false,
      message: ERROR_CODE.DB_ACTION_ERROR,
    };
  }
};

export const getVideoDB = async ({
  userId,
}: {
  userId: string;
}): Promise<DB_GetActionResult<VideoType[]>> => {
  try {
    await dbConnect();

    const videos = await Video.find({
      userId,
    });

    return {
      success: true,
      returnValue: videos.map(({ youtubeId, customName }) => ({
        youtubeId,
        customName,
      })),
    };
  } catch (err) {
    console.log("DB_RUNTIME_ERROR", err);
    return {
      success: false,
      message: ERROR_CODE.DB_ACTION_ERROR,
    };
  }
};

export const addVideoDB = async ({
  userId,
  youtubeId,
  customName,
}: {
  userId: string;
  youtubeId: string;
  customName: string;
}): Promise<DB_PostActionResult> => {
  try {
    await dbConnect();
    const video = await Video.findOne({
      youtubeId,
      userId,
    });

    if (!video) {
      const newDoc = new Video({
        youtubeId,
        userId,
        customName,
      });
      await newDoc.save();
      return {
        success: true,
      };
    }

    return {
      success: false,
      message: ERROR_CODE.RESOURCE_EXISTED,
    };
  } catch (err) {
    console.log("DB_RUNTIME_ERROR", err);
    return {
      success: false,
      message: ERROR_CODE.DB_ACTION_ERROR,
    };
  }
};

export const updateVideoNameDB = async ({
  userId,
  youtubeId,
  customName,
}: {
  userId: string;
  youtubeId: string;
  customName: string;
}): Promise<DB_PostActionResult> => {
  try {
    await dbConnect();
    await Video.findOneAndUpdate(
      {
        videoId: youtubeId,
        userId: userId,
      },
      {
        customName,
      },
    );
    return {
      success: true,
    };
  } catch (err) {
    console.log("DB_RUNTIME_ERROR", err);
    return {
      success: false,
      message: ERROR_CODE.DB_ACTION_ERROR,
    };
  }
};

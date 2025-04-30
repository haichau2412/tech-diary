import { Video, Note, UtubeMode } from "../type";
import guestDataManager from "./guestDataManager";
import { getVideos, setNote, addVideo, getNotes } from "../actions/crud";

let mode: UtubeMode = null;

const updateMode = (data: UtubeMode) => {
  mode = data;
};

const _getVideos = async (): Promise<Video[] | null> => {
  console.log("_getVideos");
  if (!mode) return null;

  if (mode === "guest") {
    return guestDataManager.getVideos();
  }

  const [error, data] = await getVideos();

  if (error) {
    return null;
  }

  return data;
};

const _setNote = async ({
  youtubeId,
  note,
}: {
  youtubeId: string;
  note: Note;
}): Promise<boolean | null> => {
  if (!mode) return null;

  if (mode === "guest") {
    guestDataManager.setNote(youtubeId, note);
    return true;
  }

  const [error] = await setNote(youtubeId, note);

  return error ? false : true;
};

const _addVideo = async ({
  youtubeId,
  customName,
}: {
  youtubeId: string;
  customName: string;
}) => {
  if (!mode) return null;

  if (mode === "guest") {
    guestDataManager.addVideo(youtubeId, customName);
    return true;
  }

  const [error] = await addVideo({ youtubeId, customName });

  return error ? false : true;
};

const _getNotes = async (youtubeId: string) => {
  console.log("getNotes", getNotes);

  if (!mode) return null;

  if (mode === "guest") {
    return guestDataManager.getNotes(youtubeId);
  }

  const [error, data] = await getNotes(youtubeId);

  console.log("[error, data]", error, data);

  if (error) {
    return [];
  }

  return data;
};

const defaultExport = {
  getVideos: _getVideos,
  setNote: _setNote,
  addVideo: _addVideo,
  getNotes: _getNotes,
  updateMode,
};

export default defaultExport;

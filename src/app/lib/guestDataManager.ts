import { getLocalStorage, setLocalStorage } from "./localStorage";
import EventEmitter from "events";

const LOCAL_KEY_VIDEOS = "videos";
const LOCAL_KEY_NOTES = "notes";

interface MyEvents {
  videoAdded: void;
  videoRemoved: void;
}

class TypedEmitter extends EventEmitter {
  emit<K extends keyof MyEvents>(event: K, payload?: MyEvents[K]): boolean {
    return super.emit(event, payload);
  }
}
const eventEmitter = new TypedEmitter();

let videos: Video[] = [];
let notes: VideoWithNote[] = [];

let initalized = false;

const init = () => {
  if (initalized) return;
  videos = getLocalStorage(LOCAL_KEY_VIDEOS, []);
  notes = getLocalStorage(LOCAL_KEY_NOTES, []);
  initalized = true;
};

const getVideos = () => {
  if (!initalized) {
    init();
  }
  return structuredClone(videos);
};

const addVideo = (youtubeId: string, customName = "Video Name") => {
  const matchVideo = videos.find((video) => video.youtubeId === youtubeId);

  if (!matchVideo) {
    videos.push({
      youtubeId,
      customName,
    });
    setLocalStorage(LOCAL_KEY_VIDEOS, videos);
    eventEmitter.emit("videoAdded");
  }
};

const updateVideoName = (youtubeId: string, customName: string) => {
  const video = videos.find((video) => video.youtubeId === youtubeId);
  if (video) {
    video.customName = customName;
  }
  setLocalStorage(LOCAL_KEY_VIDEOS, videos);
};

const removeVideo = (youtubeId: string) => {
  videos = videos.filter((video) => video.youtubeId !== youtubeId);
  setLocalStorage(LOCAL_KEY_VIDEOS, videos);
};

const setNote = (youtubeId: string, note: Note) => {
  const video = notes.find((video) => video.youtubeId === youtubeId);
  if (video) {
    video.notes = video.notes.filter((n) => n.from !== note.from);
    video.notes.push(note);
  } else {
    notes.push({
      youtubeId,
      notes: [note],
    });
  }
  setLocalStorage(LOCAL_KEY_NOTES, notes);
};

const getNotes = (youtubeId: string) => {
  if (!initalized) {
    init();
  }
  return structuredClone(
    notes.find((video) => video.youtubeId === youtubeId)?.notes || [],
  );
};

const guestDataManager = {
  init,
  addVideo,
  updateVideoName,
  removeVideo,
  getVideos,
  setNote,
  getNotes,
  eventEmitter,
};

export default guestDataManager;

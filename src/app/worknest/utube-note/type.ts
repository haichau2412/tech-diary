export type Video = {
  youtubeId: string;
  customName: string;
};

export type Note = {
  from: number;
  text: string;
};

export type VideoWithNote = {
  youtubeId: string;
  notes: Note[];
};

export type UtubeMode = "guest" | "user" | null;

export type YouTubeNote = {
  id: string;
  duration: number;
  customName: string;
  note: Note;
};

export type Player = {
  playerInfo: {
    duration: number;
  };
};

export type VideoState = "paused" | "playing";

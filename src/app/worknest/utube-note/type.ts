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

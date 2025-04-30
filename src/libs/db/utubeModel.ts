import mongoose, { Schema } from "mongoose";

const VideoSchema = new Schema(
  {
    youtubeId: { type: String, required: true, unique: true },
    customName: { type: String },
    userId: { type: String, required: true },
  },
  { timestamps: true },
);

const IndividualNote = new Schema(
  {
    from: { type: Number, required: true },
    text: { type: String, required: true, maxLength: 200 },
  },
  { _id: false },
);

const NoteSchema = new Schema(
  {
    videoId: { type: Schema.Types.ObjectId, ref: "Video", required: true },
    notes: [IndividualNote],
  },
  { timestamps: true },
);

export const Video =
  mongoose.models.Video || mongoose.model("Video", VideoSchema, "videos");
export const Note =
  mongoose.models.Note || mongoose.model("Note", NoteSchema, "notes");

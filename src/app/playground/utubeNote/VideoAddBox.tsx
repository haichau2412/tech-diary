"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { verifyUtube } from "../../lib/utubeApi";
import guestDataManager from "../../lib/guestDataManager";

type FormValues = {
  link: string;
  customName?: string;
};

const VideoAddBox = () => {
  const { register, handleSubmit } = useForm<FormValues>({});

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const youtubeId = await verifyUtube(data.link);
    if (youtubeId) {
      guestDataManager.addVideo(youtubeId, data.customName);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="utubeElement addUtubeForm"
    >
      <label htmlFor="link">Youtube Links:</label>
      <input
        type="text"
        {...register("link")}
        placeholder="Youtube link..."
        autoComplete="off"
      />
      <label htmlFor="customName">Custom Name:</label>
      <input
        type="text"
        {...register("customName")}
        placeholder="Custom name..."
        autoComplete="off"
      />
      <input type="submit" value="Add new video" />
    </form>
  );
};

export default VideoAddBox;

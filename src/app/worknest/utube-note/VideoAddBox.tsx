"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { verifyVideoLink } from "./actions/utils";
import guestDataManager from "./libs/guestDataManager";

type FormValues = {
  link: string;
  customName?: string;
};

const VideoAddBox = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      link: "",
      customName: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const youtubeId = await verifyVideoLink(data.link);

    if (youtubeId) {
      guestDataManager.addVideo(youtubeId, data.customName);
      reset();
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
      <input
        disabled={isSubmitting}
        type="submit"
        value={`${isSubmitting ? "Verifying..." : "Add new video"}`}
      />
    </form>
  );
};

export default VideoAddBox;

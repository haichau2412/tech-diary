"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { verifyVideoLink } from "../actions/utils";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import dataService from "../libs/dataService";
type FormValues = {
  link: string;
  customName?: string;
};

const VideoAddBox = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: dataService.addVideo,
    onSuccess: () => {
      // Invalidate and refetch queries after mutation
      queryClient.invalidateQueries({ queryKey: ["getVideos"] });
    },
  });

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
    const result = await verifyVideoLink(data.link);
    if (result) {
      const name = data.customName || result.defaultName;
      mutation.mutate({
        youtubeId: result.videoId,
        customName: name,
      });
      reset();
    } else {
    }
  };

  return (
    <>
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
    </>
  );
};

export default VideoAddBox;

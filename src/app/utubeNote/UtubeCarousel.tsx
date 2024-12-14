"use client";

import { useRef, useContext } from "react";
import { AuthContext } from "@/components/authContext";
import useSWR from "swr";
import { getWithCredential, postWithCredential } from "@/utils/fetcher";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

type FormValues = {
  link: string;
  customName?: string;
};

function getYouTubeVideoID(url: string) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*(?:\?v=|\/embed\/|\/v\/|\/watch\?v=)([a-zA-Z0-9_-]{11})|youtu\.be\/([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] || match[2] : null;
}

const ImportYoutube = () => {
  const { register, handleSubmit } = useForm<FormValues>({});
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const youtubeId = getYouTubeVideoID(data.link);
      if (youtubeId) {
        try {
          await postWithCredential(
            `${process.env.NEXT_PUBLIC_BE_ORIGIN}/api/videos`,
            {
              youtubeId,
              customName: data.customName,
            },
          );
        } catch (err) {
          console.log("err", err);
        }
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="addUtubeForm">
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
      <input type="submit" value="Submit" />
    </form>
  );
};

const Carousel = () => {
  const { isAuthorized } = useContext(AuthContext);

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BE_ORIGIN}/api/videos`,
    getWithCredential,
  );

  console.log(
    "{ data, error, isLoading } ",
    isAuthorized,
    data,
    error,
    isLoading,
  );

  const currentRef = useRef<HTMLDivElement>(null);

  const renderLoading = () => {
    return <div className="">Loading</div>;
  };

  return (
    <div className="relative col-span-2 flex max-w-full items-center gap-3 border-2 border-t-0 border-solid border-red-900 px-2 py-3">
      {isLoading ? (
        renderLoading()
      ) : (
        <>
          <ImportYoutube />
          <div
            ref={currentRef}
            className="customScrollBarUtube flex snap-x snap-mandatory gap-2 overflow-x-scroll scroll-smooth"
          >
            {data?.data?.map((i) => {
              return (
                <div
                  key={i.youtubeId}
                  className="flex h-fit w-[200px] flex-shrink-0 snap-start flex-col place-content-center truncate text-wrap"
                >
                  <Image
                    src={`https://img.youtube.com/vi/${i.youtubeId}/0.jpg`}
                    alt=""
                  />

                  <Link
                    className="max-w-full truncate text-ellipsis text-center"
                    href={`/utubeNote/${i.youtubeId}`}
                  >
                    {i.customName || "no name"}
                  </Link>
                </div>
              );
            })}
          </div>
          <div
            className="absolute left-[220px] top-1/2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-red-300 p-1 hover:bg-red-800 active:bg-red-700"
            onClick={() => {
              if (currentRef.current) {
                currentRef.current.scrollLeft -= 400;
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </div>
          <div
            onClick={() => {
              if (currentRef.current) {
                currentRef.current.scrollLeft += 400;
              }
            }}
            className="absolute right-0 top-1/2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-red-300 p-1 hover:bg-red-800 active:bg-red-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;

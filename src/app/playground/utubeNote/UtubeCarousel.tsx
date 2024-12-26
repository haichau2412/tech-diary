"use client";

import { useRef, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/components/authContext";
import useSWR from "swr";
import { getWithCredential } from "@/utils/fetcher";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { verifyUtube, addUtube } from "../../lib/utubeApi";
import guestDataManager from "../../lib/guestDataManager";

type FormValues = {
  link: string;
  customName?: string;
};

const ImportYoutube = () => {
  const { isAuthorized } = useContext(AuthContext);

  const { register, handleSubmit } = useForm<FormValues>({});
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (isAuthorized) {
      const [error, success] = await addUtube(data.link, data.customName);

      if (error) {
      }

      if (success) {
        if (await verifyUtube(data.link)) {
          //success
        }
      }
    } else {
      const youtubeId = await verifyUtube(data.link);
      if (youtubeId) {
        guestDataManager.addVideo(youtubeId, data.customName);
      }
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
  const [guestData, setGuestData] = useState(guestDataManager.getVideos());

  const { data, isLoading } = useSWR(
    isAuthorized ? `${process.env.NEXT_PUBLIC_BE_ORIGIN}/api/videos` : null,
    getWithCredential<{ data: Video[] }>,
  );

  let _data = guestData;

  if (isAuthorized && data) {
    _data = data.data;
  }

  useEffect(() => {
    const listener = () => {
      setGuestData(guestDataManager.getVideos());
    };
    if (!isAuthorized) {
      guestDataManager.eventEmitter.on("videoAdded", listener);
    }

    return () => {
      if (!isAuthorized) {
        guestDataManager.eventEmitter.off("videoAdded", listener);
      }
    };
  }, [isAuthorized]);

  const currentRef = useRef<HTMLDivElement>(null);

  const renderContent = () => {
    if (isAuthorized) {
      if (isLoading) {
        return <div className="">Loading</div>;
      }
    }

    return (
      <>
        <ImportYoutube />
        <div
          ref={currentRef}
          className="customScrollBar flex snap-x snap-mandatory gap-2 overflow-x-scroll scroll-smooth"
        >
          {_data.map((i) => {
            return (
              <Link
                key={i.youtubeId}
                href={`/utubeNote/${i.youtubeId}`}
                className="cursor-pointer"
              >
                <div className="flex h-fit w-[150px] flex-shrink-0 snap-start flex-col place-content-center truncate text-wrap sm:w-[200px]">
                  <div className="relative aspect-[3/2]">
                    <Image
                      role="presentation"
                      priority={false}
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 768px) 200px, 100px"
                      src={`https://img.youtube.com/vi/${i.youtubeId}/0.jpg`}
                      alt=""
                    />
                  </div>

                  <p className="max-w-full truncate text-ellipsis text-center">
                    {i.customName || "no name"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <>
          <div
            className="navBtn absolute left-[170px] sm:left-[220px]"
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
            className="navBtn absolute right-0"
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
      </>
    );
  };

  return (
    <div className="relative flex max-w-full items-center gap-3 border-2 border-solid border-red-900 px-2 py-3 sm:col-span-2">
      {renderContent()}
    </div>
  );
};

export default Carousel;

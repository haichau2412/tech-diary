import UtubeNote from "../UtubeNote";

const UtubeNotePage = async ({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) => {
  const videoId = (await params).videoId;

  return <UtubeNote videoId={videoId} />;
};

export default UtubeNotePage;

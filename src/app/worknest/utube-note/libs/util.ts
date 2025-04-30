export function getVideoId(url: string) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*(?:\?v=|\/embed\/|\/v\/|\/watch\?v=)([a-zA-Z0-9_-]{11})|youtu\.be\/([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] || match[2] : null;
}

export const formatTime = (time: number) => {
  const sec = time % 60;
  const min = Math.floor(time / 60);
  const hour = Math.floor(time / (60 * 60));

  const result = [];

  if (hour) {
    result.unshift(hour);
  }

  result.push(min, sec);

  return result.join(":").replace(/\b(\d)\b/g, "0$1");
};

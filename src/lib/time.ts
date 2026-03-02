export const formatTime = (seconds: string | number) => {
  // 최대 시간
  const totalSeconds = Math.min(Number(seconds), 300);

  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  //   1분도 안걸릴때 앞에 0붙이기
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

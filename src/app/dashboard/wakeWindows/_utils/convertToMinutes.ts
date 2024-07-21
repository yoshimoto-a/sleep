export const convertToMinutes = (timeString: string) => {
  //入力された値が空なら0を返す
  if (timeString === "時間分") return 0;
  const regex = /(\d+)時間(\d+)分/;
  const match = regex.exec(timeString);

  if (!match || match.length < 3) {
    throw new Error("入力値が不正です");
  }

  const hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);

  return hours * 60 + minutes;
};

export const convertMinutesToHoursAndMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return { hours, mins };
};

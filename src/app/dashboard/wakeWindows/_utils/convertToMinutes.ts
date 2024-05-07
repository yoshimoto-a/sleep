export const convertToMinutes = (timeString: string) => {
  const regex = /(\d+)時間(\d+)分/;
  const match = regex.exec(timeString);

  if (!match || match.length < 3) {
    throw new Error("Invalid time string format");
  }

  const hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);

  return hours * 60 + minutes;
};

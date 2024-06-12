import dayjs from "dayjs";

export const timeZone = (time: dayjs.Dayjs) => {
  //各活動時間で算出した時刻がどの時間帯に該当するか確認する
  const timeRanges = {
    wakeupTime: { start: 6, end: 7 },
    morning: { start: 8, end: 10 },
    noon: { start: 11, end: 14 },
    evening: { start: 15, end: 17 },
    night: [
      { start: 18, end: 24 },
      { start: 0, end: 5 },
    ],
  };
  if (
    time.hour() >= timeRanges.wakeupTime.start &&
    time.hour() <= timeRanges.wakeupTime.end
  ) {
    return "wakeupTime";
  }
  if (
    time.hour() >= timeRanges.morning.start &&
    time.hour() <= timeRanges.morning.end
  ) {
    return "morning";
  }
  if (
    time.hour() >= timeRanges.noon.start &&
    time.hour() <= timeRanges.noon.end
  ) {
    return "noon";
  }
  if (
    time.hour() >= timeRanges.evening.start &&
    time.hour() <= timeRanges.evening.end
  ) {
    return "evening";
  }
  if (
    (time.hour() >= timeRanges.night[0].start &&
      time.hour() <= timeRanges.night[0].end) ||
    (time.hour() >= timeRanges.night[1].start &&
      time.hour() <= timeRanges.night[1].end)
  ) {
    return "night";
  }
};

import { SleepingSituation } from "@prisma/client";
import { dayjs } from "../../../../../utils/dayjs";
export const splitDataByDate = (
  data: SleepingSituation[],
  dateRanges: { startOfDay: Date; endOfDay: Date }[]
) => {
  const result: SleepingSituation[][] = [];
  dateRanges.forEach(range => {
    const filteredData = data.filter(item => {
      const bedTimeInRange =
        item.bedTime &&
        dayjs(item.bedTime).isBetween(
          range.startOfDay,
          range.endOfDay,
          null,
          "[]"
        );
      const sleepInRange =
        item.sleep &&
        dayjs(item.sleep).isBetween(
          range.startOfDay,
          range.endOfDay,
          null,
          "[]"
        );
      const wakeupInRange =
        item.wakeup &&
        dayjs(item.wakeup).isBetween(
          range.startOfDay,
          range.endOfDay,
          null,
          "[]"
        );
      return bedTimeInRange || sleepInRange || wakeupInRange;
    });
    result.push(filteredData);
  });
  return result;
};

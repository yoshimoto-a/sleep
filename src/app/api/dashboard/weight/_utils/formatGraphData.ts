import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Weight } from "@/app/_types/apiRequests/dashboard/weight/Index";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");
export const formatGraphData = (data: Weight[], birthday: Date | undefined) => {
  const weightMeasurements = data.map(({ measurementDate, weight }) => ({
    measurementDate,
    weight,
  }));
  return weightMeasurements.map(item => ({
    monthAge: dayjs(item.measurementDate)
      .tz()
      .diff(dayjs(birthday).tz(), "month"),
    weight: item.weight,
  }));
};

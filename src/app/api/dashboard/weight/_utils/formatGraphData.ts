import { dayjs } from "../../../../../utils/dayjs";
import { Weight } from "@/app/_types/apiRequests/dashboard/weight/Index";
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

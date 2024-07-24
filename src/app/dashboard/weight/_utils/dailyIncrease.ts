import { dayjs } from "../../../../utils/dayjs";
import { Weight } from "@/app/_types/apiRequests/dashboard/weight/Index";
export const dailyIncrease = (
  currentRowData: Weight,
  previousRowData: Weight
): string => {
  const dayDiff = dayjs(currentRowData.measurementDate).diff(
    dayjs(previousRowData.measurementDate),
    "day"
  );
  const weightDiff = currentRowData.weight - previousRowData.weight;

  return Math.round(weightDiff / dayDiff).toString();
};

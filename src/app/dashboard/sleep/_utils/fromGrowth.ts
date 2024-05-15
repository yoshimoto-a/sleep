import dayjs from "dayjs";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/advancedSetting";
export const fromGrowth = (growthData: IndexResponse | undefined) => {
  if (!growthData || !("data" in growthData)) return 0;
  const practicing = growthData.data.filter(
    item => item.startedAt && !item.archevedAt
  );
  const justMade = growthData.data.filter(item =>
    dayjs(item.archevedAt).subtract(7, "day")
  );
};

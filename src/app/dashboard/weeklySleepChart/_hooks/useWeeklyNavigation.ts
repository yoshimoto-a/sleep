import dayjs from "dayjs";
import { useState } from "react";

export const useWeeklyNavigation = () => {
  const [date, setDate] = useState(new Date());
  const onClickNext = () => {
    setDate(dayjs(date).add(7, "days").toDate());
  };

  const onClickPrev = () => {
    setDate(dayjs(date).add(-7, "days").toDate());
  };
  return { date, onClickNext, onClickPrev };
};

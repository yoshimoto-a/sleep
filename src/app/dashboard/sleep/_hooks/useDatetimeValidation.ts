import { useState } from "react";

interface DatetimeState {
  bedTime: Date | null;
  sleep: Date;
  wakeup: Date;
}

export const useDatetimeValidation = () => {
  const [allDatetime, setAllDatetime] = useState<DatetimeState>({
    bedTime: null,
    sleep: new Date(),
    wakeup: new Date(),
  });
  const [errors, setErrors] = useState({
    sleepError: "",
    wakeupError: "",
  });

  const handleChange = (date: Date | null, action: keyof DatetimeState) => {
    setAllDatetime({ ...allDatetime, [action]: date });
    const isInvalidDate = !date || isNaN(date.getTime());
    if (action === "sleep") {
      setErrors({
        ...errors,
        sleepError: isInvalidDate ? "日時は必須です" : "",
      });
    }
    if (action === "wakeup") {
      setErrors({
        ...errors,
        wakeupError: isInvalidDate ? "日時は必須です" : "",
      });
    }
  };

  return {
    allDatetime,
    errors,
    handleChange,
  };
};

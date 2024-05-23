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
    if (action === "sleep") {
      setErrors({ ...errors, sleepError: !date ? "日時は必須です" : "" });
    }
    if (action === "wakeup") {
      setErrors({ ...errors, wakeupError: !date ? "日時は必須です" : "" });
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {
      sleepError: "",
      wakeupError: "",
    };

    if (!allDatetime.sleep) {
      newErrors.sleepError = "日時は必須です";
      isValid = false;
    }

    if (!allDatetime.wakeup) {
      newErrors.wakeupError = "日時は必須です";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return {
    allDatetime,
    errors,
    handleChange,
    validate,
  };
};

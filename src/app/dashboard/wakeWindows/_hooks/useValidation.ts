import { useState, useCallback } from "react";
import { WakeWindowsData } from "@/app/_types/dashboard/wakeWindowsData";

export const useValidation = () => {
  const [basicHour, setBasicHour] = useState<string>("");
  const [basicMinutes, setBasicMinutes] = useState<string>("");
  const [basicMinutesError, setBasicMinutesError] = useState<string>("");
  const [basicHourError, setBasicHourError] = useState<string>("");
  const [morningHour, setMorningHour] = useState<string>("");
  const [morningHourError, setMorningHourError] = useState<string>("");
  const [morningMinutes, setMorningMinutes] = useState<string>("");
  const [morningMinutesError, setMorningMinutesError] = useState<string>("");
  const [afternoonHour, setAfternoonHour] = useState<string>("");
  const [afternoonHourError, setAfternoonHourError] = useState<string>("");
  const [afternoonMinutes, setAfternoonMinutes] = useState<string>("");
  const [afternoonMinutesError, setAfternoonMinutesError] =
    useState<string>("");
  const [eveningHour, setEveningHour] = useState<string>("");
  const [eveningHourError, setEveningHourError] = useState<string>("");
  const [eveningMinutes, setEveningMinutes] = useState<string>("");
  const [eveningMinutesError, setEveningMinutesError] = useState<string>("");
  const [sinceBedtime, setSinceBedtime] = useState<number>(0);

  const setting = useCallback((data: WakeWindowsData) => {
    data.activityTime.map(item => {
      const hours = Math.floor(item.time / 60).toString();
      const minutes = (item.time % 60).toString();
      switch (item.type) {
        case "ALL":
          setBasicHour(hours);
          setBasicMinutes(minutes);
          break;
        case "MORNING":
          setMorningHour(hours);
          setMorningMinutes(minutes);
          break;
        case "NOON":
          setAfternoonHour(hours);
          setAfternoonMinutes(minutes);
          break;
        case "EVENING":
          setEveningHour(hours);
          setEveningMinutes(minutes);
          break;
      }
    });
    setSinceBedtime(data.sleepPrepTime.time);
  }, []);

  const handleCahngeBasicHour = (val: string) => {
    setBasicHour(val);
    if (isNaN(Number(val))) {
      setBasicHourError("数値を入力してください");
    } else {
      setBasicHourError("");
    }
  };
  const handleCahngeBasicMinutes = (val: string) => {
    setBasicMinutes(val);
    if (isNaN(Number(val))) {
      setBasicMinutesError("数値を入力してください");
    } else {
      setBasicMinutesError("");
    }
  };
  const handleCahngeMorningHour = (val: string) => {
    setMorningHour(val);
    if (isNaN(Number(val))) {
      setMorningHourError("数値を入力してください");
    } else {
      setMorningHourError("");
    }
  };
  const handleCahngeMorningMinutes = (val: string) => {
    setMorningMinutes(val);
    if (isNaN(Number(val))) {
      setMorningMinutesError("数値を入力してください");
    } else {
      setMorningMinutesError("");
    }
  };
  const handleCahngeAfternoonHour = (val: string) => {
    setAfternoonHour(val);
    if (isNaN(Number(val))) {
      setAfternoonHourError("数値を入力してください");
    } else {
      setAfternoonHourError("");
    }
  };
  const handleCahngeAfternoonMinutes = (val: string) => {
    setAfternoonMinutes(val);
    if (isNaN(Number(val))) {
      setAfternoonMinutesError("数値を入力してください");
    } else {
      setAfternoonMinutesError("");
    }
  };
  const handleCahngeEveningHour = (val: string) => {
    setEveningHour(val);
    if (isNaN(Number(val))) {
      setEveningHourError("数値を入力してください");
    } else {
      setEveningHourError("");
    }
  };
  const handleCahngeEveningMinutes = (val: string) => {
    setEveningMinutes(val);
    if (isNaN(Number(val))) {
      setEveningMinutesError("数値を入力してください");
    } else {
      setEveningMinutesError("");
    }
  };

  return {
    basicHour,
    basicMinutes,
    basicMinutesError,
    basicHourError,
    morningHour,
    morningHourError,
    morningMinutes,
    morningMinutesError,
    afternoonHour,
    afternoonHourError,
    afternoonMinutes,
    afternoonMinutesError,
    eveningHour,
    eveningHourError,
    eveningMinutes,
    eveningMinutesError,
    sinceBedtime,
    setSinceBedtime,
    handleCahngeAfternoonHour,
    handleCahngeAfternoonMinutes,
    handleCahngeBasicHour,
    handleCahngeBasicMinutes,
    handleCahngeEveningHour,
    handleCahngeMorningHour,
    handleCahngeMorningMinutes,
    handleCahngeEveningMinutes,
    setting,
  };
};

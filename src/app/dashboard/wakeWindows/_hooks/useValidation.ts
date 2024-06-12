import { useState, useCallback } from "react";
import { WakeWindowsData } from "@/app/_types/dashboard/wakeWindowsData";

export const useValidation = () => {
  const [basicHour, setBasicHour] = useState("");
  const [basicMinutes, setBasicMinutes] = useState("");
  const [basicMinutesError, setBasicMinutesError] = useState("");
  const [basicHourError, setBasicHourError] = useState("");
  const [morningHour, setMorningHour] = useState("");
  const [morningHourError, setMorningHourError] = useState("");
  const [morningMinutes, setMorningMinutes] = useState("");
  const [morningMinutesError, setMorningMinutesError] = useState("");
  const [afternoonHour, setAfternoonHour] = useState("");
  const [afternoonHourError, setAfternoonHourError] = useState("");
  const [afternoonMinutes, setAfternoonMinutes] = useState("");
  const [afternoonMinutesError, setAfternoonMinutesError] = useState("");
  const [eveningHour, setEveningHour] = useState("");
  const [eveningHourError, setEveningHourError] = useState("");
  const [eveningMinutes, setEveningMinutes] = useState("");
  const [eveningMinutesError, setEveningMinutesError] = useState("");
  const [sinceBedtime, setSinceBedtime] = useState(0);

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
    if (isNaN(Number(val)) || !val) {
      setBasicHourError("数値を入力してください");
    } else {
      setBasicHourError("");
    }
  };
  const handleCahngeBasicMinutes = (val: string) => {
    setBasicMinutes(val);
    if (isNaN(Number(val)) || !val) {
      setBasicMinutesError("数値を入力してください");
    } else {
      setBasicMinutesError("");
    }
  };
  const handleCahngeMorningHour = (val: string) => {
    setMorningHour(val);
    if (isNaN(Number(val)) || !val) {
      setMorningHourError("数値を入力してください");
    } else {
      setMorningHourError("");
    }
  };
  const handleCahngeMorningMinutes = (val: string) => {
    setMorningMinutes(val);
    if (isNaN(Number(val)) || !val) {
      setMorningMinutesError("数値を入力してください");
    } else {
      setMorningMinutesError("");
    }
  };
  const handleCahngeAfternoonHour = (val: string) => {
    setAfternoonHour(val);
    if (isNaN(Number(val)) || !val) {
      setAfternoonHourError("数値を入力してください");
    } else {
      setAfternoonHourError("");
    }
  };
  const handleCahngeAfternoonMinutes = (val: string) => {
    setAfternoonMinutes(val);
    if (isNaN(Number(val)) || !val) {
      setAfternoonMinutesError("数値を入力してください");
    } else {
      setAfternoonMinutesError("");
    }
  };
  const handleCahngeEveningHour = (val: string) => {
    setEveningHour(val);
    if (isNaN(Number(val)) || !val) {
      setEveningHourError("数値を入力してください");
    } else {
      setEveningHourError("");
    }
  };
  const handleCahngeEveningMinutes = (val: string) => {
    setEveningMinutes(val);
    if (isNaN(Number(val)) || !val) {
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

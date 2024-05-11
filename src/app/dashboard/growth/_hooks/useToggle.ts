import { useCallback, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../layout";
import { findMilestone } from "../_utils/findMilestone";
import { useApi } from "@/app/_hooks/useApi";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/advancedSetting";
import { updateRequests } from "@/app/_types/apiRequests/dashboard/advancedSetting/updateRequest";
import { UpdateResponse } from "@/app/_types/apiRequests/dashboard/advancedSetting/updateResponse";
export interface State {
  [key: string]: boolean;
}
export interface DateState {
  [key: string]: Date | null | undefined;
}

export const useToggle = (
  data: IndexResponse | undefined
): {
  state: State;
  handlers: { [key: string]: () => void };
  date: DateState;
  setDate: (date: DateState) => void;
  setState: (state: State) => void;
  setData: () => void;
  updateDate: (key: string, isActive: boolean, date: Date) => void;
} => {
  const [dbUserId] = useContext(UserContext);
  const apiRequests = useApi();
  const [state, setState] = useState<State>({
    turningOver: false,
    turningOverAndOver: false,
    crawling: false,
    sitting: false,
    crawlingOnHandAndKnees: false,
    pullingUpToStand: false,
    cruising: false,
    standing: false,
    walking: false,
    turningOverComp: false,
    turningOverAndOverComp: false,
    crawlingComp: false,
    sittingComp: false,
    crawlingOnHandAndKneesComp: false,
    pullingUpToStandComp: false,
    cruisingComp: false,
    standingComp: false,
    walkingComp: false,
  });
  const [date, setDate] = useState<DateState>({
    turningOverDate: null,
    turningOverAndOverDate: null,
    crawlingDate: null,
    sittingDate: null,
    crawlingOnHandAndKneesDate: null,
    pullingUpToStandDate: null,
    cruisingDate: null,
    standingDate: null,
    walkingDate: null,
    turningOverCompDate: null,
    turningOverAndOverCompDate: null,
    crawlingCompDate: null,
    sittingCompDate: null,
    crawlingOnHandAndKneesCompDate: null,
    pullingUpToStandCompDate: null,
    cruisingCompDate: null,
    standingCompDate: null,
    walkingCompDate: null,
  });
  const updateDate = async (key: string, isActive: boolean, date: Date) => {
    if (!dbUserId) return;
    setDate(prevDates => ({
      ...prevDates,
      [`${key}Date`]: isActive ? date : null,
    }));
    const name = findMilestone(key);
    if (data?.status !== 200 || !("data" in data)) return;
    const targetData = data.data.find(item => item.milestone === name);
    if (!targetData) {
      alert("データない");
      return;
    }
    const { id, babyId } = targetData;
    const payload = {
      id,
      data: {
        babyId,
        startedAt: date,
        archevedAt: new Date(),
        changeUser: dbUserId,
      },
    };
    const resp = await apiRequests.put<updateRequests, UpdateResponse>(
      "/api/dashboard/growth",
      payload
    );
    if (resp.status !== 200) {
      // API更新が失敗した場合、トグルの状態をもとに戻す
      const nextState = !state[key];
      setState(prevState => ({
        ...prevState,
        [key]: nextState,
      }));
      alert("更新失敗");
    }
  };

  const handlers: { [key: string]: () => void } = {};

  for (const key of Object.keys(state)) {
    handlers[`handleChange${key.charAt(0).toUpperCase() + key.slice(1)}`] =
      () => {
        const nextState = !state[key];
        setState(prevState => ({
          ...prevState,
          [key]: nextState,
        }));
        updateDate(key, nextState, new Date());
      };
  }

  const setData = useCallback(() => {
    if (data?.status !== 200 || !("data" in data)) return;
    data.data.forEach(item => {
      switch (item.milestone) {
        case "TURNING_OVER":
          setDate({
            ...date,
            turningOverDate: item.startedAt,
            turningOverCompDate: item.archevedAt,
          });

          setState({
            ...state,
            turningOver: !!item.startedAt,
            turningOverComp: !!item.archevedAt,
          });
          break;
        case "TURNING_OVER_AND_OVER":
          setDate({
            ...date,
            turningOverAndOverDate: item.startedAt,
            turningOverAndOverCompDate: item.archevedAt,
          });

          setState({
            ...state,
            turningOverAndOver: !!item.startedAt,
            turningOverAndOverComp: !!item.archevedAt,
          });
          break;
        case "CRAWLING":
          setDate({
            ...date,
            crawlingDate: item.startedAt,
            crawlingCompDate: item.archevedAt,
          });
          setState({
            ...state,
            crawling: !!item.startedAt,
            crawlingComp: !!item.archevedAt,
          });
          break;
        case "SITTING":
          setDate({
            ...date,
            sittingDate: item.startedAt,
            sittingCompDate: item.archevedAt,
          });
          setState({
            ...state,
            sitting: !!item.startedAt,
            sittingComp: !!item.archevedAt,
          });
          break;
        case "CRAWLING_ON_HANDS_AND_KNEES":
          setDate({
            ...date,
            crawlingOnHandAndKneesDate: item.startedAt,
            crawlingOnHandAndKneesCompDate: item.archevedAt,
          });
          setState({
            ...state,
            crawlingOnHandAndKnees: !!item.startedAt,
            crawlingOnHandAndKneesComp: !!item.archevedAt,
          });
          break;
        case "PULLING_UP_TO_STAND":
          setDate({
            ...date,
            pullingUpToStandDate: item.startedAt,
            pullingUpToStandCompDate: item.archevedAt,
          });
          setState({
            ...state,
            pullingUpToStand: !!item.startedAt,
            pullingUpToStandComp: !!item.archevedAt,
          });
          break;
        case "CRUISING":
          setDate({
            ...date,
            cruisingDate: item.startedAt,
            cruisingCompDate: item.archevedAt,
          });
          setState({
            ...state,
            cruising: !!item.startedAt,
            cruisingComp: !!item.archevedAt,
          });
          break;
        case "STANDING":
          setDate({
            ...date,
            standingDate: item.startedAt,
            standingCompDate: item.archevedAt,
          });
          setState({
            ...state,
            standing: !!item.startedAt,
            standingComp: !!item.archevedAt,
          });
          break;
      }
    });
  }, [date, state, data]);
  return { state, handlers, date, setDate, setState, setData, updateDate };
};

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
  const updateDate = async (
    key: string,
    isActive: boolean,
    date: Date | null
  ) => {
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
    const { id, babyId, startedAt, archevedAt } = targetData;
    !isActive && (date = null);
    const payload = {
      id,
      data: {
        babyId,
        startedAt: key.includes("Comp") ? startedAt : date,
        archevedAt: key.includes("Comp") ? date : archevedAt,
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
    const _state: State = {
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
    };
    const _date: DateState = {
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
    };

    data.data.forEach(item => {
      switch (item.milestone) {
        case "TURNING_OVER":
          _date.turningOverDate = item.startedAt;
          _date.turningOverCompDate = item.archevedAt;
          _state.turningOver = !!item.startedAt;
          _state.turningOverComp = !!item.archevedAt;
          break;
        case "TURNING_OVER_AND_OVER":
          _date.turningOverAndOverDate = item.startedAt;
          _date.turningOverAndOverCompDate = item.archevedAt;
          _state.turningOverAndOver = !!item.startedAt;
          _state.turningOverAndOverComp = !!item.archevedAt;
          break;
        case "CRAWLING":
          _date.crawlingDate = item.startedAt;
          _date.crawlingCompDate = item.archevedAt;
          _state.crawling = !!item.startedAt;
          _state.crawlingComp = !!item.archevedAt;
          break;
        case "SITTING":
          _date.sittingDate = item.startedAt;
          _date.sittingCompDate = item.archevedAt;
          _state.sitting = !!item.startedAt;
          _state.sittingComp = !!item.archevedAt;
          break;
        case "CRAWLING_ON_HANDS_AND_KNEES":
          _date.crawlingOnHandAndKneesDate = item.startedAt;
          _date.crawlingOnHandAndKneesCompDate = item.archevedAt;
          _state.crawlingOnHandAndKnees = !!item.startedAt;
          _state.crawlingOnHandAndKneesComp = !!item.archevedAt;
          break;
        case "PULLING_UP_TO_STAND":
          _date.pullingUpToStandDate = item.startedAt;
          _date.pullingUpToStandCompDate = item.archevedAt;
          _state.pullingUpToStand = !!item.startedAt;
          _state.pullingUpToStandComp = !!item.archevedAt;
          break;
        case "CRUISING":
          _date.cruisingDate = item.startedAt;
          _date.cruisingCompDate = item.archevedAt;
          _state.cruising = !!item.startedAt;
          _state.cruisingComp = !!item.archevedAt;
          break;
        case "STANDING":
          _date.standingDate = item.startedAt;
          _date.standingCompDate = item.archevedAt;
          _state.standing = !!item.startedAt;
          _state.standingComp = !!item.archevedAt;
          break;
        case "WALKING":
          _date.walkingDate = item.startedAt;
          _date.walkingCompDate = item.archevedAt;
          _state.walking = !!item.startedAt;
          _state.walkingComp = !!item.archevedAt;
          break;
      }
    });
    setDate(_date);
    setState(_state);
  }, [data, setDate, setState]);

  return { state, handlers, date, setDate, setState, setData, updateDate };
};

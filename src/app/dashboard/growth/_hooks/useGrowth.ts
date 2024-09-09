import { useCallback, useState, useEffect } from "react";
import { useGetGrowth } from "../../_hooks/useGetGrowth";
import { DateState } from "../_types/DateState";
import { State } from "../_types/State";
import { findMilestone } from "../_utils/findMilestone";
import { initializeDateState } from "../_utils/initializeDateState";
import { initializeState } from "../_utils/initializeState";
import { useApi } from "@/app/_hooks/useApi";
import { updateRequests } from "@/app/_types/apiRequests/dashboard/advancedSetting/updateRequest";
import { UpdateResponse } from "@/app/_types/apiRequests/dashboard/advancedSetting/updateResponse";

export const useGrowth = () => {
  const apiRequests = useApi();
  const { isLoading, data, error } = useGetGrowth();
  const [state, setState] = useState<State>(initializeState());
  const [dateState, setDateState] = useState<DateState>(initializeDateState());
  const updateDate = async (
    key: string,
    isActive: boolean,
    date: Date | null
  ) => {
    setDateState(prevDates => ({
      ...prevDates,
      [`${key}Date`]: isActive ? date : null,
    }));
    const name = findMilestone(key);
    const targetData = data?.data.find(item => item.milestone === name);
    if (!targetData) {
      alert("データがありません");
      return;
    }
    const { id, startedAt, archevedAt } = targetData;
    const payload = {
      id,
      data: {
        startedAt: key.includes("Comp") ? startedAt : date,
        archevedAt: key.includes("Comp") ? date : archevedAt,
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
      return;
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
        updateDate(key, nextState, nextState ? new Date() : null);
      };
  }

  const setData = useCallback(() => {
    if (data?.status !== 200) return;
    const _state: State = initializeState();
    const _date: DateState = initializeDateState();

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
    setDateState(_date);
    setState(_state);
  }, [data, setDateState, setState]);

  useEffect(() => {
    if (isLoading) return;
    setData();
  }, [isLoading, setData]);

  return {
    state,
    handlers,
    date: dateState,
    isLoading,
    error,
    updateDate,
  };
};

import { useState } from "react";

export interface State {
  [key: string]: boolean;
}
export interface DateState {
  [key: string]: Date | null | undefined;
}

export const useToggle = (): {
  state: State;
  handlers: { [key: string]: () => void };
  date: DateState;
  updateDate: (key: string, isActive: boolean, date: Date) => void;
} => {
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

  const updateDate = (key: string, isActive: boolean, date: Date) => {
    console.log(`${key}Date`, isActive, date);
    setDate(prevDates => ({
      ...prevDates,
      [`${key}Date`]: isActive ? date : null,
    }));
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
  console.log(date);
  return { state, handlers, date, updateDate };
};

import { DateState } from "../_hooks/useToggle";
import { State } from "../_hooks/useToggle";
import { Growth } from "@/app/_types/apiRequests/dashboard/advancedSetting";
export const setDateSwitch = (
  data: Growth[],
  date: DateState,
  setDate: (date: DateState) => void,
  state: State,
  setState: (state: State) => void
) => {
  for (const item of data) {
    const milestoneLowercase = item.milestone.toLowerCase();
    const milestoneCamelCase = milestoneLowercase.replace(/_[a-z]/g, match =>
      match[1].toUpperCase()
    );

    const newDate = {
      ...date,
      [`${milestoneCamelCase}Date`]: item.startedAt,
      [`${milestoneCamelCase}CompDate`]: item.archevedAt,
    };
    setDate(newDate);

    const newState = {
      ...state,
      [milestoneCamelCase]: !!item.startedAt,
      [`${milestoneCamelCase}Comp`]: !!item.archevedAt,
    };
    setState(newState);
  }
  // data.map(item => {
  //   switch (item.milestone) {
  //     case "TURNING_OVER":
  //       setDate({
  //         ...date,
  //         turningOverDate: item.startedAt,
  //         turningOverCompDate: item.archevedAt,
  //       });

  //       setState({
  //         ...state,
  //         turningOver: !!item.startedAt,
  //         turningOverComp: !!item.archevedAt,
  //       });
  //       break;
  //     case "TURNING_OVER_AND_OVER":
  //       setDate({
  //         ...date,
  //         turningOverAndOverDate: item.startedAt,
  //         turningOverAndOverCompDate: item.archevedAt,
  //       });

  //       setState({
  //         ...state,
  //         turningOverAndOver: !!item.startedAt,
  //         turningOverAndOverComp: !!item.archevedAt,
  //       });
  //       break;
  //     case "CRAWLING":
  //       setDate({
  //         ...date,
  //         crawlingDate: item.startedAt,
  //         crawlingCompDate: item.archevedAt,
  //       });
  //       setState({
  //         ...state,
  //         crawling: !!item.startedAt,
  //         crawlingComp: !!item.archevedAt,
  //       });
  //       break;
  //     case "SITTING":
  //       setDate({
  //         ...date,
  //         sittingDate: item.startedAt,
  //         sittingCompDate: item.archevedAt,
  //       });
  //       setState({
  //         ...state,
  //         sitting: !!item.startedAt,
  //         sittingComp: !!item.archevedAt,
  //       });
  //       break;
  //     case "CRAWLING_ON_HANDS_AND_KNEES":
  //       setDate({
  //         ...date,
  //         crawlingOnHandAndKneesDate: item.startedAt,
  //         crawlingOnHandAndKneesCompDate: item.archevedAt,
  //       });
  //       setState({
  //         ...state,
  //         crawlingOnHandAndKnees: !!item.startedAt,
  //         crawlingOnHandAndKneesComp: !!item.archevedAt,
  //       });
  //       break;
  //     case "PULLING_UP_TO_STAND":
  //       setDate({
  //         ...date,
  //         pullingUpToStandDate: item.startedAt,
  //         pullingUpToStandCompDate: item.archevedAt,
  //       });
  //       setState({
  //         ...state,
  //         pullingUpToStand: !!item.startedAt,
  //         pullingUpToStandComp: !!item.archevedAt,
  //       });
  //       break;
  //     case "CRUISING":
  //       setDate({
  //         ...date,
  //         cruisingDate: item.startedAt,
  //         cruisingCompDate: item.archevedAt,
  //       });
  //       setState({
  //         ...state,
  //         cruising: !!item.startedAt,
  //         cruisingComp: !!item.archevedAt,
  //       });
  //       break;
  //     case "STANDING":
  //       setDate({
  //         ...date,
  //         standingDate: item.startedAt,
  //         standingCompDate: item.archevedAt,
  //       });
  //       setState({
  //         ...state,
  //         standing: !!item.startedAt,
  //         standingComp: !!item.archevedAt,
  //       });
  //       break;
  //   }
  // });
};

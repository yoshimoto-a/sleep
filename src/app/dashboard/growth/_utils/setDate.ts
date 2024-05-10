import { DateState } from "../_hooks/useToggle";
import { State } from "../_hooks/useToggle";
import { Growth } from "@/app/_types/apiRequests/dashboard/advancedSetting";
export const setDateSwitch = (
  data: Growth[],
  setDate: (date: DateState) => void,
  setState: (state: State) => void
) => {
  data.map(item => {
    switch (item.milestone) {
      case "TURNING_OVER":
        setDate({
          turningOverDate: item.startedAt,
          turningOverCompDate: item.archevedAt,
        });
        setState({
          turningOver: !!item.startedAt,
          turningOverComp: !!item.archevedAt,
        });
        break;
      case "TURNING_OVER_AND_OVER":
        setDate({
          turningOverAndOverDate: item.startedAt,
          turningOverAndOverCompDate: item.archevedAt,
        });
        setState({
          turningOverAndOver: !!item.startedAt,
          turningOverAndOverComp: !!item.archevedAt,
        });
        break;
      case "CRAWLING":
        setDate({
          crawlingDate: item.startedAt,
          crawlingCompDate: item.archevedAt,
        });
        setState({
          crawling: !!item.startedAt,
          crawlingComp: !!item.archevedAt,
        });
        break;
      case "SITTING":
        setDate({
          sittingDate: item.startedAt,
          sittingCompDate: item.archevedAt,
        });
        setState({ sitting: !!item.startedAt, sittingComp: !!item.archevedAt });
        break;
      case "CRAWLING_ON_HANDS_AND_KNEES":
        setDate({
          crawlingOnHandAndKneesDate: item.startedAt,
          crawlingOnHandAndKneesCompDate: item.archevedAt,
        });
        setState({
          crawlingOnHandAndKnees: !!item.startedAt,
          crawlingOnHandAndKneesComp: !!item.archevedAt,
        });
        break;
      case "PULLING_UP_TO_STAND":
        setDate({
          pullingUpToStandDate: item.startedAt,
          pullingUpToStandCompDate: item.archevedAt,
        });
        setState({
          pullingUpToStand: !!item.startedAt,
          pullingUpToStandComp: !!item.archevedAt,
        });
        break;
      case "CRUISING":
        setDate({
          cruisingDate: item.startedAt,
          cruisingCompDate: item.archevedAt,
        });
        setState({
          cruising: !!item.startedAt,
          cruisingComp: !!item.archevedAt,
        });
        break;
      case "STANDING":
        setDate({
          standingDate: item.startedAt,
          standingCompDate: item.archevedAt,
        });
        setState({
          standing: !!item.startedAt,
          standingComp: !!item.archevedAt,
        });
        break;
    }
  });
};

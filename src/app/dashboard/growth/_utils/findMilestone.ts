import { Milestone } from "@prisma/client";
export const findMilestone = (key: string): Milestone | undefined => {
  switch (key) {
    case "turningOver":
    case "turningOverComp":
      return "TURNING_OVER";
    case "turningOverAndOver":
    case "turningOverAndOverComp":
      return "TURNING_OVER_AND_OVER";
    case "crawling":
    case "crawlingComp":
      return "CRAWLING";
    case "sitting":
    case "sittingComp":
      return "SITTING";
    case "crawlingOnHandAndKnees":
    case "crawlingOnHandAndKneesComp":
      return "CRAWLING_ON_HANDS_AND_KNEES";
    case "pullingUpToStand":
    case "pullingUpToStandComp":
      return "PULLING_UP_TO_STAND";
    case "cruising":
    case "cruisingComp":
      return "CRUISING";
    case "standing":
    case "standingComp":
      return "STANDING";
    case "walking":
    case "walkingComp":
      return "WALKING";
    default:
      return undefined;
  }
};

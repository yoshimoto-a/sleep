import { ButtonNames } from "../_types/Buttons";
export const filterButtonNames = (
  latestAction: string | undefined,
  hasLatestBedtimeData: boolean | undefined
): ButtonNames[] => {
  //latestAction,hasLatestBedtimeDataいずれかがundefinedの時はどちらもundefinedになる。
  if (hasLatestBedtimeData) {
    return ["一括登録", "寝た"];
  }
  switch (latestAction) {
    case "寝た":
      return ["一括登録", "起きた"];
    case "起きた":
      return ["一括登録", "寝かしつけ", "寝た"];
    default:
      //登録のデータがない時がこのケースになる
      return ["一括登録", "寝かしつけ", "寝た"];
  }
};

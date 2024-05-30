"use client";
import { useEffect } from "react";
import { useGetGrowth } from "../_hooks/useGetGrowth";
import { ColumnName } from "./_components/ColumnName";
import { ToggleRow } from "./_components/ToggleRow";
import { useToggle } from "./_hooks/useToggle";
import { IsLoading } from "@/app/_components/isLoading";

export default function Page() {
  const { isLoading, data, error } = useGetGrowth();
  const { state, handlers, date, setData, updateDate } = useToggle(data);
  useEffect(() => {
    setData();
  }, [isLoading]);
  if (isLoading) return <IsLoading></IsLoading>;

  if (error) return "An error has occurred.";
  return (
    <div className="flex flex-col mx-5">
      <h1 className="pt-10 text-center text-lg">発達記録</h1>
      <div className="flex justify-between items-center gap-4 h-[55px]">
        <ColumnName title="項目"></ColumnName>
        <ColumnName title="練習開始"></ColumnName>
        <ColumnName title="習得"></ColumnName>
      </div>
      <ToggleRow
        label="寝返り"
        isCheckedStart={state.turningOver}
        onChangeStart={handlers.handleChangeTurningOver}
        onUpdateStart={updateDate}
        startDate={date.turningOverDate}
        startValue="turningOver"
        isCheckedComp={state.turningOverComp}
        onChangeComp={handlers.handleChangeTurningOverComp}
        onUpdateComp={updateDate}
        compDate={date.turningOverCompDate}
        compValue="turningOverComp"
      ></ToggleRow>
      <ToggleRow
        label="寝返り返り"
        isCheckedStart={state.turningOverAndOver}
        onChangeStart={handlers.handleChangeTurningOverAndOver}
        onUpdateStart={updateDate}
        startDate={date.turningOverAndOverDate}
        startValue="turningOverAndOver"
        isCheckedComp={state.turningOverAndOverComp}
        onChangeComp={handlers.handleChangeTurningOverAndOverComp}
        onUpdateComp={updateDate}
        compDate={date.turningOverAndOverCompDate}
        compValue="turningOverAndOverComp"
      ></ToggleRow>
      <ToggleRow
        label="ずり這い"
        isCheckedStart={state.crawling}
        onChangeStart={handlers.handleChangeCrawling}
        onUpdateStart={updateDate}
        startDate={date.crawlingDate}
        startValue="crawling"
        isCheckedComp={state.crawlingComp}
        onChangeComp={handlers.handleChangeCrawlingComp}
        onUpdateComp={updateDate}
        compDate={date.crawlingCompDate}
        compValue="crawlingComp"
      ></ToggleRow>
      <ToggleRow
        label="ハイハイ"
        isCheckedStart={state.crawlingOnHandAndKnees}
        onChangeStart={handlers.handleChangeCrawlingOnHandAndKnees}
        onUpdateStart={updateDate}
        startDate={date.crawlingOnHandAndKneesDate}
        startValue="crawlingOnHandAndKnees"
        isCheckedComp={state.crawlingOnHandAndKneesComp}
        onChangeComp={handlers.handleChangeCrawlingOnHandAndKneesComp}
        onUpdateComp={updateDate}
        compDate={date.crawlingOnHandAndKneesCompDate}
        compValue="crawlingOnHandAndKneesComp"
      ></ToggleRow>
      <ToggleRow
        label="お座り"
        isCheckedStart={state.sitting}
        onChangeStart={handlers.handleChangeSitting}
        onUpdateStart={updateDate}
        startDate={date.sittingDate}
        startValue="sitting"
        isCheckedComp={state.sittingComp}
        onChangeComp={handlers.handleChangeSittingComp}
        onUpdateComp={updateDate}
        compDate={date.sittingCompDate}
        compValue="sittingComp"
      ></ToggleRow>
      <ToggleRow
        label="つかまり立ち"
        isCheckedStart={state.pullingUpToStand}
        onChangeStart={handlers.handleChangePullingUpToStand}
        onUpdateStart={updateDate}
        startDate={date.pullingUpToStandDate}
        startValue="pullingUpToStand"
        isCheckedComp={state.pullingUpToStandComp}
        onChangeComp={handlers.handleChangePullingUpToStandComp}
        onUpdateComp={updateDate}
        compDate={date.pullingUpToStandCompDate}
        compValue="pullingUpToStandComp"
      ></ToggleRow>
      <ToggleRow
        label="つたい歩き"
        isCheckedStart={state.cruising}
        onChangeStart={handlers.handleChangeCruising}
        onUpdateStart={updateDate}
        startDate={date.cruisingDate}
        startValue="cruising"
        isCheckedComp={state.cruisingComp}
        onChangeComp={handlers.handleChangeCruisingComp}
        onUpdateComp={updateDate}
        compDate={date.cruisingCompDate}
        compValue="cruisingComp"
      ></ToggleRow>
      <ToggleRow
        label="立つ"
        isCheckedStart={state.standing}
        onChangeStart={handlers.handleChangeStanding}
        onUpdateStart={updateDate}
        startDate={date.standingDate}
        startValue="standing"
        isCheckedComp={state.standingComp}
        onChangeComp={handlers.handleChangeStandingComp}
        onUpdateComp={updateDate}
        compDate={date.standingCompDate}
        compValue="standingComp"
      ></ToggleRow>
      <ToggleRow
        label="歩く"
        isCheckedStart={state.walking}
        onChangeStart={handlers.handleChangeWalking}
        onUpdateStart={updateDate}
        startDate={date.walkingDate}
        startValue="walking"
        isCheckedComp={state.walkingComp}
        onChangeComp={handlers.handleChangeWalkingComp}
        onUpdateComp={updateDate}
        compDate={date.walkingCompDate}
        compValue="walkingComp"
      ></ToggleRow>
    </div>
  );
}

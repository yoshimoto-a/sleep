"use client";
import { ToggleRow } from "./_components/ToggleRow";
import { useGetGrowth } from "./_hooks/useGetGrowth";
import { useToggle } from "./_hooks/useToggle";

export default function Page() {
  const { state, handlers, date, updateDate } = useToggle();
  const { getIsLoading, data } = useGetGrowth();

  if (getIsLoading) return;
  if (data?.status !== 200 || !("data" in data)) return;

  data.data.map(item => {
    switch (item.milestone) {
      case "TURNING_OVER":
      //console.log(item.startedAt);
    }
  });

  return (
    <div className="flex flex-col mx-5">
      <h1>発達記録</h1>
      <div className="flex justify-between items-center gap-4">
        <span className="w-1/4 text-center">項目</span>
        <span className="w-1/4 text-center">練習開始</span>
        <span className="w-1/4 text-center">習得</span>
      </div>

      {/* <div className="flex justify-between items-center gap-4">
        <div className="w-1/4 text-center">寝返り返り</div>
        <div className="w-1/4 text-center">
          <Toggle
            isChecked={state.isCheckedTurningOverAndOver}
            handleChange={handlers.handleChangeTurningOverAndOver}
            date={
              !date.turningOverAndOverDate
                ? ""
                : dayjs(date.turningOverAndOverDate).format("YYYY-MM-DD")
            }
            openModal={() => openModal("turningOverAndOver")}
          ></Toggle>
          <CustomModal
            isOpen={modalStates.turningOverAndOver}
            onClose={() => closeModal("turningOverAndOver")}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20"
          >
            <InputDate
              closeModal={() => closeModal("turningOverAndOver")}
              value="turningOverAndOver"
              state={state.turningOverAndOver}
              updateDate={updateDate}
            ></InputDate>
          </CustomModal>
        </div>
        <div className="w-1/4 text-center">
          <Toggle
            isChecked={state.isCheckedTurningOverAndOverComp}
            handleChange={handlers.handleChangeTurningOverAndOverComp}
            date={
              !date.turningOverAndOverCompDate
                ? ""
                : dayjs(date.turningOverAndOverCompDate).format("YYYY-MM-DD")
            }
            openModal={() => openModal("turningOverAndOverComp")}
          ></Toggle>
          <CustomModal
            isOpen={modalStates.turningOverAndOverComp}
            onClose={() => closeModal("turningOverAndOverComp")}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20"
          >
            <InputDate
              closeModal={() => closeModal("turningOverAndOverComp")}
              value="turningOverAndOverComp"
              state={state.turningOverAndOverComp}
              updateDate={updateDate}
            ></InputDate>
          </CustomModal>
        </div>
      </div> */}
      {/* <div className="flex justify-between items-center gap-4">
        <ToggleWithInputModal
          isChecked={state.turningOverAndOverComp}
          onChange={handlers.handleChangeTurningOverAndOverComp}
          onUpdate={updateDate}
          date={date.turningOverAndOverCompDate}
          value="turningOverAndOverComp"
        ></ToggleWithInputModal>
      </div> */}

      <ToggleRow
        label="寝返り返り"
        rowItem={[
          {
            isChecked: state.turningOverAndOver,
            onChange: handlers.handleChangeTurningOverAndOver,
            onUpdate: updateDate,
            date: date.turningOverAndOverDate,
            value: "turningOverAndOver",
          },
          {
            isChecked: state.turningOverAndOverComp,
            onChange: handlers.handleChangeTurningOverAndOverComp,
            onUpdate: updateDate,
            date: date.turningOverAndOverCompDate,
            value: "turningOverAndOverComp",
          },
        ]}
      ></ToggleRow>
    </div>
  );
}

"use client";
import dayjs from "dayjs";
// import { useState } from "react";
import { InputDate } from "./_components/inputDate";
import { Toggle } from "./_components/toggle";
import { useModal } from "./_hooks/useModal";
import { useToggle } from "./_hooks/useToggle";
// import { getToggles } from "./_utils/toggles";
import { CustomModal } from "@/app/_components/modal";

export default function Page() {
  const { modalStates, openModal, closeModal } = useModal({
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
  const { state, handlers, date, updateDate } = useToggle();
  // const toggles = getToggles(state, handlers, date);
  return (
    <div className="flex flex-col mx-5">
      <h1>発達記録</h1>
      <div className="flex justify-between items-center gap-4">
        <span className="w-1/4 text-center">項目</span>
        <span className="w-1/4 text-center">練習開始</span>
        <span className="w-1/4 text-center">習得</span>
      </div>
      {/* {toggles.map((toggle, index) => (
        <div key={index} className="flex justify-between items-center gap-4">
          <div className="w-1/4 text-center">{toggle.label}</div>
          <div className="w-1/4 text-center">{toggle.label}</div>
          <div className="w-1/4 text-center">
            <Toggle
              isChecked={toggle.state}
              handleChange={toggle.handleChange}
              date={!toggle.date ? "" : dayjs(toggle.date).format("YYYY-MM-DD")}
              openModal={openModal}
            ></Toggle>
            <CustomModal
              isOpen={isOpen}
              onClose={closeModal}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20"
            >
              <InputDate
                closeModal={closeModal}
                value={toggle.value}
                state={toggle.state}
                updateDate={updateDate}
              ></InputDate>
            </CustomModal>
          </div>
        </div>
      ))} */}

      {/* <div className="flex justify-between items-center gap-4">
        <div className="w-1/4 text-center">寝返り</div>
        <div className="w-1/4 text-center">
          <Toggle
            isChecked={state.isCheckedTurningOver}
            handleChange={handlers.handleChangeTurningOver}
            date={
              !date.turningOverDate
                ? ""
                : dayjs(date.turningOverDate).format("YYYY-MM-DD")
            }
            openModal={openModal}
          ></Toggle>
          <CustomModal
            isOpen={isOpen}
            onClose={closeModal}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20"
          >
            <InputDate
              closeModal={closeModal}
              value="turningOver"
              state={state.turningOver}
              updateDate={updateDate}
            ></InputDate>
          </CustomModal>
        </div>
        <div className="w-1/4 text-center">
          <Toggle
            isChecked={state.isCheckedTurningOverComp}
            handleChange={handlers.handleChangeTurningOverComp}
            date={
              !date.turningOverCompDate
                ? ""
                : dayjs(date.turningOverCompDate).format("YYYY-MM-DD")
            }
            openModal={openModal}
          ></Toggle>
          <CustomModal
            isOpen={isOpen}
            onClose={closeModal}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20"
          >
            <InputDate
              closeModal={closeModal}
              value="turningOverComp"
              state={state.turningOverComp}
              updateDate={updateDate}
            ></InputDate>
          </CustomModal>
        </div>
      </div> */}
      <div className="flex justify-between items-center gap-4">
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
      </div>
    </div>
  );
}

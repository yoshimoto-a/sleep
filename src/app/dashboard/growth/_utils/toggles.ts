import { State } from "../_hooks/useToggle";
import { DateState } from "../_hooks/useToggle";

export const getToggles = (
  state: State,
  handlers: { [key: string]: () => void },
  date: DateState
) => [
  {
    label: "寝返り",
    isChecked: state.isCheckedTurningOver,
    handleChange: handlers.handleChangeTurningOver,
    date: date.turningOverDate,
    value: "turningOver",
    state: state.turningOver,
  },
  {
    label: "寝返り完了",
    isChecked: state.isCheckedTurningOverComp,
    handleChange: handlers.handleChangeTurningOverComp,
    date: date.turningOverCompDate,
    value: "turningOverComp",
    state: state.turningOverComp,
  },
];

import dayjs from "dayjs";
import { Action } from "../_types/action";
interface Props {
  id: Action;
  label: string;
  date: Date | null;
  err: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const InputDatetime: React.FC<Props> = ({
  id,
  label,
  date,
  err,
  onChange,
}) => {
  return (
    <div className="flex flex-col items-center pb-5">
      <label>{label}</label>
      <input
        id={id}
        type="datetime-local"
        value={dayjs(date).format("YYYY-MM-DDTHH:mm")}
        className="block p-2 border text-center"
        onChange={onChange}
      />
      {err && <span className="text-red-500">{err}</span>}
    </div>
  );
};

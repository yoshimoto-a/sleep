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
    <>
      <label className="flex justify-center">{label}</label>
      <input
        id={id}
        type="datetime-local"
        value={dayjs(date).format("YYYY-MM-DDTHH:mm")}
        className="block p-2 m-5 border"
        onChange={onChange}
      />
      <span>{err}</span>
    </>
  );
};

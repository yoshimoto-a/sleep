import { Input } from "@/app/_components/input";
import { Label } from "@/app/_components/label";

type InputType = "text" | "date" | "gender";

type InputMode =
  | "search"
  | "email"
  | "tel"
  | "text"
  | "url"
  | "none"
  | "numeric"
  | "decimal"
  | undefined;

interface Props {
  label: string;
  id: string;
  type: InputType;
  value: string;
  placeholder: string;
  inputMode: InputMode;
  disabled: boolean;
  onChange: (value: string) => void;
  error: string;
}
export const FormSection: React.FC<Props> = ({
  label,
  id,
  type,
  value,
  placeholder,
  inputMode,
  disabled,
  onChange,
  error,
}) => (
  <div className="mb-4">
    <Label text={label} htmlFor={id} />
    <Input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      inputMode={inputMode}
      disabled={disabled}
      onChange={onChange}
    />
    {error && <div className="text-red-500">{error}</div>}
  </div>
);

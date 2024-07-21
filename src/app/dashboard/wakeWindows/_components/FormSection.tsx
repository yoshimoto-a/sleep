import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Input } from "./Input";
import { Label } from "@/app/_components/label";

interface Props {
  label: string;
  idHour: string;
  idMinute: string;
  disabled: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}
export const FormSection: React.FC<Props> = ({
  label,
  idHour,
  idMinute,
  disabled,
  errors,
  register,
}) => {
  const errorMessage = errors[idHour]?.message || errors[idMinute]?.message;

  return (
    <div className="flex-1">
      <Label text={label} />
      <div className="flex gap-1">
        <Input
          id={idHour}
          type="text"
          placeholder="時間"
          inputMode="numeric"
          isSubmitting={disabled}
          validation={{
            required: "数値",
          }}
          register={register}
        />
        <Input
          id={idMinute}
          type="text"
          placeholder="分"
          inputMode="numeric"
          isSubmitting={disabled}
          validation={{
            required: "数値",
          }}
          register={register}
        />
      </div>
      {(errors[idHour] || errors[idMinute]) &&
        typeof errorMessage === "string" && (
          <p className="mb-2 text-sm text-red-500">{errorMessage}</p>
        )}
    </div>
  );
};

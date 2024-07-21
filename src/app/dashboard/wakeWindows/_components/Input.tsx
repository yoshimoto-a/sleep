import { RegisterOptions, UseFormRegister } from "react-hook-form";
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
  type: string;
  placeholder: string;
  validation: RegisterOptions;
  id: string;
  inputMode: InputMode;
  register: UseFormRegister<any>;
  isSubmitting: boolean;
}
export const Input: React.FC<Props> = ({
  type,
  placeholder,
  validation,
  id,
  register,
  isSubmitting,
}) => {
  return (
    <div className="mb-4">
      <input
        className="bg-custom-gray py-2 px-3 text-gray-700 leading-tight w-full"
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={isSubmitting}
        {...register(id, validation)}
      />
    </div>
  );
};

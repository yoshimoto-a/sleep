import { RegisterOptions, UseFormRegister, FieldErrors } from "react-hook-form";
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
  name: string;
  inputMode: InputMode;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isSubmitting: boolean;
}
export const Input: React.FC<Props> = ({
  type,
  placeholder,
  validation,
  name,
  register,
  isSubmitting,
  errors,
}) => {
  const errorMessage = errors[name]?.message;
  return (
    <div className="mb-4">
      <input
        className="bg-custom-gray py-2 px-3 text-gray-700 leading-tight w-full"
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={isSubmitting}
        {...register(name, validation)}
      />
      {errors[name] && typeof errorMessage === "string" && (
        <p className="mb-2 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

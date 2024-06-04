import React from "react";

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
  id: string;
  value: string;
  placeholder: string;
  inputMode: InputMode;
  disabled: boolean;
  onChange: (value: string) => void;
}

export const Input: React.FC<Props> = ({
  type,
  id,
  value,
  placeholder,
  inputMode,
  disabled,
  onChange,
}) => {
  return (
    <input
      className="bg-custom-gray py-2 px-3 mb-5 text-gray-700 leading-tight w-full"
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      inputMode={inputMode}
      disabled={disabled}
      onChange={e => onChange(e.target.value)}
    />
  );
};

import React from "react";

interface Props {
  type: string;
  id: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export const Input: React.FC<Props> = ({
  type,
  id,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <input
      className="bg-custom-gray py-2 px-3 mb-5 text-gray-700 leading-tight w-full"
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
    />
  );
};

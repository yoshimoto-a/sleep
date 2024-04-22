import { Gender } from "@prisma/client";
import React from "react";

interface Props {
  id: string;
  name: string;
  value: string;
  label: string;
  checkedValue: Gender | "";
  onChange: (value: string) => void;
}

export const InputRadio: React.FC<Props> = ({
  id,
  name,
  value,
  label,
  onChange,
  checkedValue,
}) => {
  return (
    <div className="mr-5 inline">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={value === checkedValue}
        onChange={e => onChange(e.target.value)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

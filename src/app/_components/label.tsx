import React from "react";

interface Props {
  htmlFor: string;
  text: string;
}

export const Label: React.FC<Props> = ({ htmlFor, text }) => {
  return (
    <label htmlFor={htmlFor} className="w-[240px] text-sm">
      {text}
    </label>
  );
};

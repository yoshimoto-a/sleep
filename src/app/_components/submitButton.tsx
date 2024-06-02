import React from "react";

interface Props {
  disabled: boolean;
  children: React.ReactNode;
}
export const SubmitButton: React.FC<Props> = ({ disabled, children }) => {
  return (
    <div className="text-center">
      <button
        disabled={disabled}
        className="rounded-full w-32 bg-blue-500 text-white py-2"
        type="submit"
      >
        {children}
      </button>
    </div>
  );
};

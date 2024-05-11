import React from "react";

interface Props {
  children: React.ReactNode;
}
export const SubmitButton: React.FC<Props> = ({ children }) => {
  return (
    <button
      className="rounded-full w-32 bg-blue-500 text-white py-2"
      type="submit"
    >
      {children}
    </button>
  );
};

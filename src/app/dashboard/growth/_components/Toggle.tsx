import React from "react";
interface Props {
  isChecked: boolean;
  handleChange: () => void;
  date: string;
  openModal: () => void;
}

export const Toggle: React.FC<Props> = ({
  isChecked,
  handleChange,
  date,
  openModal,
}) => {
  return (
    <>
      <div className="flex justify-center">
        <label className="relative flex cursor-pointer items-center">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={isChecked}
            onChange={() => handleChange()}
          />
          <div className="h-7 w-14 rounded-full bg-gray-200 after:absolute after:left-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white" />
        </label>
      </div>
      <div className="text-gray-900 " onClick={openModal}>
        {date}
      </div>
    </>
  );
};

import React, { FC, ReactNode } from "react";
import Modal from "react-modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const CustomModal: FC<Props> = ({ isOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      {children}
      <button onClick={onClose}>閉じる</button>
    </Modal>
  );
};

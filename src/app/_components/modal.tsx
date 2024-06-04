import React, { FC, ReactNode } from "react";
import Modal from "react-modal";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className: string;
};

export const CustomModal: FC<Props> = ({
  isOpen,
  onClose,
  className,
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={className}
      ariaHideApp={false} //警告消すために必要
    >
      {children}
    </Modal>
  );
};

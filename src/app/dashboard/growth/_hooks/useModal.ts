import { useState } from "react";

export const useModal = (initialState: Record<string, boolean>) => {
  const [modalStates, setModalStates] =
    useState<Record<string, boolean>>(initialState);

  const openModal = (modalId: string) => {
    setModalStates(prevState => ({
      ...prevState,
      [modalId]: true,
    }));
  };

  const closeModal = (modalId: string) => {
    setModalStates(prevState => ({
      ...prevState,
      [modalId]: false,
    }));
  };

  return { modalStates, openModal, closeModal };
};

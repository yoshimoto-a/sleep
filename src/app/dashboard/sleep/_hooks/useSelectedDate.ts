"use client";
import { useState } from "react";

export const useSelectableDate = (
  date: Date,
  setGetDate: (date: Date) => void
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date);
  const [modalDate, setModalDate] = useState(selectedDate);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectedDate(modalDate);
    setGetDate(modalDate);
    setIsOpen(false);
  };
  return {
    isOpen,
    setIsOpen,
    selectedDate,
    setModalDate,
    handleSubmit,
  };
};

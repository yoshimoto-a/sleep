"use client";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/setting";

export const GetBaby = async (token: string, babyId: number) => {
  const resp = await fetch(`/api/dashboard/setting?id=${babyId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (resp.status !== 200) {
    throw new Error(`HTTP error. status: ${resp.status}`);
  }
  const data: IndexResponse = await resp.json();
  return data;
};

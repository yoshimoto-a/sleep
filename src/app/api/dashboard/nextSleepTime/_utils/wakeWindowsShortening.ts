import { Growth } from "@prisma/client";

export const wakeWindowsShortening = (
  practicing: Growth[],
  acquisition: Growth[],
  walking: Growth[]
) => {
  let shortening: number = 0;
  practicing.length != 0 && (shortening += 15);
  acquisition.length != 0 && (shortening += 15);
  walking.length != 0 && (shortening += 15);
  return shortening;
};

export const validate = (val: string) => {
  return typeof val === "number" && Number(val);
};

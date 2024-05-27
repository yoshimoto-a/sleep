import { Baby } from "@prisma/client";
interface BabyCollection {
  newbornBaby: Baby;
  oneMonthBaby: Baby;
  twoMonthBaby: Baby;
  fiveMonthBaby: Baby;
  sixMonthBaby: Baby;
  eightMonthBaby: Baby;
  tenMonthBaby: Baby;
  eightteenMonthBaby: Baby;
}
export const baby: BabyCollection = {
  newbornBaby: {
    id: 9,
    name: "新生児",
    birthday: new Date("2024-05-03"),
    birthWeight: 3000,
    expectedDateOfBirth: new Date("2024-05-03"),
    gender: "BOY",
    created: new Date("2024-05-23"),
    updated: new Date("2024-05-24"),
    milestone: [],
  },
  oneMonthBaby: {
    id: 9,
    name: "1ヶ月ベビー",
    birthday: new Date("2024-04-03"),
    birthWeight: 3000,
    expectedDateOfBirth: new Date("2024-04-03"),
    gender: "BOY",
    created: new Date("2024-05-23"),
    updated: new Date("2024-05-24"),
    milestone: [],
  },
  twoMonthBaby: {
    id: 9,
    name: "2ヶ月ベビー",
    birthday: new Date("2024-03-03"),
    birthWeight: 3000,
    expectedDateOfBirth: new Date("2024-03-03"),
    gender: "BOY",
    created: new Date("2024-05-23"),
    updated: new Date("2024-05-24"),
    milestone: [],
  },
  fiveMonthBaby: {
    id: 9,
    name: "5ヶ月ベビー",
    birthday: new Date("2023-12-03"),
    birthWeight: 3000,
    expectedDateOfBirth: new Date("2023-12-03"),
    gender: "BOY",
    created: new Date("2024-05-23"),
    updated: new Date("2024-05-24"),
    milestone: [],
  },
  sixMonthBaby: {
    id: 9,
    name: "6ヶ月ベビー",
    birthday: new Date("2023-11-03"),
    birthWeight: 3000,
    expectedDateOfBirth: new Date("2023-11-03"),
    gender: "BOY",
    created: new Date("2024-05-23"),
    updated: new Date("2024-05-24"),
    milestone: [],
  },
  eightMonthBaby: {
    id: 9,
    name: "8ヶ月ベビー",
    birthday: new Date("2023-09-03"),
    birthWeight: 3000,
    expectedDateOfBirth: new Date("2023-09-03"),
    gender: "BOY",
    created: new Date("2024-05-23"),
    updated: new Date("2024-05-24"),
    milestone: [],
  },
  tenMonthBaby: {
    id: 9,
    name: "10ヶ月ベビー",
    birthday: new Date("2023-07-03"),
    birthWeight: 3000,
    expectedDateOfBirth: new Date("2023-07-03"),
    gender: "BOY",
    created: new Date("2024-05-23"),
    updated: new Date("2024-05-24"),
    milestone: [],
  },
  eightteenMonthBaby: {
    id: 9,
    name: "18ヶ月ベビー",
    birthday: new Date("2022-11-03"),
    birthWeight: 3000,
    expectedDateOfBirth: new Date("2022-11-03"),
    gender: "BOY",
    created: new Date("2024-05-23"),
    updated: new Date("2024-05-24"),
    milestone: [],
  },
};

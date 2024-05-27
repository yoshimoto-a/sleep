import { Milestone } from "@prisma/client";
interface PracticingGrowth {
  babyId: number;
  id: number;
  milestone: Milestone;
  startedAt: Date;
  archevedAt: null;
  createUser: number;
  changeUser: number;
  created: Date;
  updated: Date;
}
interface practicingCollection {
  fiveMonth: PracticingGrowth[];
  sixMonth: PracticingGrowth[];
  eightMonth: PracticingGrowth[];
  tenMonth: PracticingGrowth[];
  eightteenMonth: PracticingGrowth[];
}
interface acquisitionGrowth {
  babyId: number;
  id: number;
  milestone: Milestone;
  startedAt: Date | null;
  archevedAt: Date;
  createUser: number;
  changeUser: number;
  created: Date;
  updated: Date;
}
interface acquisitionCollection {
  fiveMonth: acquisitionGrowth[];
  sixMonth: acquisitionGrowth[];
  eightMonth: acquisitionGrowth[];
  tenMonth: acquisitionGrowth[];
}
interface Walking {
  babyId: number;
  id: number;
  milestone: "WALKING";
  startedAt: Date | null;
  archevedAt: Date;
  createUser: number;
  changeUser: number;
  created: Date;
  updated: Date;
}

export const practicing: practicingCollection = {
  fiveMonth: [
    {
      babyId: 9,
      id: 1,
      milestone: "TURNING_OVER_AND_OVER",
      startedAt: new Date("2024-05-24"),
      archevedAt: null,
      createUser: 20,
      changeUser: 20,
      created: new Date("2024-05-03"),
      updated: new Date("2024-05-24"),
    },
  ],

  sixMonth: [
    {
      babyId: 9,
      id: 1,
      milestone: "TURNING_OVER_AND_OVER",
      startedAt: new Date("2024-05-24"),
      archevedAt: null,
      createUser: 20,
      changeUser: 20,
      created: new Date("2024-05-03"),
      updated: new Date("2024-05-24"),
    },
  ],

  eightMonth: [
    {
      babyId: 9,
      id: 1,
      milestone: "TURNING_OVER_AND_OVER",
      startedAt: new Date("2024-05-24"),
      archevedAt: null,
      createUser: 20,
      changeUser: 20,
      created: new Date("2024-05-03"),
      updated: new Date("2024-05-24"),
    },
  ],

  tenMonth: [
    {
      babyId: 9,
      id: 1,
      milestone: "CRUISING",
      startedAt: new Date("2024-05-24"),
      archevedAt: null,
      createUser: 20,
      changeUser: 20,
      created: new Date("2024-05-03"),
      updated: new Date("2024-05-24"),
    },
  ],

  eightteenMonth: [
    {
      babyId: 9,
      id: 1,
      milestone: "TURNING_OVER_AND_OVER",
      startedAt: new Date("2024-05-24"),
      archevedAt: null,
      createUser: 20,
      changeUser: 20,
      created: new Date("2024-05-03"),
      updated: new Date("2024-05-24"),
    },
  ],
};

export const acquisition: acquisitionCollection = {
  fiveMonth: [
    {
      babyId: 9,
      id: 1,
      milestone: "TURNING_OVER",
      startedAt: new Date("2024-05-24"),
      archevedAt: new Date("2024-05-24"),
      createUser: 20,
      changeUser: 20,
      created: new Date("2024-05-03"),
      updated: new Date("2024-05-24"),
    },
  ],

  sixMonth: [
    {
      babyId: 9,
      id: 1,
      milestone: "CRAWLING",
      startedAt: new Date("2024-05-24"),
      archevedAt: new Date("2024-05-24"),
      createUser: 20,
      changeUser: 20,
      created: new Date("2024-05-03"),
      updated: new Date("2024-05-24"),
    },
  ],

  eightMonth: [
    {
      babyId: 9,
      id: 1,
      milestone: "SITTING",
      startedAt: new Date("2024-05-24"),
      archevedAt: new Date("2024-05-24"),
      createUser: 20,
      changeUser: 20,
      created: new Date("2024-05-03"),
      updated: new Date("2024-05-24"),
    },
  ],

  tenMonth: [
    {
      babyId: 9,
      id: 1,
      milestone: "CRAWLING_ON_HANDS_AND_KNEES",
      startedAt: new Date("2024-05-24"),
      archevedAt: new Date("2024-05-24"),
      createUser: 20,
      changeUser: 20,
      created: new Date("2024-05-03"),
      updated: new Date("2024-05-24"),
    },
  ],
};

export const walking: Walking[] = [
  {
    babyId: 9,
    id: 1,
    milestone: "WALKING",
    startedAt: new Date("2024-05-24"),
    archevedAt: new Date("2024-05-24"),
    createUser: 20,
    changeUser: 20,
    created: new Date("2024-05-03"),
    updated: new Date("2024-05-24"),
  },
];

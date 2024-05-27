import { SleepingSituation } from "@prisma/client";
interface lengthType {
  short: SleepingSituation[];
  long: SleepingSituation[];
}
interface timeType {
  earlymorning: lengthType;
  morning: lengthType;
  noon: lengthType;
  evening: lengthType;
  night: lengthType;
}
interface sleepingSituationCollection {
  lowLunarAgeWakeWindows: timeType;
  sixMonthWakeWindows: timeType;
  eightMonthWakeWindows: timeType;
  tenMonthWakeWindows: timeType;
  eighteenMonthWakeWindows: timeType;
  addition_eighteenMonthWakeWindows: {
    noon: SleepingSituation[];
    evening: SleepingSituation[];
  };
}
const long = {
  earlymorning: {
    babyId: 9,
    bedTime: null,
    sleep: new Date("2024-05-20T01:00:00"),
    wakeup: new Date("2024-05-20T04:00:00"),
    id: 1,
    createUser: 20,
    changeUser: 20,
    created: new Date("2024-05-20"),
    updated: new Date("2024-05-20"),
  },
  morning: {
    babyId: 9,
    bedTime: null,
    sleep: new Date("2024-05-20T04:00:00"),
    wakeup: new Date("2024-05-20T07:00:00"),
    id: 1,
    createUser: 20,
    changeUser: 20,
    created: new Date("2024-05-20"),
    updated: new Date("2024-05-20"),
  },
  noon: {
    babyId: 9,
    bedTime: null,
    sleep: new Date("2024-05-20T07:00:00"),
    wakeup: new Date("2024-05-20T10:00:00"),
    id: 1,
    createUser: 20,
    changeUser: 20,
    created: new Date("2024-05-20"),
    updated: new Date("2024-05-20"),
  },
  evening: {
    babyId: 9,
    bedTime: null,
    sleep: new Date("2024-05-20T12:00:00"),
    wakeup: new Date("2024-05-20T15:00:00"),
    id: 1,
    createUser: 20,
    changeUser: 20,
    created: new Date("2024-05-20"),
    updated: new Date("2024-05-20"),
  },
  night: {
    babyId: 9,
    bedTime: null,
    sleep: new Date("2024-05-20T20:00:00"),
    wakeup: new Date("2024-05-20T23:00:00"),
    id: 1,
    createUser: 20,
    changeUser: 20,
    created: new Date("2024-05-20"),
    updated: new Date("2024-05-20"),
  },
};
export const sleepingSituation: sleepingSituationCollection = {
  lowLunarAgeWakeWindows: {
    earlymorning: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T03:30:00"),
          wakeup: new Date("2024-05-20T04:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.earlymorning],
    },
    morning: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T06:30:00"),
          wakeup: new Date("2024-05-20T07:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.morning],
    },
    noon: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T09:30:00"),
          wakeup: new Date("2024-05-20T10:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.noon],
    },
    evening: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T14:30:00"),
          wakeup: new Date("2024-05-20T15:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.evening],
    },
    night: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T22:30:00"),
          wakeup: new Date("2024-05-20T23:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.night],
    },
  },
  //6ヶ月まで1サイクル50分だから短いのは49分以内
  sixMonthWakeWindows: {
    earlymorning: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T03:11:00"),
          wakeup: new Date("2024-05-20T04:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.earlymorning],
    },
    morning: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T05:11:00"),
          wakeup: new Date("2024-05-20T06:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.morning],
    },
    noon: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T09:11:00"),
          wakeup: new Date("2024-05-20T10:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.noon],
    },
    evening: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T14:11:00"),
          wakeup: new Date("2024-05-20T15:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.evening],
    },
    night: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T22:11:00"),
          wakeup: new Date("2024-05-20T23:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.night],
    },
  },
  //8ヶ月は55分未満短縮だから54分で試す
  eightMonthWakeWindows: {
    earlymorning: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T03:06:00"),
          wakeup: new Date("2024-05-20T04:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.earlymorning],
    },
    morning: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T05:06:00"),
          wakeup: new Date("2024-05-20T06:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.morning],
    },
    noon: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T09:06:00"),
          wakeup: new Date("2024-05-20T10:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.noon],
    },
    evening: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T14:06:00"),
          wakeup: new Date("2024-05-20T15:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.evening],
    },
    night: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T22:06:00"),
          wakeup: new Date("2024-05-20T23:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.night],
    },
  },
  //10ヶ月以降1時間未満短縮だから59分で試す
  tenMonthWakeWindows: {
    earlymorning: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T03:01:00"),
          wakeup: new Date("2024-05-20T04:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.earlymorning],
    },
    morning: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T05:01:00"),
          wakeup: new Date("2024-05-20T06:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.morning],
    },
    noon: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T09:01:00"),
          wakeup: new Date("2024-05-20T10:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.noon],
    },
    evening: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T14:01:00"),
          wakeup: new Date("2024-05-20T15:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.evening],
    },
    night: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T22:01:00"),
          wakeup: new Date("2024-05-20T23:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.night],
    },
  },
  //18ヶ月
  eighteenMonthWakeWindows: {
    earlymorning: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T03:01:00"),
          wakeup: new Date("2024-05-20T04:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.earlymorning],
    },
    morning: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T06:01:00"),
          wakeup: new Date("2024-05-20T07:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.morning],
    },
    noon: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T13:31:00"),
          wakeup: new Date("2024-05-20T14:30:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T11:30:00"),
          wakeup: new Date("2024-05-20T14:30:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
    },
    evening: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T13:31:00"),
          wakeup: new Date("2024-05-20T14:30:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.evening],
    },
    night: {
      short: [
        {
          babyId: 9,
          bedTime: null,
          sleep: new Date("2024-05-20T22:01:00"),
          wakeup: new Date("2024-05-20T23:00:00"),
          id: 1,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-20"),
          updated: new Date("2024-05-20"),
        },
      ],
      long: [long.night],
    },
  },
  //18ヶ月追加テストパターン
  addition_eighteenMonthWakeWindows: {
    noon: [
      {
        babyId: 9,
        bedTime: null,
        sleep: new Date("2024-05-20T07:30:00"),
        wakeup: new Date("2024-05-20T11:30:00"),
        id: 1,
        createUser: 20,
        changeUser: 20,
        created: new Date("2024-05-20"),
        updated: new Date("2024-05-20"),
      },
    ],
    evening: [
      {
        babyId: 9,
        bedTime: null,
        sleep: new Date("2024-05-20T012:100:00"),
        wakeup: new Date("2024-05-20T15:10:00"),
        id: 1,
        createUser: 20,
        changeUser: 20,
        created: new Date("2024-05-20"),
        updated: new Date("2024-05-20"),
      },
    ],
  },
};

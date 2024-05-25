import { describe } from "node:test";
import { Growth } from "@prisma/client";
import { WakeWindows } from "@prisma/client";
import { Baby } from "@prisma/client";
import { SleepingSituation } from "@prisma/client";
import { calculate } from "@/app/api/dashboard/nextSleepTime/_utils/calculate";

describe("calculate", () => {
  describe("新生児", () => {
    const baby: Baby = {
      id: 9,
      name: "新生児",
      birthday: new Date("2024-05-03"),
      birthWeight: 3000,
      expectedDateOfBirth: new Date("2024-05-03"),
      gender: "BOY",
      created: new Date("2024-05-23"),
      updated: new Date("2024-05-24"),
      milestone: [],
    };
    describe("活動時間40分", () => {
      const wakeWindows: WakeWindows[] = [
        {
          babyId: 9,
          id: 1,
          type: "ALL",
          time: 40,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-03"),
          updated: new Date("2024-05-03"),
        },
      ];

      describe("その他は空", () => {
        const practicing: Growth[] = [];
        const acquisition: Growth[] = [];
        const walking: Growth[] = [];
        describe("30分で起床", () => {
          const sleepingSituation: SleepingSituation[] = [
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
          ];
          it("返す値のテスト", async () => {
            const result = calculate(
              practicing,
              acquisition,
              walking,
              wakeWindows,
              baby,
              sleepingSituation
            );
            console.log(`1 : ${result}`);
          });
        });
        describe("3時間で起床", () => {
          const sleepingSituation: SleepingSituation[] = [
            {
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
          ];
          it("返す値のテスト", async () => {
            const result = calculate(
              practicing,
              acquisition,
              walking,
              wakeWindows,
              baby,
              sleepingSituation
            );
            console.log(`2 : ${result}`);
          });
        });
      });
    });
  });
  describe("1ヶ月", () => {
    const baby: Baby = {
      id: 9,
      name: "1ヶ月ベビー",
      birthday: new Date("2024-04-03"),
      birthWeight: 3000,
      expectedDateOfBirth: new Date("2024-04-03"),
      gender: "BOY",
      created: new Date("2024-05-23"),
      updated: new Date("2024-05-24"),
      milestone: [],
    };
    describe("活動時間50分", () => {
      const wakeWindows: WakeWindows[] = [
        {
          babyId: 9,
          id: 1,
          type: "ALL",
          time: 50,
          createUser: 20,
          changeUser: 20,
          created: new Date("2024-05-03"),
          updated: new Date("2024-05-03"),
        },
      ];
      describe("その他は空", () => {
        const practicing: Growth[] = [];
        const acquisition: Growth[] = [];
        const walking: Growth[] = [];
        describe("30分で起床", () => {
          const sleepingSituation: SleepingSituation[] = [
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
          ];
          it("返す値のテスト", async () => {
            const result = calculate(
              practicing,
              acquisition,
              walking,
              wakeWindows,
              baby,
              sleepingSituation
            );
            console.log(`3 : ${result}`);
          });
        });
        describe("3時間で起床", () => {
          const sleepingSituation: SleepingSituation[] = [
            {
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
          ];
          it("返す値のテスト", async () => {
            const result = calculate(
              practicing,
              acquisition,
              walking,
              wakeWindows,
              baby,
              sleepingSituation
            );
            console.log(`4 : ${result}`);
          });
        });
        describe("30分で起床(早朝)", () => {
          const sleepingSituation: SleepingSituation[] = [
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
          ];
          it("返す値のテスト", async () => {
            const result = calculate(
              practicing,
              acquisition,
              walking,
              wakeWindows,
              baby,
              sleepingSituation
            );
            console.log(`5 : ${result}`);
          });
        });
        describe("3時間で起床(早朝)", () => {
          const sleepingSituation: SleepingSituation[] = [
            {
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
          ];
          it("返す値のテスト", async () => {
            const result = calculate(
              practicing,
              acquisition,
              walking,
              wakeWindows,
              baby,
              sleepingSituation
            );
            console.log(`6 : ${result}`);
          });
        });
      });
    });
  });
});

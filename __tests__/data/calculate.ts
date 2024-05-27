// /**ベタ打ち */
// import { describe } from "node:test";
// import { Growth } from "@prisma/client";
// import { WakeWindows } from "@prisma/client";
// import { Baby } from "@prisma/client";
// import { SleepingSituation } from "@prisma/client";
// import { calculate } from "@/app/api/dashboard/nextSleepTime/_utils/calculate";

// describe("calculate", () => {
//   describe("新生児", () => {
//     const baby: Baby = {
//       id: 9,
//       name: "新生児",
//       birthday: new Date("2024-05-03"),
//       birthWeight: 3000,
//       expectedDateOfBirth: new Date("2024-05-03"),
//       gender: "BOY",
//       created: new Date("2024-05-23"),
//       updated: new Date("2024-05-24"),
//       milestone: [],
//     };
//     describe("活動時間40分", () => {
//       const wakeWindows: WakeWindows[] = [
//         {
//           babyId: 9,
//           id: 1,
//           type: "ALL",
//           time: 40,
//           createUser: 20,
//           changeUser: 20,
//           created: new Date("2024-05-03"),
//           updated: new Date("2024-05-03"),
//         },
//       ];

//       describe("その他は空", () => {
//         const practicing: Growth[] = [];
//         const acquisition: Growth[] = [];
//         const walking: Growth[] = [];
//         describe("30分で起床", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T06:30:00"),
//               wakeup: new Date("2024-05-20T07:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`1 : ${result}`);
//           });
//         });
//         describe("3時間で起床", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T04:00:00"),
//               wakeup: new Date("2024-05-20T07:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`2 : ${result}`);
//           });
//         });
//       });
//     });
//   });
//   describe("1ヶ月", () => {
//     const baby: Baby = {
//       id: 9,
//       name: "1ヶ月ベビー",
//       birthday: new Date("2024-04-03"),
//       birthWeight: 3000,
//       expectedDateOfBirth: new Date("2024-04-03"),
//       gender: "BOY",
//       created: new Date("2024-05-23"),
//       updated: new Date("2024-05-24"),
//       milestone: [],
//     };
//     describe("活動時間50分", () => {
//       const wakeWindows: WakeWindows[] = [
//         {
//           babyId: 9,
//           id: 1,
//           type: "ALL",
//           time: 50,
//           createUser: 20,
//           changeUser: 20,
//           created: new Date("2024-05-03"),
//           updated: new Date("2024-05-03"),
//         },
//       ];
//       describe("その他は空", () => {
//         const practicing: Growth[] = [];
//         const acquisition: Growth[] = [];
//         const walking: Growth[] = [];
//         describe("30分で起床", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T09:30:00"),
//               wakeup: new Date("2024-05-20T10:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`3 : ${result}`);
//           });
//         });
//         describe("3時間で起床", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T07:00:00"),
//               wakeup: new Date("2024-05-20T10:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`4 : ${result}`);
//           });
//         });
//         describe("30分で起床(早朝)", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T03:30:00"),
//               wakeup: new Date("2024-05-20T04:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`5 : ${result}`);
//           });
//         });
//         describe("3時間で起床(早朝)", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T01:00:00"),
//               wakeup: new Date("2024-05-20T04:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`6 : ${result}`);
//           });
//         });
//       });
//     });
//   });
//   describe("2ヶ月", () => {
//     const baby: Baby = {
//       id: 9,
//       name: "2ヶ月ベビー",
//       birthday: new Date("2024-03-03"),
//       birthWeight: 3000,
//       expectedDateOfBirth: new Date("2024-03-03"),
//       gender: "BOY",
//       created: new Date("2024-05-23"),
//       updated: new Date("2024-05-24"),
//       milestone: [],
//     };
//     describe("活動時間60分", () => {
//       const wakeWindows: WakeWindows[] = [
//         {
//           babyId: 9,
//           id: 1,
//           type: "ALL",
//           time: 60,
//           createUser: 20,
//           changeUser: 20,
//           created: new Date("2024-05-03"),
//           updated: new Date("2024-05-03"),
//         },
//       ];
//       describe("その他は空", () => {
//         const practicing: Growth[] = [];
//         const acquisition: Growth[] = [];
//         const walking: Growth[] = [];
//         describe("30分で起床：10時起床", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T09:30:00"),
//               wakeup: new Date("2024-05-20T10:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`7 : ${result}`);
//           });
//         });
//         describe("3時間で起床:10時", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T07:00:00"),
//               wakeup: new Date("2024-05-20T10:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`8 : ${result}`);
//           });
//         });
//         describe("30分で起床(早朝)", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T03:30:00"),
//               wakeup: new Date("2024-05-20T04:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`9 : ${result}`);
//           });
//         });
//         describe("3時間で起床(早朝)", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T01:00:00"),
//               wakeup: new Date("2024-05-20T04:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`10 : ${result}`);
//           });
//         });
//       });
//     });
//   });
//   describe("5ヶ月", () => {
//     const baby: Baby = {
//       id: 9,
//       name: "5ヶ月ベビー",
//       birthday: new Date("2024-12-03"),
//       birthWeight: 3000,
//       expectedDateOfBirth: new Date("2024-12-03"),
//       gender: "BOY",
//       created: new Date("2024-05-23"),
//       updated: new Date("2024-05-24"),
//       milestone: [],
//     };
//     describe("活動時間朝昼夕別", () => {
//       const wakeWindows: WakeWindows[] = [
//         {
//           babyId: 9,
//           id: 1,
//           type: "ALL",
//           time: 70,
//           createUser: 20,
//           changeUser: 20,
//           created: new Date("2024-05-03"),
//           updated: new Date("2024-05-03"),
//         },
//         {
//           babyId: 9,
//           id: 2,
//           type: "MORNING",
//           time: 70,
//           createUser: 20,
//           changeUser: 20,
//           created: new Date("2024-05-03"),
//           updated: new Date("2024-05-03"),
//         },
//         {
//           babyId: 9,
//           id: 3,
//           type: "NOON",
//           time: 80,
//           createUser: 20,
//           changeUser: 20,
//           created: new Date("2024-05-03"),
//           updated: new Date("2024-05-03"),
//         },
//         {
//           babyId: 9,
//           id: 4,
//           type: "EVENING",
//           time: 85,
//           createUser: 20,
//           changeUser: 20,
//           created: new Date("2024-05-03"),
//           updated: new Date("2024-05-03"),
//         },
//       ];
//       describe("その他は空", () => {
//         const practicing: Growth[] = [];
//         const acquisition: Growth[] = [];
//         const walking: Growth[] = [];
//         describe("30分で起床：7時起床", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T06:30:00"),
//               wakeup: new Date("2024-05-20T07:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`11 : ${result}`);
//           });
//         });
//         describe("3時間で起床:7時", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T04:00:00"),
//               wakeup: new Date("2024-05-20T07:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`12 : ${result}`);
//           });
//         });
//         describe("30分で起床：10時起床", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T09:30:00"),
//               wakeup: new Date("2024-05-20T10:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`13 : ${result}`);
//           });
//         });
//         describe("3時間で起床:10時", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T07:00:00"),
//               wakeup: new Date("2024-05-20T10:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`14 : ${result}`);
//           });
//         });
//         describe("30分で起床(早朝)", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T03:30:00"),
//               wakeup: new Date("2024-05-20T04:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`15 : ${result}`);
//           });
//         });
//         describe("3時間で起床(早朝)", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T01:00:00"),
//               wakeup: new Date("2024-05-20T04:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`16 : ${result}`);
//           });
//         });
//         describe("30分で起床(深夜)", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T22:30:00"),
//               wakeup: new Date("2024-05-20T23:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`17 : ${result}`);
//           });
//         });
//         describe("3時間で起床(深夜)", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T20:00:00"),
//               wakeup: new Date("2024-05-20T23:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`18 : ${result}`);
//           });
//         });
//       });
//       describe("寝返り返り練習中/寝返り習得したて", () => {
//         const practicing: Growth[] = [
//           {
//             babyId: 9,
//             id: 1,
//             milestone: "TURNING_OVER_AND_OVER",
//             startedAt: new Date("2024-05-24"),
//             archevedAt: null,
//             createUser: 20,
//             changeUser: 20,
//             created: new Date("2024-05-03"),
//             updated: new Date("2024-05-24"),
//           },
//         ];
//         const acquisition: Growth[] = [
//           {
//             babyId: 9,
//             id: 1,
//             milestone: "TURNING_OVER",
//             startedAt: new Date("2024-05-24"),
//             archevedAt: new Date("2024-05-24"),
//             createUser: 20,
//             changeUser: 20,
//             created: new Date("2024-05-03"),
//             updated: new Date("2024-05-24"),
//           },
//         ];
//         const walking: Growth[] = [];
//         describe("30分で起床：7時起床", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T06:30:00"),
//               wakeup: new Date("2024-05-20T07:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`19 : ${result}`);
//           });
//         });
//         describe("3時間で起床:7時", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T04:00:00"),
//               wakeup: new Date("2024-05-20T07:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`20 : ${result}`);
//           });
//         });
//         describe("30分で起床：10時起床", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T09:30:00"),
//               wakeup: new Date("2024-05-20T10:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`21 : ${result}`);
//           });
//         });
//         describe("3時間で起床:10時", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T07:00:00"),
//               wakeup: new Date("2024-05-20T10:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`22 : ${result}`);
//           });
//         });
//       });
//       describe("寝返り返り練習中", () => {
//         const practicing: Growth[] = [
//           {
//             babyId: 9,
//             id: 1,
//             milestone: "TURNING_OVER_AND_OVER",
//             startedAt: new Date("2024-05-24"),
//             archevedAt: null,
//             createUser: 20,
//             changeUser: 20,
//             created: new Date("2024-05-03"),
//             updated: new Date("2024-05-24"),
//           },
//         ];
//         const acquisition: Growth[] = [];
//         const walking: Growth[] = [];
//         describe("30分で起床：7時起床", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T06:30:00"),
//               wakeup: new Date("2024-05-20T07:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`23 : ${result}`);
//           });
//         });
//         describe("3時間で起床:7時", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T04:00:00"),
//               wakeup: new Date("2024-05-20T07:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`24 : ${result}`);
//           });
//         });
//         describe("30分で起床：10時起床", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T09:30:00"),
//               wakeup: new Date("2024-05-20T10:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`25 : ${result}`);
//           });
//         });
//         describe("3時間で起床:10時", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T07:00:00"),
//               wakeup: new Date("2024-05-20T10:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`26 : ${result}`);
//           });
//         });
//       });
//     });
//   });
//   describe("6ヶ月", () => {
//     const baby: Baby = {
//       id: 9,
//       name: "6ヶ月ベビー",
//       birthday: new Date("2024-12-03"),
//       birthWeight: 3000,
//       expectedDateOfBirth: new Date("2024-12-03"),
//       gender: "BOY",
//       created: new Date("2024-05-23"),
//       updated: new Date("2024-05-24"),
//       milestone: [],
//     };
//     describe("活動時間朝昼夕別", () => {
//       const wakeWindows: WakeWindows[] = [
//         {
//           babyId: 9,
//           id: 1,
//           type: "ALL",
//           time: 80,
//           createUser: 20,
//           changeUser: 20,
//           created: new Date("2024-05-03"),
//           updated: new Date("2024-05-03"),
//         },
//         {
//           babyId: 9,
//           id: 2,
//           type: "MORNING",
//           time: 75,
//           createUser: 20,
//           changeUser: 20,
//           created: new Date("2024-05-03"),
//           updated: new Date("2024-05-03"),
//         },
//         {
//           babyId: 9,
//           id: 3,
//           type: "NOON",
//           time: 80,
//           createUser: 20,
//           changeUser: 20,
//           created: new Date("2024-05-03"),
//           updated: new Date("2024-05-03"),
//         },
//         {
//           babyId: 9,
//           id: 4,
//           type: "EVENING",
//           time: 90,
//           createUser: 20,
//           changeUser: 20,
//           created: new Date("2024-05-03"),
//           updated: new Date("2024-05-03"),
//         },
//       ];
//       describe("お座り練習中/ずり這い習得したて", () => {
//         const practicing: Growth[] = [
//           {
//             babyId: 9,
//             id: 1,
//             milestone: "SITTING",
//             startedAt: new Date("2024-05-24"),
//             archevedAt: null,
//             createUser: 20,
//             changeUser: 20,
//             created: new Date("2024-05-03"),
//             updated: new Date("2024-05-24"),
//           },
//         ];
//         const acquisition: Growth[] = [
//           {
//             babyId: 9,
//             id: 1,
//             milestone: "CRAWLING",
//             startedAt: new Date("2024-05-24"),
//             archevedAt: new Date("2024-05-24"),
//             createUser: 20,
//             changeUser: 20,
//             created: new Date("2024-05-03"),
//             updated: new Date("2024-05-24"),
//           },
//         ];
//         const walking: Growth[] = [];
//         describe("30分で起床：7時起床", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T06:30:00"),
//               wakeup: new Date("2024-05-20T07:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`27 : ${result}`);
//           });
//         });
//         describe("3時間で起床:7時", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T04:00:00"),
//               wakeup: new Date("2024-05-20T07:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`28 : ${result}`);
//           });
//         });
//         describe("30分で起床：10時起床", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T09:30:00"),
//               wakeup: new Date("2024-05-20T10:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`29 : ${result}`);
//           });
//         });
//         describe("3時間で起床:10時", () => {
//           const sleepingSituation: SleepingSituation[] = [
//             {
//               babyId: 9,
//               bedTime: null,
//               sleep: new Date("2024-05-20T07:00:00"),
//               wakeup: new Date("2024-05-20T10:00:00"),
//               id: 1,
//               createUser: 20,
//               changeUser: 20,
//               created: new Date("2024-05-20"),
//               updated: new Date("2024-05-20"),
//             },
//           ];
//           it("返す値のテスト", async () => {
//             const result = calculate(
//               practicing,
//               acquisition,
//               walking,
//               wakeWindows,
//               baby,
//               sleepingSituation
//             );
//             console.log(`30 : ${result}`);
//           });
//         });
//       });
//     });
//   });
// });

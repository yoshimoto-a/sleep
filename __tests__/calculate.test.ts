import { describe } from "node:test";
import { baby } from "./data/babies";
import { practicing, acquisition, walking } from "./data/growth";
import { sleepingSituation } from "./data/sleepingAituation";
import { wakeWindows } from "./data/wakeWindows";
import { calculate } from "@/app/api/dashboard/nextSleepTime/_utils/calculate";

describe("calculate", () => {
  describe("(1)新生児/活動時間40min/睡眠30min/4時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.newbornWakeWindows,
        baby.newbornBaby,
        sleepingSituation.lowLunarAgeWakeWindows.earlymorning.short
      );
      console.log(`(1)新生児/活動時間40min/睡眠30min/4時起床 : ${result}`);
    });
  });
  describe("(2)新生児/活動時間40min/睡眠3hours/4時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.newbornWakeWindows,
        baby.newbornBaby,
        sleepingSituation.lowLunarAgeWakeWindows.earlymorning.long
      );
      console.log(`(2)新生児/活動時間40min/睡眠3hours/4時起床 : ${result}`);
    });
  });
  describe("(3)新生児/活動時間40min/睡眠30min/7時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.newbornWakeWindows,
        baby.newbornBaby,
        sleepingSituation.lowLunarAgeWakeWindows.morning.short
      );
      console.log(`(3)新生児/活動時間40min/睡眠30min/7時起床 : ${result}`);
    });
  });
  describe("(4)新生児/活動時間40min/睡眠30min/7時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.newbornWakeWindows,
        baby.newbornBaby,
        sleepingSituation.lowLunarAgeWakeWindows.morning.long
      );
      console.log(`(4)新生児/活動時間40min/睡眠3hours/7時起床 : ${result}`);
    });
  });
  describe("(5)1ヶ月/活動時間50min/睡眠30min/10時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.oneMonthWakeWindows,
        baby.oneMonthBaby,
        sleepingSituation.lowLunarAgeWakeWindows.noon.short
      );
      console.log(`(5)1ヶ月/活動時間50min/睡眠30min/10時起床 : ${result}`);
    });
  });
  describe("(6)1ヶ月/活動時間50min/睡眠3hours/10時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.oneMonthWakeWindows,
        baby.oneMonthBaby,
        sleepingSituation.lowLunarAgeWakeWindows.noon.long
      );
      console.log(`(6)1ヶ月/活動時間50min/睡眠3hours/10時起床 : ${result}`);
    });
  });
  describe("(7)1ヶ月/活動時間50min/睡眠30min/4時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.oneMonthWakeWindows,
        baby.oneMonthBaby,
        sleepingSituation.lowLunarAgeWakeWindows.earlymorning.short
      );
      console.log(`(7)1ヶ月/活動時間50min/睡眠30min/10時起床 : ${result}`);
    });
  });
  describe("(8)1ヶ月/活動時間50min/睡眠3hours/4時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.oneMonthWakeWindows,
        baby.oneMonthBaby,
        sleepingSituation.lowLunarAgeWakeWindows.earlymorning.long
      );
      console.log(`(8)1ヶ月/活動時間50min/睡眠3hours/10時起床 : ${result}`);
    });
  });
  describe("(9)2ヶ月/活動時間60min/睡眠30min/10時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.twoMonthWakeWindows,
        baby.twoMonthBaby,
        sleepingSituation.lowLunarAgeWakeWindows.noon.short
      );
      console.log(`(9)2ヶ月/活動時間60min/睡眠30min/10時起床 : ${result}`);
    });
  });
  describe("(10)2ヶ月/活動時間60min/睡眠3hours/10時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.twoMonthWakeWindows,
        baby.twoMonthBaby,
        sleepingSituation.lowLunarAgeWakeWindows.noon.long
      );
      console.log(`(10)2ヶ月/活動時間60min/睡眠3hours/10時起床 : ${result}`);
    });
  });
  describe("(11)2ヶ月/活動時間60min/睡眠30min/23時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.twoMonthWakeWindows,
        baby.twoMonthBaby,
        sleepingSituation.lowLunarAgeWakeWindows.night.short
      );
      console.log(`(9)2ヶ月/活動時間60min/睡眠30min/10時起床 : ${result}`);
    });
  });
  describe("(12)2ヶ月/活動時間60min/睡眠3hours/23時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.twoMonthWakeWindows,
        baby.twoMonthBaby,
        sleepingSituation.lowLunarAgeWakeWindows.night.long
      );
      console.log(`(12)2ヶ月/活動時間60min/睡眠3hours/23時起床 : ${result}`);
    });
  });
  describe("(13)5ヶ月/活動時間70/睡眠30min/10時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.fiveMonthWakeWindows,
        baby.fiveMonthBaby,
        sleepingSituation.lowLunarAgeWakeWindows.noon.short
      );
      console.log(`(13)5ヶ月/活動時間/睡眠30min/10時起床 : ${result}`);
    });
  });
  describe("(14)5ヶ月/活動時間70/睡眠3hours/10時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.fiveMonthWakeWindows,
        baby.fiveMonthBaby,
        sleepingSituation.lowLunarAgeWakeWindows.noon.long
      );
      console.log(`(14)5ヶ月/活動時間70/睡眠3hours/10時起床 : ${result}`);
    });
  });
  describe("(15)5ヶ月/活動時間70/睡眠30min/7時起床/練習＆習得", () => {
    it("テスト", async () => {
      const result = calculate(
        practicing.fiveMonth,
        acquisition.fiveMonth,
        [],
        wakeWindows.fiveMonthWakeWindows,
        baby.fiveMonthBaby,
        sleepingSituation.lowLunarAgeWakeWindows.morning.short
      );
      console.log(`(15)5ヶ月/活動時間70/睡眠30min7時起床 : ${result}`);
    });
  });
  describe("(16)5ヶ月/活動時間70/睡眠3hours/23時起床/練習", () => {
    it("テスト", async () => {
      const result = calculate(
        practicing.fiveMonth,
        [],
        [],
        wakeWindows.fiveMonthWakeWindows,
        baby.fiveMonthBaby,
        sleepingSituation.lowLunarAgeWakeWindows.night.long
      );
      console.log(`(16)5ヶ月/活動時間70/睡眠3hours/23時起床/練習 : ${result}`);
    });
  });
  describe("(17)6ヶ月/活動時間80/睡眠3hours/11時起床/練習＆習得", () => {
    it("テスト", async () => {
      const result = calculate(
        practicing.sixMonth,
        acquisition.sixMonth,
        [],
        wakeWindows.sixMonthWakeWindows.basicOnly,
        baby.sixMonthBaby,
        sleepingSituation.sixMonthWakeWindows.noon.long
      );
      console.log(
        `(17)6ヶ月/活動時間80/睡眠3hours/10時起床/練習＆習得 : ${result}`
      );
    });
  });
  describe("(18)6ヶ月/活動時間(朝75、昼80、夕90)/睡眠49min/6時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.sixMonthWakeWindows.hourly,
        baby.sixMonthBaby,
        sleepingSituation.sixMonthWakeWindows.morning.short
      );
      console.log(
        `(18)6ヶ月/活動時間(朝75、昼80、夕90)/睡眠49min/6時起床 : ${result}`
      );
    });
  });
  describe("(19)6ヶ月/活動時間(朝75、昼80、夕90)/睡眠3hours/7時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.sixMonthWakeWindows.hourly,
        baby.sixMonthBaby,
        sleepingSituation.sixMonthWakeWindows.morning.long
      );
      console.log(
        `(19)6ヶ月/活動時間(朝75、昼80、夕90)/睡眠3hours/6時起床 : ${result}`
      );
    });
  });
  describe("(20)6ヶ月/活動時間(朝75、昼80、夕90)/睡眠49min/10時起床/ずり這い習得", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        acquisition.sixMonth,
        [],
        wakeWindows.sixMonthWakeWindows.hourly,
        baby.sixMonthBaby,
        sleepingSituation.sixMonthWakeWindows.noon.short
      );
      console.log(
        `(20)6ヶ月/活動時間(朝75、昼80、夕90)/睡眠49min/10時起床/ずり這い習得 : ${result}`
      );
    });
  });
  describe("(21)6ヶ月/活動時間(朝75、昼80、夕90)/睡眠30min/10時起床/お座り練習/ずり這い習得", () => {
    it("テスト", async () => {
      const result = calculate(
        practicing.sixMonth,
        acquisition.sixMonth,
        [],
        wakeWindows.sixMonthWakeWindows.hourly,
        baby.sixMonthBaby,
        sleepingSituation.sixMonthWakeWindows.noon.short
      );
      console.log(
        `(21)6ヶ月/活動時間(朝75、昼80、夕90)/睡眠30min/10時起床/お座り練習/ずり這い習得 : ${result}`
      );
    });
  });
  describe("(22)6ヶ月/活動時間(朝75、昼80、夕90)/睡眠3hours/10時起床/お座り練習/ずり這い習得", () => {
    it("テスト", async () => {
      const result = calculate(
        practicing.sixMonth,
        acquisition.sixMonth,
        [],
        wakeWindows.sixMonthWakeWindows.hourly,
        baby.sixMonthBaby,
        sleepingSituation.sixMonthWakeWindows.noon.long
      );
      console.log(
        `(22)6ヶ月/活動時間(朝75、昼80、夕90)/睡眠3hours/10時起床/お座り練習/ずり這い習得 : ${result}`
      );
    });
  });
  describe("(23)6ヶ月/活動時間(朝75、昼80、夕90)/睡眠3hours/23時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.sixMonthWakeWindows.hourly,
        baby.sixMonthBaby,
        sleepingSituation.sixMonthWakeWindows.night.long
      );
      console.log(
        `(23)6ヶ月/活動時間(朝75、昼80、夕90)/睡眠3hours/23時起床 : ${result}`
      );
    });
  });
  describe("(24)6ヶ月/活動時間(朝75、昼80、夕90)/睡眠30min/23時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.sixMonthWakeWindows.hourly,
        baby.sixMonthBaby,
        sleepingSituation.sixMonthWakeWindows.night.short
      );
      console.log(
        `(24)6ヶ月/活動時間(朝75、昼80、夕90)/睡眠30min/23時起床 : ${result}`
      );
    });
  });
  describe("(25)8ヶ月/活動時間(朝85、昼90、夕100)/睡眠54min/6時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.eightMonthWakeWindows,
        baby.eightMonthBaby,
        sleepingSituation.eightMonthWakeWindows.morning.short
      );
      console.log(
        `(25)8ヶ月/活動時間(朝85、昼90、夕100)/睡眠54min/6時起床 : ${result}`
      );
    });
  });
  describe("(26)8ヶ月/活動時間(朝85、昼90、夕100)/睡眠3hours/7時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.eightMonthWakeWindows,
        baby.eightMonthBaby,
        sleepingSituation.eightMonthWakeWindows.morning.long
      );
      console.log(
        `(26)8ヶ月/活動時間(朝85、昼90、夕100)/睡眠3hours/7時起床 : ${result}`
      );
    });
  });
  describe("(27)8ヶ月/活動時間(朝85、昼90、夕100)/睡眠3hours/7時起床/ハイハイ練習", () => {
    it("テスト", async () => {
      const result = calculate(
        practicing.eightMonth,
        [],
        [],
        wakeWindows.eightMonthWakeWindows,
        baby.eightMonthBaby,
        sleepingSituation.eightMonthWakeWindows.morning.long
      );
      console.log(
        `(27)8ヶ月/活動時間(朝85、昼90、夕100)/睡眠3hours/7時起床/ハイハイ練習 : ${result}`
      );
    });
  });
  describe("(28)8ヶ月/活動時間(朝85、昼90、夕100)/睡眠54min/10時起床/ハイハイ練習", () => {
    it("テスト", async () => {
      const result = calculate(
        practicing.eightMonth,
        [],
        [],
        wakeWindows.eightMonthWakeWindows,
        baby.eightMonthBaby,
        sleepingSituation.eightMonthWakeWindows.noon.short
      );
      console.log(
        `(28)8ヶ月/活動時間(朝85、昼90、夕100)/睡眠54min/10時起床/ハイハイ練習 : ${result}`
      );
    });
  });
  describe("(29)8ヶ月/活動時間(朝85、昼90、夕100)/睡眠3hours/10時起床/ハイハイ練習/お座り習得", () => {
    it("テスト", async () => {
      const result = calculate(
        practicing.eightMonth,
        acquisition.eightMonth,
        [],
        wakeWindows.eightMonthWakeWindows,
        baby.eightMonthBaby,
        sleepingSituation.eightMonthWakeWindows.noon.long
      );
      console.log(
        `(29)8ヶ月/活動時間(朝85、昼90、夕100)/睡眠3hours/10時起床/ハイハイ練習/お座り習得 : ${result}`
      );
    });
  });
  describe("(30)8ヶ月/活動時間(朝85、昼90、夕100)/睡眠54min/15時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.eightMonthWakeWindows,
        baby.eightMonthBaby,
        sleepingSituation.eightMonthWakeWindows.evening.short
      );
      console.log(
        `(30)8ヶ月/活動時間(朝85、昼90、夕100)/睡眠54min/15時起床 : ${result}`
      );
    });
  });
  describe("(31)8ヶ月/活動時間(朝85、昼90、夕100)/睡眠3hours/15時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.eightMonthWakeWindows,
        baby.eightMonthBaby,
        sleepingSituation.eightMonthWakeWindows.evening.long
      );
      console.log(
        `(31)8ヶ月/活動時間(朝85、昼90、夕100)/睡眠3hours/15時起床 : ${result}`
      );
    });
  });
  describe("(32)8ヶ月/活動時間(朝85、昼90、夕100)/睡眠54min/23時起床/お座り習得", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        acquisition.eightMonth,
        [],
        wakeWindows.eightMonthWakeWindows,
        baby.eightMonthBaby,
        sleepingSituation.eightMonthWakeWindows.night.short
      );
      console.log(
        `(32)8ヶ月/活動時間(朝85、昼90、夕100)/睡眠54min/23時起床/ハイハイ練習 : ${result}`
      );
    });
  });
  describe("(33)8ヶ月/活動時間(朝85、昼90、夕100)/睡眠3hours/23時起床/ハイハイ練習", () => {
    it("テスト", async () => {
      const result = calculate(
        practicing.eightMonth,
        [],
        [],
        wakeWindows.eightMonthWakeWindows,
        baby.eightMonthBaby,
        sleepingSituation.eightMonthWakeWindows.night.long
      );
      console.log(
        `(33)8ヶ月/活動時間(朝85、昼90、夕100)/睡眠3hours/23時起床/ハイハイ練習 : ${result}`
      );
    });
  });
  describe("(34)10ヶ月/活動時間(朝140、昼160、夕180)/睡眠59min/6時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.tenMonthWakeWindows,
        baby.tenMonthBaby,
        sleepingSituation.tenMonthWakeWindows.morning.short
      );
      console.log(
        `(34)10ヶ月/活動時間(朝140、昼160、夕180)/睡眠59min/6時起床 : ${result}`
      );
    });
  });
  describe("(35)10ヶ月/活動時間(朝140、昼160、夕180)/睡眠3hours/6時起床/ハイハイ練習", () => {
    it("テスト", async () => {
      const result = calculate(
        practicing.tenMonth,
        [],
        [],
        wakeWindows.tenMonthWakeWindows,
        baby.tenMonthBaby,
        sleepingSituation.tenMonthWakeWindows.morning.long
      );
      console.log(
        `(35)10ヶ月/活動時間(朝140、昼160、夕180)/睡眠3hours/7時起床/ハイハイ練習 : ${result}`
      );
    });
  });
  describe("(36)10ヶ月/活動時間(朝140、昼160、夕180)/睡眠59min/10時起床/ハイハイ習得", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        acquisition.tenMonth,
        [],
        wakeWindows.tenMonthWakeWindows,
        baby.tenMonthBaby,
        sleepingSituation.tenMonthWakeWindows.noon.short
      );
      console.log(
        `(36)10ヶ月/活動時間(朝140、昼160、夕180)/睡眠59min/10時起床/ハイハイ習得 : ${result}`
      );
    });
  });
  describe("(37)10ヶ月/活動時間(朝140、昼160、夕180)/睡眠3hours/10時起床/ハイハイ習得/伝い歩き練習", () => {
    it("テスト", async () => {
      const result = calculate(
        practicing.tenMonth,
        acquisition.tenMonth,
        [],
        wakeWindows.tenMonthWakeWindows,
        baby.tenMonthBaby,
        sleepingSituation.tenMonthWakeWindows.noon.long
      );
      console.log(
        `(37)10ヶ月/活動時間(朝140、昼160、夕180)/睡眠3hours/7時起床/ハイハイ練習/伝い歩き練習 : ${result}`
      );
    });
  });
  describe("(38)10ヶ月/活動時間(朝140、昼160、夕180)/睡眠59min/15時起床/歩いた", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        walking,
        wakeWindows.tenMonthWakeWindows,
        baby.tenMonthBaby,
        sleepingSituation.tenMonthWakeWindows.evening.short
      );
      console.log(
        `(38)10ヶ月/活動時間(朝140、昼160、夕180)/睡眠59min/15時起床/歩いた : ${result}`
      );
    });
  });
  describe("(39)10ヶ月/活動時間(朝140、昼160、夕180)/睡眠3hours/15時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.tenMonthWakeWindows,
        baby.tenMonthBaby,
        sleepingSituation.tenMonthWakeWindows.evening.long
      );
      console.log(
        `(39)10ヶ月/活動時間(朝140、昼160、夕180)/睡眠3hours/15時起床 : ${result}`
      );
    });
  });
  describe("(40)10ヶ月/活動時間(朝140、昼160、夕180)/睡眠59min/23時起床/歩いた", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        walking,
        wakeWindows.tenMonthWakeWindows,
        baby.tenMonthBaby,
        sleepingSituation.tenMonthWakeWindows.night.short
      );
      console.log(
        `(40)10ヶ月/活動時間(朝140、昼160、夕180)/睡眠59min/23時起床/歩いた : ${result}`
      );
    });
  });
  describe("(41)10ヶ月/活動時間(朝140、昼160、夕180)/睡眠3hours/23時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.tenMonthWakeWindows,
        baby.tenMonthBaby,
        sleepingSituation.tenMonthWakeWindows.night.long
      );
      console.log(
        `(41)10ヶ月/活動時間(朝140、昼160、夕180)/睡眠3hours/23時起床 : ${result}`
      );
    });
  });
  describe("(42)18ヶ月/活動時間(360)/睡眠59min/7時起床/歩いた", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.eightteenMonthWakeWindows.basicOnly,
        baby.eightteenMonthBaby,
        sleepingSituation.eighteenMonthWakeWindows.morning.short
      );
      console.log(
        `(42)18ヶ月/活動時間(360)/睡眠59min/7時起床/歩いた : ${result}`
      );
    });
  });
  describe("(43)18ヶ月/活動時間(360)/睡眠59min/14時半起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.eightteenMonthWakeWindows.basicOnly,
        baby.eightteenMonthBaby,
        sleepingSituation.eighteenMonthWakeWindows.noon.short
      );
      console.log(`(43)18ヶ月/活動時間(360)/睡眠3hours/14時半起床 : ${result}`);
    });
  });
  describe("(44)18ヶ月/活動時間(360)/睡眠3hours/7時起床/歩いた", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        walking,
        wakeWindows.eightteenMonthWakeWindows.basicOnly,
        baby.eightteenMonthBaby,
        sleepingSituation.eighteenMonthWakeWindows.morning.long
      );
      console.log(
        `(44)18ヶ月/活動時間(360)/睡眠3hours/7時起床/歩いた : ${result}`
      );
    });
  });
  describe("(45)18ヶ月/活動時間(360)/睡眠3hours/14時半起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        walking,
        wakeWindows.eightteenMonthWakeWindows.basicOnly,
        baby.eightteenMonthBaby,
        sleepingSituation.eighteenMonthWakeWindows.noon.long
      );
      console.log(`(45)18ヶ月/活動時間(360)/睡眠3hours/14時半起床 : ${result}`);
    });
  });
  describe("(46)18ヶ月/活動時間(朝180、昼240)/睡眠3hours/7時起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.eightteenMonthWakeWindows.hourly,
        baby.eightteenMonthBaby,
        sleepingSituation.eighteenMonthWakeWindows.morning.long
      );
      console.log(
        `(46)18ヶ月/活動時間(朝180、昼240)/睡眠3hours/7時起床 : ${result}`
      );
    });
  });
  describe("(47)18ヶ月/活動時間(朝180、昼240)/睡眠3hours/11時半起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.eightteenMonthWakeWindows.hourly,
        baby.eightteenMonthBaby,
        sleepingSituation.addition_eighteenMonthWakeWindows.noon
      );
      console.log(
        `(47)18ヶ月/活動時間(朝180、昼240)/睡眠3hours/11時半起床 : ${result}`
      );
    });
  });
  describe("(48)18ヶ月/活動時間(朝180、昼240)/睡眠3hours/15時10分起床", () => {
    it("テスト", async () => {
      const result = calculate(
        [],
        [],
        [],
        wakeWindows.eightteenMonthWakeWindows.hourly,
        baby.eightteenMonthBaby,
        sleepingSituation.addition_eighteenMonthWakeWindows.evening
      );
      console.log(
        `(48)18ヶ月/活動時間(朝180、昼240)/睡眠3hours/15時10分起床 : ${result}`
      );
    });
  });
});

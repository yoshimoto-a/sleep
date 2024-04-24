"use client";

import { useState, useEffect } from "react";
import { Input } from "@/app/_components/input";
import { Label } from "@/app/_components/label";

export default function Page() {
  const [basic, setBasic] = useState<number | null>(null);
  const [morning, setMorning] = useState<number | null>(null);
  const [afternoon, setAfternoon] = useState<number | null>(null);
  const [evening, setEvening] = useState<number | null>(null);
  const [sinceBedtime, setSinceBedtime] = useState<number | null>(null);

  //初期設定
  useEffect(() => {});

  return (
    <>
      <h1>詳細設定</h1>
      <div>
        <Label text="基本の活動時間" htmlFor="basic"></Label>
        <Input
          id="basic"
          type="number"
          value={String(basic)}
          placeholder=""
          onChange={value => setBasic(Number(value))}
        ></Input>
        <Label text="寝かしつけ開始は何分前？" htmlFor="basic"></Label>
        <Input
          id="sinceBedtime"
          type="number"
          value={String(sinceBedtime)}
          placeholder=""
          onChange={value => setSinceBedtime(Number(value))}
        ></Input>
      </div>
      <div>
        <div>
          <h2>活動時間詳細設定</h2>
          <p>詳細登録がある場合、そちらが優先されます</p>
        </div>
        <div>
          <Label text="朝寝(7時～11時)" htmlFor="morning"></Label>
          <Input
            id="morning"
            type="number"
            value={String(morning)}
            placeholder=""
            onChange={value => setMorning(Number(value))}
          ></Input>
          <Label text="昼寝(11時～15時)" htmlFor="afternoon"></Label>
          <Input
            id="afternoon"
            type="number"
            value={String(afternoon)}
            placeholder=""
            onChange={value => setAfternoon(Number(value))}
          ></Input>
          <Label text="夕寝(15時～18時)" htmlFor="evening"></Label>
          <Input
            id="evening"
            type="number"
            value={String(evening)}
            placeholder=""
            onChange={value => setEvening(Number(value))}
          ></Input>
        </div>
      </div>
    </>
  );
}

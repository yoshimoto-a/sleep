import Image from "next/image";
import { useState } from "react";
import { useWeight } from "../_hooks/useWeight";
import { Button } from "./Button";
import { Input } from "@/app/_components/input";
import { Label } from "@/app/_components/label";
import { CustomModal } from "@/app/_components/modal";
import { Weight } from "@/app/_types/apiRequests/dashboard/weight";

interface Props {
  rowItem: Weight;
  mutate: any;
}
export const EditButton: React.FC<Props> = ({ rowItem, mutate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    weight,
    weightError,
    date,
    handleChangeWeight,
    handleChangeDate,
    put,
    del,
  } = useWeight(rowItem.id, rowItem.weight, rowItem.measurementDate, mutate);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="">
        <Image alt="編集" src="/edit/edit.png" width={15} height={15}></Image>
      </button>
      <CustomModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20"
      >
        <div className="w-full">
          <Label htmlFor="measurementDate" text="計測日"></Label>
          <Input
            id="measurementDate"
            type="date"
            value={date}
            placeholder=""
            inputMode="numeric"
            onChange={val => {
              handleChangeDate(val);
            }}
          ></Input>

          <Label htmlFor="weight" text="体重"></Label>
          <Input
            id="weight"
            type="number"
            value={weight ? weight.toString() : ""}
            placeholder="3000g"
            inputMode="numeric"
            onChange={val => {
              handleChangeWeight(val);
            }}
          ></Input>
          {weightError && <p>{weightError}</p>}

          <div>
            <Button text="キャンセル" onclick={() => setIsOpen(false)}></Button>
            <Button text="保存" onclick={put}></Button>
          </div>
          <button onClick={del} className="absolute inset-b-0 right-20">
            <Image
              alt="削除"
              src="/weight/rubbish.png"
              width={20}
              height={20}
            ></Image>
          </button>
        </div>
      </CustomModal>
    </>
  );
};
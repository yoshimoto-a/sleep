import Image from "next/image";
import { useState } from "react";
import { useWeightForm } from "../_hooks/useWeightForm";
import { Button } from "@/app/_components/Button";
import { Label } from "@/app/_components/Label";
import { Input } from "@/app/_components/input";
import { CustomModal } from "@/app/_components/modal";
import { Weight } from "@/app/_types/apiRequests/dashboard/weight/Index";
interface Props {
  isSubmitting: boolean;
  rowItem: Weight;
  mutate: any;
}
export const ControlButtomWithModal: React.FC<Props> = ({
  isSubmitting,
  rowItem,
  mutate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    weight,
    weightError,
    date,
    handleChangeWeight,
    handleChangeDate,
    put,
    del,
  } = useWeightForm(
    rowItem.id,
    rowItem.weight,
    rowItem.measurementDate,
    mutate,
    setIsOpen
  );
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="">
        <Image alt="編集" src="/weight/edit.png" width={15} height={15} />
      </button>
      <CustomModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20"
      >
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Label htmlFor="measurementDate" text="計測日" />
          <Input
            id="measurementDate"
            type="date"
            value={date}
            placeholder=""
            inputMode="numeric"
            disabled={isSubmitting}
            onChange={val => {
              handleChangeDate(val);
            }}
          />

          <Label htmlFor="weight" text="体重" />
          <Input
            id="weight"
            type="number"
            value={weight ? weight.toString() : ""}
            placeholder="3000g"
            inputMode="numeric"
            disabled={isSubmitting}
            onChange={val => {
              handleChangeWeight(val);
            }}
          />
          {weightError && <p>{weightError}</p>}
          <div className="h-10 w-[150px] mb-2">
            <Button
              disabled={isSubmitting}
              onClick={() => setIsOpen(false)}
              type="button"
              variant="outlined"
            >
              キャンセル
            </Button>
          </div>
          <div className="h-10 w-[150px] mb-2">
            <Button
              disabled={isSubmitting}
              onClick={put}
              type="button"
              variant="outlined"
            >
              保存
            </Button>
          </div>
          <div className="absolute bottom-10 right-20">
            <Button onClick={del} type="button">
              <Image
                alt="削除"
                src="/weight/rubbish.png"
                width={20}
                height={20}
              />
            </Button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

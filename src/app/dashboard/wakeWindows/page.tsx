"use client";

import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toaster } from "react-hot-toast";
import { CautionaryNote } from "./_components/CautionaryNote";
import { FormSection } from "./_components/FormSection";
import { Guideline } from "./_components/guideline";
import { useWakeWindows } from "./_hooks/useWakeWindows";
import { Button } from "@/app/_components/Button";
import { HookFormInput } from "@/app/_components/HookFormInput";
import { Label } from "@/app/_components/Label";
export default function Page() {
  const {
    handleSubmit,
    isSubmitting,
    wakeWindowsError,
    isLoading,
    register,
    errors,
    isOpen,
    setIsOpen,
  } = useWakeWindows();

  if (isLoading) return;
  if (wakeWindowsError)
    return <div className="text-center">データの取得に失敗しました</div>;

  return (
    <div
      onClick={() => {
        isOpen && setIsOpen(false);
      }}
    >
      <h1 className="pt-10 text-center text-lg">活動時間設定</h1>
      <div>
        <Toaster position="top-center" />
      </div>
      <Guideline />
      <form
        onSubmit={handleSubmit}
        className="bg-custom-gray shadow-md rounded px-4 pt-6 pb-8 my-4"
      >
        <div className="flex flex-col">
          <CautionaryNote />
          <div className="flex justify-between gap-4">
            <FormSection
              label="基本の活動時間"
              idHour="basicHour"
              disabled={isSubmitting}
              idMinute="basicMinutes"
              errors={errors}
              register={register}
            />
            <div className="w-1/2">
              {isOpen && (
                <div className="bg-black bg-opacity-90 text-white text-xs p-2 mb-2 rounded-md relative after:absolute after:right-2 after:top-[63px] after:bg-black after:opacity-90 after:[clip-path:polygon(0_0,50%_100%,100%_0)] after:z-10 after:w-5 after:h-3 after:contents-['']">
                  お勧めねんね時刻をもとに寝かしつけ開始時刻の目安を算出するのに使用する時間です。
                </div>
              )}
              <div className="flex gap-2 justify-start">
                <Label text="寝かしつけ開始(分前)" />
                <div
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  className="pr-[10px]"
                >
                  <FontAwesomeIcon icon={faCircleQuestion} />
                </div>
              </div>
              <HookFormInput
                name="sinceBedtime"
                type="number"
                placeholder="分前"
                inputMode="numeric"
                isSubmitting={isSubmitting}
                validation={{
                  required: "数値",
                }}
                register={register}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2>活動時間詳細設定</h2>
          <span className="text-sm pb-3">
            登録がある場合、計算は時間帯別に行われます。
          </span>
        </div>
        <div className="flex gap-4">
          <FormSection
            label="朝寝(7~11時)"
            idHour="morningHour"
            disabled={isSubmitting}
            idMinute="morningMinutes"
            errors={errors}
            register={register}
          />
          <FormSection
            label="昼寝(11~15時)"
            idHour="afternoonHour"
            disabled={isSubmitting}
            idMinute="afternoonMinutes"
            errors={errors}
            register={register}
          />
          <FormSection
            label="夕寝(15~18時)"
            idHour="eveningHour"
            disabled={isSubmitting}
            idMinute="eveningMinutes"
            errors={errors}
            register={register}
          />
        </div>
        <div className="flex justify-center">
          <div className="w-32 h-10">
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained-blu500"
            >
              保存
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

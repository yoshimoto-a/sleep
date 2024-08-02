"use client";

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
  } = useWakeWindows();

  if (isLoading) return;
  if (wakeWindowsError)
    return <div className="text-center">データの取得に失敗しました</div>;

  return (
    <>
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
          <div className="flex gap-4">
            <FormSection
              label="基本の活動時間"
              idHour="basicHour"
              disabled={isSubmitting}
              idMinute="basicMinutes"
              errors={errors}
              register={register}
            />
            <div className="flex-1">
              <Label text="寝かしつけ開始(分前)" />
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
    </>
  );
}

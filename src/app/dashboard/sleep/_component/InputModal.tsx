"use client";
import dayjs from "dayjs";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ModalButton } from "../../growth/_components/ModalButton";
import { UserContext } from "../../layout";
import { useGetDataById } from "../_hooks/useGetDataById";
import { IsLoading } from "@/app/_components/isLoading";
import { useApi } from "@/app/_hooks/useApi";
import { DeleteRequest } from "@/app/_types/apiRequests/dashboard/sleep/deleteRequest";
import { DeleteResponse } from "@/app/_types/apiRequests/dashboard/sleep/deleteResponse";
import { UpdateRequests } from "@/app/_types/apiRequests/dashboard/sleep/updateRequest";
import { UpdateResponse } from "@/app/_types/apiRequests/dashboard/sleep/updateResponse";

interface Props {
  onClose: () => void;
  id: number;
  mutate: any;
}
export const InputModal: React.FC<Props> = ({ onClose, id, mutate }) => {
  //idで一連の情報を取得する
  const { isLoading, data, error } = useGetDataById(id);
  const [bedtime, setBedtime] = useState<Date | null>(null);
  const [sleep, setSleep] = useState<Date | null>(null);
  const [wakeup, setWakeup] = useState<Date | null>(null);
  const fetcher = useApi();
  const [dbUserId] = useContext(UserContext);
  useEffect(() => {
    if (!data) return;
    setBedtime(data.data.bedTime);
    setSleep(data.data.sleep);
    setWakeup(data.data.wakeup);
  }, [data]);
  if (isLoading) return <IsLoading />;
  if (error) return <div>エラー発生</div>;

  const put = async () => {
    if (!dbUserId) return;
    if (!sleep || !wakeup) {
    }
    try {
      const body = {
        id,
        bedtime,
        sleep,
        wakeup,
        changeUser: dbUserId,
      };
      const resp = await fetcher.put<UpdateRequests, UpdateResponse>(
        "/api/dashboard/sleep",
        body
      );

      if (resp.status === 200) {
        mutate();
      } else {
        throw new Error(`response is ${resp}`);
      }
    } catch (e) {
      alert("更新に失敗しました");
    }
  };
  const del = async () => {
    try {
      const body = {
        id,
      };
      const resp = await fetcher.del<DeleteRequest, DeleteResponse>(
        "/api/dashboard/sleep",
        body
      );
      if (resp.status === 200) {
        mutate();
      } else {
        throw new Error(`statusCode is ${resp.status}`);
      }
    } catch (e) {
      alert("削除に失敗しました");
    }
  };

  const handleSave = () => {
    onClose();
    put();
  };
  const handleDelete = () => {
    if (!confirm("寝かしつけ～起きたまで全て消えます。削除していいですか？"))
      return;
    del();
    onClose();
  };
  return (
    <>
      <label className="flex justify-center">寝かしつけ開始</label>
      <input
        id="bedtime"
        type="datetime-local"
        value={dayjs(bedtime).format("YYYY-MM-DDTHH:mm:ss")}
        className="block p-2 m-5 border"
        onChange={e => {
          setBedtime(new Date(e.target.value));
        }}
      />
      <label className="flex justify-center">寝た</label>
      <input
        id="sleep"
        type="datetime-local"
        value={dayjs(sleep).format("YYYY-MM-DDTHH:mm:ss")}
        className="block p-2 m-5 border"
        onChange={e => {
          setSleep(new Date(e.target.value));
        }}
      />
      <label className="flex justify-center">起きた</label>
      <input
        id="wakeup"
        type="datetime-local"
        value={dayjs(wakeup).format("YYYY-MM-DDTHH:mm:ss")}
        className="block p-2 m-5 border"
        onChange={e => {
          setWakeup(new Date(e.target.value));
        }}
      />
      <div className="w-full flex pt-3 gap-5 justify-center">
        <ModalButton
          onClick={onClose}
          text="閉じる"
          colorClass="bg-gray-300"
        ></ModalButton>
        <ModalButton
          onClick={handleSave}
          text="保存"
          colorClass="bg-blue-500"
        ></ModalButton>
      </div>
      <button onClick={handleDelete} className="absolute inset-b-0 right-20">
        <Image alt="削除" src="/weight/rubbish.png" width={20} height={20} />
      </button>
    </>
  );
};

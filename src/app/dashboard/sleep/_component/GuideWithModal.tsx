"use client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { CustomModal } from "@/app/_components/modal";
export const GuideWithModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <div onClick={openModal} className="text-sm cursor-pointer">
        アプリガイド
      </div>
      <CustomModal isOpen={isOpen} onClose={closeModal} className="">
        <div className="flex justify-end cursor-pointer" onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} className="h-6" />
        </div>
        <h1 className="text-center pb-5 text-2xl">アプリガイド</h1>

        <h2 className="text-xl pb-2 flex gap-1 items-center">
          <FontAwesomeIcon icon={faCheck} className="h-5" />
          睡眠データ登録の順番
        </h2>
        <p className="pb-5">
          寝ていないと起きられない仕様になっています。一番最初は「寝かしつけ開始」または「寝た」のデータを登録してください。
          <br />
          ※「寝かしつけ開始」の登録は任意です。
          <br />
          ※「寝た」登録がないと「起きた」登録はできませんのでご注意ください。
        </p>

        <h2 className="text-xl pb-2 flex gap-1 items-center">
          <FontAwesomeIcon icon={faCheck} className="h-5" />
          直近の登録が「寝た」の場合の制御
        </h2>
        <p className="pb-5">
          直近の登録が「寝た」の場合、「起きた」以外の登録は一括登録しか使うことができません。
          <br />
          また、「寝た」時刻より後の時間で一括登録を行うこともできません。
          <br />
          不整合なデータができることを阻止するためにそのような仕様にしております。
          今後、登録出来ないボタンは非表示にするなどの対応は行っていく予定です。
        </p>

        <div>
          ご不便をおかけして申し訳ありません。
          <br />
          その他、疑問点等ありましたら、
          <Link
            href={
              "https://www.instagram.com/sleep_app_info?igsh=enp1ZnprOThtbXFp&utm_source=qr"
            }
            target="_blank"
            className="border-b-2 px-1 text-blue-500"
          >
            instagram
          </Link>
          からお気軽にDMいただきますようよろしくお願いいたします。
        </div>
      </CustomModal>
    </>
  );
};

"use client";
import Image from "next/image";
import { useGetLoginUser } from "../_hooks/useGetLoginUser";
import { RowItem } from "./_components/rowItem";
import { useLogout } from "./_hooks/useLogout";
import { IsLoading } from "@/app/_components/isLoading";

export default function Menu() {
  const { data, error, isLoading } = useGetLoginUser();
  const { logout } = useLogout();
  if (isLoading) return <IsLoading />;
  if (error) return <div>エラー発生</div>;
  if (!isLoading && !data) return <div>ユーザー情報なし</div>;

  return (
    <>
      <h1 className="pt-5 text-center text-lg">メニュー</h1>
      <RowItem icon="/_menuIcon/growth.png" link="./growth/" title="発達登録" />
      <RowItem
        icon="/_footerIcon/weight.png"
        link="./weight/"
        title="体重登録"
      />
      <RowItem
        icon="/_footerIcon/setting.png"
        link="./wakeWindows/"
        title="活動時間登録"
      />
      {/* 追加予定<RowItem icon="/_menuIcon/chat.png" link="./chat/" title="チャット" /> */}
      {data?.data?.role === "MAIN" && (
        <RowItem
          icon="/_menuIcon/subSignup.png"
          link="./subSignup/"
          title="サブアカウントの作成"
        />
      )}
      {/* 追加予定<RowItem icon="/_menuIcon/graph.png" link="./weight/" title="成長曲線" /> */}
      <RowItem
        icon="/_menuIcon/setting.png"
        link="./setting/"
        title="赤ちゃん情報の設定"
      />
      <div onClick={logout}>
        <Image
          src="/_menuIcon/logout.png"
          alt="logout"
          height={30}
          width={30}
          className="p-2"
        />
        <span className="text-lg">ログアウト</span>
      </div>
    </>
  );
}

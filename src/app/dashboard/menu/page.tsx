"use client";
import { useGetLoginUser } from "../_hooks/useGetLoginUser";
import { RowItem } from "./_components/rowItem";
import { IsLoading } from "@/app/_components/isLoading";

export default function Menu() {
  const { data, error, isLoading } = useGetLoginUser();

  if (isLoading) return <IsLoading></IsLoading>;
  if (error) return <div>エラー発生</div>;
  if (!isLoading && !data) return <div>ユーザー情報なし</div>;
  return (
    <>
      <h1 className="my-5 text-center text-lg">メニュー</h1>
      <RowItem icon="/_menuIcon/growth.png" link="./growth/" title="発達登録" />
      {/* <RowItem icon="/_menuIcon/chat.png" link="./chat/" title="チャット" /> */}
      {data?.data?.role === "MAIN" && (
        <RowItem
          icon="/_menuIcon/subSignup.png"
          link="./subSignup/"
          title="サブアカウントの作成"
        />
      )}
      {/* <RowItem icon="/_menuIcon/graph.png" link="./weight/" title="成長曲線" /> */}
      <RowItem
        icon="/_menuIcon/setting.png"
        link="./setting/"
        title="赤ちゃん情報の設定"
      />
      <RowItem
        icon="/_menuIcon/logout.png"
        link="./"
        title="ログアウト(挙動検討)"
      />
    </>
  );
}

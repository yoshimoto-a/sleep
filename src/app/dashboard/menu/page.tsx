"use client";
import { RowItem } from "./_components/rowItem";

export default function Menu() {
  return (
    <>
      <h1 className="my-5 text-center text-lg">メニュー</h1>
      <RowItem icon="/_menuIcon/chat.png" link="./chat/" title="チャット" />
      <RowItem
        icon="/_menuIcon/subSignup.png"
        link="./subSignup/"
        title="サブアカウントの作成"
      />
      <RowItem icon="/_menuIcon/graph.png" link="./weight/" title="成長曲線" />
      <RowItem
        icon="/_menuIcon/setting.png"
        link="./setting/"
        title="初期設定の変更"
      />
      <RowItem
        icon="/_menuIcon/logout.png"
        link="./"
        title="ログアウト(挙動検討)"
      />
    </>
  );
}

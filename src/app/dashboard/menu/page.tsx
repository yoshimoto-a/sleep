"use client";
import Image from "next/image";
import { useGetLoginUser } from "../../_hooks/useGetLoginUser";
import { Footer } from "../_components/footer";
import { RowItem } from "./_components/rowItem";
import { useLogout } from "./_hooks/useLogout";
import { IsLoading } from "@/app/_components/isLoading";

export default function Menu() {
  const { role, error, isLoading } = useGetLoginUser();
  const { logout } = useLogout();
  if (isLoading) return <IsLoading />;
  if (error) return <div>エラー発生</div>;
  if (!isLoading && !role) return <div>ユーザー情報なし</div>;

  return (
    <>
      <h1 className="pt-5 text-center text-lg">メニュー</h1>
      <RowItem
        icon="/_menuIcon/barChart.png"
        link="./weeklySleepChart/"
        title="週間ログ"
      />
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
      {role === "MAIN" && (
        <RowItem
          icon="/_menuIcon/subSignup.png"
          link="./subSignup/"
          title="サブアカウントの作成"
        />
      )}
      <RowItem
        icon="/_menuIcon/setting.png"
        link="./setting/"
        title="赤ちゃん情報の設定"
      />
      <RowItem
        icon="/_menuIcon/Instagram.png"
        link="https://www.instagram.com/sleep_app_info?igsh=enp1ZnprOThtbXFp&utm_source=qr"
        title="お問い合わせ(instagramのDMから)"
      />
      <div
        onClick={logout}
        className="border-b w-4/5 mx-auto pt-5 flex items-center space-x-4 cursor-pointer"
      >
        <Image
          src="/_menuIcon/logout.png"
          alt="logout"
          height={30}
          width={30}
          className="p-2"
        />
        <span className="text-lg">ログアウト</span>
      </div>
      <Footer />
    </>
  );
}

"use client";

import React from "react";
import { Button } from "./_components/Button";
import { TopPageImg } from "./_components/TopPageImg";
import { TopPageLink } from "./_components/TopPageLink";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { useGuestLogin } from "./_hooks/useGuestLogin";
export default function Home() {
  const { handleClick, isSubmitting } = useGuestLogin();
  return (
    <div className="min-h-screen">
      <Header />
      <div className="grid place-items-center pt-10">
        <div className="text-center">
          <p>
            赤ちゃんが一番眠りやすい
            <br />
            タイミングを逃さない
          </p>
          <h1 className="text-5xl m-5">sleep</h1>
          <p>睡眠に特化した育児記録アプリ</p>
        </div>

        <div className="flex justify-center pt-10">
          <TopPageLink link="/signup" backgroundColor="bg-gray-300">
            ユーザー登録
          </TopPageLink>
          <TopPageLink link="/login" backgroundColor="bg-gray-300">
            ログイン
          </TopPageLink>
        </div>
        <div className="flex justify-center mt-4 w-32 h-10">
          <Button
            onClick={handleClick}
            disabled={isSubmitting}
            type="button"
            variant="contained-blu"
          >
            ゲストログイン
          </Button>
        </div>
        <div className="bg-gray-100 mt-10">
          <div className="mt-10 text-center">
            <h2 className="py-5 text-xl">専門家監修</h2>
            <div>
              乳幼児の睡眠のプロフェッショナル
              <br />
              IPHI乳幼児睡眠コンサルタント
              <br />
              坪根理恵先生監修のもと開発
            </div>
            <div className="mt-5 flex justify-center">
              <TopPageImg src={"/_topPage/rie.jpg"} alt="tsuboneRie" />
            </div>
            <div className="mt-8 flex justify-center">
              <TopPageLink link="/expers" backgroundColor="bg-custom-blue">
                もっと詳しく
              </TopPageLink>
            </div>
          </div>
          <div className="pt-10 text-center w-full">
            <h2 className="py-5 text-xl">次回入眠推奨時刻の自動計算</h2>
            <div>
              <div className="p-2">
                睡眠時間・発達等の
                <br />
                活動時間に影響を与える要素をもとに
                <br />
                最適なねんね時刻を自動計算
                <br />
                <span className="text-sm">
                  ※その時間に寝ると保証するものではありません
                </span>
              </div>
              <div className="p-5 flex justify-center w-full">
                <TopPageImg src={"/_topPage/sleep.PNG"} alt="topPageImage" />
                <TopPageImg
                  src={"/_topPage/growth.PNG"}
                  alt="growthPageImage"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <h2 className="py-5 text-xl">アカウント共有機能</h2>
            <div className="p-2">
              夫婦、その他保育者とアカウントを共有して
              <br />
              誰でも情報の入力や共有が可能。
              <br />
              睡眠コンサルタントに共有して情報提供も楽々。
              <br />
              共有できる人数に制限もありません
            </div>
            <div className="flex justify-center">
              <TopPageImg src={"/_topPage/share.PNG"} alt="share" />
            </div>
          </div>
          <div className="mb-5 text-center">
            <h2 className="py-5 text-xl">体重記録機能</h2>
            <div className="p-2">
              体重の増え方も日割りで自動計算
              <br />
              測る度に電卓を叩く必要がなくなります
            </div>
            <div className="p-5 flex justify-center">
              <TopPageImg src={"/_topPage/weight.PNG"} alt="weightPageImage" />
            </div>
          </div>
          <div className="mb-20 flex justify-center">
            <TopPageLink link="/signup" backgroundColor="bg-custom-blue">
              はじめる
            </TopPageLink>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

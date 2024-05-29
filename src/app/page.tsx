import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Header } from "./_components/header";

export default function Home() {
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

        <div className="flex items-center gap-2 pt-10">
          <div className="px-5 py-2 w-40 bg-gray-300 rounded-full text-center">
            <Link href="./signup" className="header-link">
              ユーザー登録
            </Link>
          </div>
          <div className="px-5 py-2 w-40 bg-gray-300 rounded-full text-center">
            <Link href="/login" className="header-link">
              ログイン
            </Link>
          </div>
        </div>
        <div className="mt-10 text-center w-full">
          <h2 className="py-5 text-xl">専門家監修</h2>
          <div>
            乳幼児の睡眠のプロフェッショナル
            <br />
            IPHI乳幼児睡眠コンサルタント
            <br />
            坪根理恵先生監修のもと開発
          </div>
          <div className="mt-5 flex justify-center">
            <Image
              alt="tsuboneRie"
              src={"/_topPage/Rie.png"}
              width={150}
              height={0}
              layout="intrinsic"
            ></Image>
          </div>
          <div className="mt-8 flex justify-center">
            <div className="px-5 py-2 w-40 border border-gray-400	 rounded-full text-center">
              <Link href="/expers" className="header-link">
                もっと詳しく
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-10 text-center w-full">
          <h2 className="py-5 text-xl">次回入眠推奨時刻の自動計算</h2>
          <div>
            <div>
              睡眠時間・発達等の要素をもとに
              <br />
              最適なねんね時刻を自動計算
              <br />
              <span className="text-sm">
                ※その時間に寝ると保証するものではありません
              </span>
            </div>
            <div className="p-5 flex justify-center">
              <Image
                alt="topPageImage"
                src={"/_topPage/sleep.jpg"}
                width={200}
                height={0}
                layout="intrinsic"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 text-center w-full">
          <h2 className="py-5 text-xl">アカウント共有機能</h2>
          <div>
            夫婦、その他保育者とアカウントを共有して
            <br />
            睡眠時間の情報を共有
            <br />
            睡眠コンサルタントに共有して情報提供...
            <br />
            共有できる数に制限はありません
          </div>
        </div>
        <div className="mt-10 text-center w-full">
          <h2 className="py-5 text-xl">体重記録機能</h2>
          <div>
            体重の増え方も日割りで自動計算
            <br />
            測る度に電卓を叩く必要がなくなります
          </div>
        </div>
      </div>
    </div>
  );
}

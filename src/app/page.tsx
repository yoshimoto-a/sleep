import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Footer } from "./_components/footer";
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
        <div className="bg-gray-100 w-full mt-10">
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
                src={"/_topPage/rie.jpg"}
                width={150}
                height={0}
                layout="intrinsic"
              ></Image>
            </div>
            <div className="mt-8 flex justify-center">
              <div className="px-5 py-2 w-40 rounded-full text-center bg-custom-blue">
                <Link href="/expers" className="header-link">
                  もっと詳しく
                </Link>
              </div>
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
              <div className="p-5 flex justify-center">
                <Image
                  alt="topPageImage"
                  src={"/_topPage/sleep.png"}
                  width={200}
                  height={0}
                  layout="intrinsic"
                />
                <Image
                  alt="topPage"
                  src={"/_topPage/growth.png"}
                  width={200}
                  height={0}
                  layout="intrinsic"
                ></Image>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center w-full">
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
            <div className="p-5 flex justify-center">
              <Image
                alt="topPage"
                src={"/_topPage/share.png"}
                width={200}
                height={0}
                layout="intrinsic"
              ></Image>
            </div>
          </div>
          <div className="mb-5 text-center w-full">
            <h2 className="py-5 text-xl">体重記録機能</h2>
            <div className="p-2">
              体重の増え方も日割りで自動計算
              <br />
              測る度に電卓を叩く必要がなくなります
            </div>
            <div className="p-5 flex justify-center">
              <Image
                alt="weightPage"
                src={"/_topPage/weight.PNG"}
                width={150}
                height={0}
                layout="intrinsic"
              ></Image>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

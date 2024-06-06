"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";

export default function Home() {
  return (
    <div className="min-h-screen  mb-3">
      <Header />
      <div className="grid place-items-center">
        <h2 className="py-5 text-xl">監修した専門家</h2>
      </div>

      <div className="flex justify-center">
        <Image
          alt="tsuboneRie"
          src={"/_topPage/rie.jpg"}
          width={200}
          height={0}
          layout="intrinsic"
        />
      </div>
      <h3 className="text-center pt-5">
        <span className="text-sm">imaneru 代表</span>
        <br />
        坪根理恵先生
      </h3>
      <div className="mt-3 flex justify-center items-center gap-2">
        <div>
          <Link href="https://instagram.com/imaneru_rie" target="_blank">
            <Image
              alt="Instagram"
              src={"/_topPage/Instagram_Glyph_Gradient.png"}
              width={30}
              height={30}
              layout="intrinsic"
            />
          </Link>
        </div>
        <div className="text-sm">
          2歳半差の2児の母
          <br />
          IPHI妊婦と乳幼児の睡眠コンサルタント
        </div>
      </div>

      <div className="m-3">
        <p>
          国際認定資格
          IPHI妊婦と乳幼児の睡眠コンサルタントとして、寝かしつけや夜泣きに悩むママさんの個別サポート、子育て講座の実施、睡眠学会への参加等、オンラインや地域でさまざまな活動をされている理恵さん。
          <br />
          ご自身も娘さんの夜泣きに3年間も悩まされたという過去をお持ちです。
        </p>
        <p>
          夜寝られない辛さを経験されているからこそ、ママさんに優しく寄り添って親子でぐっすり寝られるようにサポートしてくださいます。
        </p>
        <p>もし寝かしつけのタイミングは合っているはずなのに、</p>
        <ul className="m-3 list-disc">
          <li>夜泣きがある</li>
          <li>昼寝しても30分で起きてしまう、昼寝できない</li>
          <li>6時より前に早朝起きする</li>
        </ul>
        <p>
          など、乳幼児の睡眠についてお悩みがある場合は、ぜひ一度理恵さんに相談されてみてください。
        </p>
      </div>

      <h3 className="text-center pt-5 font-medium">実績</h3>
      <ul className="mt-3 px-3 list-disc">
        <li className="text-sm">
          日本睡眠学会第45回定期学術集会にてポスター発表
        </li>
        <li className="text-sm">
          八王子市親子つどいの広場ゆめきっず「赤ちゃんの睡眠・寝かしつけ講座」
        </li>
        <li className="text-sm">
          八王子市親子ふれあい広場ぽかぽかひろば
          「赤ちゃんの睡眠・寝かしつけ講座」
        </li>
        <li className="text-sm">
          八南助産師会 助産師様向け「乳幼児の睡眠講座」
        </li>
        <li className="text-sm">
          whip whipスワドル「GUSUMIN」の寝かしつけマニュアル監修
        </li>
      </ul>
      <div className="mb-20 mt-8 flex justify-center">
        <Link href="https://www.imaneru.com/" target="_blank">
          <div className="px-5 py-2 w-40 border border-gray-400	 rounded-full text-center">
            もっと見る
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

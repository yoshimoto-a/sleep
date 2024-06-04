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
      <div className="text-sm mt-3 flex justify-center">
        2歳半差の2児の母
        <br />
        国際認定資格 IPHI妊婦と乳幼児の睡眠コンサルタント
      </div>

      <div className="m-3">
        <p>
          国際認定資格
          IPHI妊婦と乳幼児の睡眠コンサルタントとして、寝かしつけや夜泣きに悩むママさんを助けたり、助産師向け講座を行ったり、オンラインや地域でさまざまな活動をされている理恵さん。
          <br />
          ご自身も娘さんの夜泣きに3年間も悩まされたという過去をお持ちです。
        </p>
        <p>
          夜寝られない辛さを経験されているからこそ、ママさんに寄り添って親子でぐっすり寝られるようにサポートしてくださいます。
        </p>
        <p>もし寝かしつけのタイミングは合っているはずなのに、</p>
        <ul className="m-3">
          <li>・夜泣きがある</li>
          <li>・昼寝が短い</li>
          <li>・早朝起きする</li>
        </ul>
        <p>
          など、乳幼児の睡眠についてお悩みがある場合は、ぜひ一度相談してみてください。
        </p>
      </div>

      <h3 className="text-center pt-5 font-medium">講座実績</h3>
      <ul className="mt-3">
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
      </ul>
      <div className="mb-20 mt-8 flex justify-center">
        <div className="px-5 py-2 w-40 border border-gray-400	 rounded-full text-center">
          <Link
            href="https://www.imaneru.com/"
            className="header-link"
            target="_blank"
          >
            もっと詳しく
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

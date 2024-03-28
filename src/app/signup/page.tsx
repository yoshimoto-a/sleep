import React from "react";
import { Header } from "../_components/header";
export default function Singup() {
  return (
    <div>
      <h2>サインアップ</h2>
      <div className="space-y-4 w-full max-w-[358px] bg-gray-300 bg-opacity-50">
        <form>
          <div>
            <label>メールアドレス</label>
          </div>
        </form>
      </div>
    </div>
  );
}

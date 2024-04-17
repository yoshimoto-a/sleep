"use client";

import { MenuItem } from "./menuItem";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full px-3 pb-1 pt-3 bg-custom-blue">
      <div className="flex justify-between items-center">
        <MenuItem
          icon="/_footerIcon/graph.png"
          text="睡眠ログ"
          link="/dashboard/graph"
        />
        <MenuItem
          icon="/_footerIcon/weight.png"
          text="体重"
          link="/dashboard/sleep/weight"
        />
        <MenuItem
          icon="/_footerIcon/home.png"
          text="ホーム"
          link="/dashboard/sleep"
        />
        <MenuItem
          icon="/_footerIcon/setting.png"
          text="設定"
          link="/dashboard/"
        />
        <MenuItem icon="/_footerIcon/menu.png" text="メニュー" link="./menu" />
      </div>
    </footer>
  );
};

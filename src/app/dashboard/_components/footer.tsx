"use client";

import { MenuItem } from "./menuItem";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full px-3 pb-1 pt-3 bg-custom-blue z-40">
      <div className="flex justify-between items-center">
        <MenuItem
          icon="/_footerIcon/graph.png"
          text="睡眠ログ"
          link="/dashboard/graph"
        />
        <MenuItem
          icon="/_footerIcon/weight.png"
          text="体重"
          link="/dashboard/weight"
        />
        <MenuItem
          icon="/_footerIcon/home.png"
          text="ホーム"
          link="/dashboard/sleep"
        />
        <MenuItem
          icon="/_footerIcon/setting.png"
          text="活動時間"
          link="/dashboard/wakeWindows"
        />
        <MenuItem icon="/_footerIcon/menu.png" text="メニュー" link="./menu" />
      </div>
    </footer>
  );
};

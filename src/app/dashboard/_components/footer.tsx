"use client";

import { MenuItem } from "./menuItem";

export const Footer = () => {
  return (
    <footer className="max-w-md w-full fixed bottom-0 px-3 pb-1 pt-3 bg-custom-blue">
      <div className="flex justify-between items-center">
        <MenuItem
          icon="/_menuIcon/growth.png"
          text="発達"
          link="/dashboard/growth"
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
        <MenuItem
          icon="/_footerIcon/menu.png"
          text="メニュー"
          link="/dashboard/menu"
        />
      </div>
    </footer>
  );
};

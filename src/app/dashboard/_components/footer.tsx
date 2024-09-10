"use client";
import {
  faBars,
  faChartSimple,
  faHouse,
  faPersonWalking,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { MenuItem } from "./menuItem";
export const Footer = () => {
  const footerItems = [
    { icon: faPersonWalking, text: "発達", link: "/dashboard/growth" },
    {
      icon: faChartSimple,
      text: "週間ログ",
      link: "/dashboard/weeklySleepChart",
    },
    { icon: faHouse, text: "ホーム", link: "/dashboard/sleep" },
    {
      icon: faClock,
      text: "活動時間",
      link: "/dashboard/wakeWindows",
    },
    { icon: faBars, text: "メニュー", link: "/dashboard/menu" },
  ];
  return (
    <footer className="max-w-md w-full fixed bottom-0 pt-3 pb-1 bg-custom-blue">
      <div className="flex justify-between items-center">
        {footerItems.map((item, index) => {
          return (
            <MenuItem
              key={index}
              icon={item.icon}
              text={item.text}
              link={item.link}
            />
          );
        })}
      </div>
    </footer>
  );
};

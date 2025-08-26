"use client";
import React, { useState, useRef, useEffect } from "react";
import { logout } from "@/actions/auth";
import TopMenuItem from "./topMenuItem";
import { RxHamburgerMenu } from "react-icons/rx";

import TopMenuDropdown from "./TopMenuDropdown";

type TopMenuItemBase = {
  name: string;
};

type TopMenuItemLink = TopMenuItemBase & {
  type: "link";
  link: string;
};

type TopMenuDropDown = TopMenuItemBase & {
  type: "dropdown";
  data: TopMenuItemLink[];
};

// change menu items here
type TopMenuItem = TopMenuItemLink | TopMenuDropDown;
const topMenuList: TopMenuItem[] = [
  {
    type: "link",
    name: "Главная",
    link: "/admin",
  },
  {
    type: "link",
    name: "Основные Настройки",
    link: "/admin/settings",
  },
  {
    type: "link",
    name: "Когда нужна терапия",
    link: "/admin/when-needed",
  },
  {
    name: "Картинки",
    type: "dropdown",
    data: [
      {
        type: "link",
        name: "Фоновые картинки",
        link: "/admin/image-upload/parallax-images",
      },
      {
        type: "link",
        name: "Аватары",
        link: "/admin/image-upload/avatar-images",
      },
      {
        type: "link",
        name: "Киноклуб",
        link: "/admin/image-upload/movieclub-images",
      },
    ],
  },
  {
    type: "link",
    name: "Пользователь",
    link: "/admin/user",
  },
];

export function TopMenu() {
  const [maxHeight, setMaxHeight] = useState<string>("0px");
  const [isMobile, setIsMobile] = useState<boolean>(false); // Track if the view is mobile
  const [isMounted, setIsMounted] = useState(false);

  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setIsMounted(true);

    // Check the window size on the client-side only
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener to track window resizing
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const clickHandler = () => {
    if (ulRef.current) {
      // If the menu is closed, set max-height to the full scrollHeight
      if (maxHeight === "0px") {
        setMaxHeight(`${ulRef.current.scrollHeight}px`);
      } else {
        // Collapse the menu
        setMaxHeight("0px");
      }
    }
  };

  return (
    <header className="bg-green8  px-8">
      <div className="flex flex-col md:flex-row justify-between max-w-screen-lg mx-auto">
        <h3 className="font-bitter md:text-lg font-bold tracking-widest my-4">
          Админка
        </h3>
        <RxHamburgerMenu
          onClick={clickHandler}
          className="absolute top-4 right-4 w-8 h-8 md:hidden"
        />
        <ul
          ref={ulRef}
          className={`overflow-hidden transition-[max-height] duration-500 ease-in-out md:flex flex-col md:flex-row justify-center md:justify-end items-center gap-2 tracking-wide max-h-0 md:max-h-full`}
          style={{ maxHeight: isMobile && isMounted ? maxHeight : undefined }} // Only apply maxHeight on mobile
        >
          {topMenuList.map((item) => {
            if (item.type === "link") {
              return (
                <TopMenuItem key={item.name} link={item.link}>
                  {item.name}
                </TopMenuItem>
              );
            } else if (item.type === "dropdown") {
              return (
                <TopMenuDropdown
                  key={item.name}
                  name={item.name}
                  data={item.data}
                />
              );
            }
          })}

          <li className="text-center pb-2 md:pb-0   hover:text-black transition-colors  hover:underline ">
            <div>
              <form action={logout}>
                <button
                  className={`text-red-800 hover:underline`}
                  type="submit"
                >
                  Выйти
                </button>
              </form>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
}

"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

import { RxHamburgerMenu } from "react-icons/rx";

export default function Header({ menuHeader }: { menuHeader: string }) {
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

  const menuItems = [
    { href: "#about", label: "Обо мне" },
    { href: "#when-needed", label: "Когда необходимо" },
    { href: "#results", label: "Результаты" },
    { href: "#contacts", label: "Контакты" },
  ];

  return (
    <header className="font-jost text-white bg-gradient-to-r from-darkRed1 to-darkRed2  px-8">
      <div className="flex flex-col md:flex-row justify-between max-w-screen-lg mx-auto">
        <h3 className=" md:text-lg  tracking-widest my-4">{menuHeader}</h3>
        <RxHamburgerMenu
          onClick={clickHandler}
          className="absolute top-4 right-4 w-8 h-8 md:hidden"
        />
        <ul
          ref={ulRef}
          className={`overflow-hidden transition-[max-height] duration-300 ease-in-out md:flex flex-col md:flex-row justify-center md:justify-end items-center gap-2 tracking-wide max-h-0 md:max-h-full hover:text-slate-400`}
          style={{ maxHeight: isMobile && isMounted ? maxHeight : undefined }} // Only apply maxHeight on mobile
        >
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="text-center pb-2 md:pb-0   hover:text-white transition-colors ease-in delay-200"
            >
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

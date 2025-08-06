"use client";

import { useEffect, useState } from "react";

export default function Parallax({
  imageLink,
  children,
}: {
  imageLink: string;
  children?: JSX.Element | JSX.Element[];
}) {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect if the user is on iOS
    function isIOS() {
      const userAgent = navigator.userAgent || navigator.vendor;

      // Check if the device is an iPhone or iPod
      const iPhoneOrIPod = /iPhone|iPod/.test(userAgent);

      // Check if the device is an iPad
      const iPad =
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) ||
        /iPad/.test(userAgent);

      // Return true if either condition is met
      return iPhoneOrIPod || iPad;
    }

    if (isIOS()) {
      // Add the 'ios' class to the body
      // document.body.classList.add("ios");
      setIsIOS(true);
    }

    // Optional: Remove the 'ios' class on component unmount (cleanup)
    return () => {
      // document.body.classList.remove("ios");
      setIsIOS(false);
    };
  }, []); // Empty dependency array ensures it runs only once on mount

  const isIosClass = isIOS ? "bg-scroll" : "";

  return (
    <section
      className={`min-h-[300px] bg-fixed bg-center bg-no-repeat bg-cover ${isIosClass}`}
      style={{ backgroundImage: `url(${imageLink})` }}
    >
      {children}
    </section>
  );
}

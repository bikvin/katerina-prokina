"use client";

import Link from "next/link";

export default function DarkRedButton({
  children,
  href,
  small = false,
}: {
  children: React.ReactNode;
  href: string;
  small?: boolean;
}) {
  const sizeClass = small
    ? "p-[5px] w-[150px] text-base"
    : "w-full p-[10px] md:p-[10px]";

  return (
    <div className="">
      <Link
        href={href}
        className={`bg-gradient-to-r from-darkRed1 to-darkRed2 hover:bg-gradient-to-l  border-0  text-white cursor-pointer text-center block  ${sizeClass} min-w-40`}
      >
        {children}
      </Link>
    </div>
  );
}

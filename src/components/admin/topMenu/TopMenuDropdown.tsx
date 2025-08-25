"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopMenuDropdown({
  name,
  data,
}: {
  name: string;
  data: { name: string; link: string }[];
}) {
  const pathname = usePathname();
  const isActive = data.some((item) => item.link === pathname);

  return (
    <DropdownMenu key={name}>
      <DropdownMenuTrigger
        className={`hover:underline ${isActive ? "underline" : ""}`}
      >
        {name}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {data &&
          data.map((dropDownItem) => {
            const isChildActive = pathname === dropDownItem.link;

            return (
              <DropdownMenuItem key={dropDownItem.name}>
                <Link
                  href={dropDownItem.link}
                  className={`hover:underline ${
                    isChildActive ? "underline" : ""
                  }`}
                >
                  {dropDownItem.name}
                </Link>
              </DropdownMenuItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

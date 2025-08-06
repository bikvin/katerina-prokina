"use server";
import React from "react";
// import { helpData } from "./HelpData";
// import AccordionItem from "./accordionItem";

import { db } from "@/db";
import HelpClient from "./HelpClient";

export default async function HelpServer() {
  let itemsData: { id: string; header: string; text: string }[];
  itemsData = [];

  try {
    itemsData = await db.help.findMany({
      orderBy: [
        { order: "asc" }, // Primary sort by 'order' column
        { createdAt: "desc" }, // Secondary sort by 'createdAt' column
      ],
    });
  } catch (err) {
    console.log(err);
  }

  return <HelpClient itemsData={itemsData} />;
}

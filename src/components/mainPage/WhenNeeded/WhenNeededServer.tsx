"use server";
import React from "react";

import { db } from "@/db";
import WhenNeededClient from "./WhenNeededClient";

export default async function WhenNeededServer({ header }: { header: string }) {
  let itemsData: { id: string; header: string; text: string }[];
  itemsData = [];

  try {
    itemsData = await db.whenNeeded.findMany({
      orderBy: [
        { order: "asc" }, // Primary sort by 'order' column
        { createdAt: "desc" }, // Secondary sort by 'createdAt' column
      ],
    });
  } catch (err) {
    console.log(err);
  }

  return <WhenNeededClient header={header} itemsData={itemsData} />;
}

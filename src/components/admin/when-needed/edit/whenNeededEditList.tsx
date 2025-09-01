// import classes from "./accordionItemsEdit.module.css";
import { db } from "@/db";
import WhenNeededItem from "./WhenNeededItem";

export default async function WhenNeededEditList() {
  const itemsData = await db.whenNeeded.findMany({
    orderBy: [
      { order: "asc" }, // Primary sort by 'order' column
      { createdAt: "desc" }, // Secondary sort by 'createdAt' column
    ],
  });

  return (
    <div className={`mt-10`}>
      {itemsData.map((item) => (
        <WhenNeededItem key={item.id} whenNeeded={item} />
      ))}
    </div>
  );
}

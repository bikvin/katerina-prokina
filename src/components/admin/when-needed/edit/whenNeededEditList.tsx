import SingleWhenNeededEditCard from "./singleWhenNeededEditCard";
// import classes from "./accordionItemsEdit.module.css";
import { db } from "@/db";

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
        <SingleWhenNeededEditCard
          key={item.id}
          id={item.id}
          header={item.header}
          text={item.text}
        />
      ))}
    </div>
  );
}

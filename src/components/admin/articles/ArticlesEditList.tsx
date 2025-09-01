// import classes from "./accordionItemsEdit.module.css";
import { db } from "@/db";
import ArticlesItem from "./ArticlesItem";

export default async function ArticlesEditList() {
  const itemsData = await db.article.findMany({
    orderBy: [
      { order: "asc" }, // Primary sort by 'order' column
      { createdAt: "desc" }, // Secondary sort by 'createdAt' column
    ],
  });

  return (
    <>
      {itemsData.length === 0 && (
        <div className="text-center text-xl mt-10 font-light tracking-widest">
          Статей пока нет
        </div>
      )}
      <div className={`mt-10`}>
        {itemsData.map((item) => (
          <ArticlesItem key={item.id} article={item} />
        ))}
      </div>
    </>
  );
}

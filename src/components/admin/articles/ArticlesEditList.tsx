// import classes from "./accordionItemsEdit.module.css";
import ArticlesItem from "./ArticlesItem";
import { Article } from "@prisma/client";

export default async function ArticlesEditList({
  items,
}: {
  items: Article[];
}) {
  return (
    <>
      {items.length === 0 && (
        <div className="text-center text-xl mt-10 mb-4 font-light tracking-widest">
          Тут ничего пока нет
        </div>
      )}
      <div className={``}>
        {items.map((item) => (
          <ArticlesItem key={item.id} article={item} />
        ))}
      </div>
    </>
  );
}

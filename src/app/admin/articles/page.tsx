// import WhenNeededEditList from "@/components/admin/when-needed/edit/whenNeededEditList";
import ArticlesEditList from "@/components/admin/articles/ArticlesEditList";
import { TopMenu } from "@/components/admin/topMenu/TopMenu";
import { db } from "@/db";
import { Article } from "@prisma/client";
import Link from "next/link";

export default async function ArticlesPage() {
  let articles: Article[];
  let movieReviews: Article[];

  try {
    const [articlesData, movieReviewsData] = await Promise.all([
      db.article.findMany({
        where: { type: "ARTICLE" },
        orderBy: [
          { order: "asc" }, // Primary sort by 'order' column
          { createdAt: "desc" }, // Secondary sort by 'createdAt' column
        ],
      }),
      db.article.findMany({
        where: { type: "MOVIE_REVIEW" },
        orderBy: [
          { order: "asc" }, // Primary sort by 'order' column
          { createdAt: "desc" }, // Secondary sort by 'createdAt' column
        ],
      }),
    ]);

    if (!articlesData || !movieReviewsData) {
      return <div className="text-red-800">Данные не найдены.</div>;
    }

    articles = articlesData;
    movieReviews = movieReviewsData;
  } catch (err) {
    console.log(err);
    return <div className="text-red-800">Ошибка при загрузке данных.</div>;
  }

  return (
    <>
      <TopMenu />
      <div className="max-w-screen-lg mx-auto ">
        <div className="w-[90%] mx-auto">
          <div className=" mt-10 flex justify-end">
            <Link
              className="link-button link-button-green"
              href="/admin/articles/new"
            >
              Новая статья или обзор
            </Link>
          </div>
          <h3 className="text-4xl font-bold mt-10 mb-6">Обычные статьи:</h3>
          <ArticlesEditList items={articles} />
          <h3 className="text-4xl font-bold mt-40 mb-6">Обзоры фильмов:</h3>
          <ArticlesEditList items={movieReviews} />
        </div>
      </div>
    </>
  );
}

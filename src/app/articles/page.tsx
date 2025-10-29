import Footer from "@/components/mainPage/Footer/Footer";
import Header from "@/components/mainPage/Header/Header";

import { db } from "@/db";
import { settingsFields } from "@/components/admin/settings/settingsFields";
import ArticleList from "@/components/articles/articlesPage/ArticleList/ArticleList";
import { SecondaryPageHero } from "@/components/common/SecondaryPageHero/SecondaryPageHero";
import { ArticleTypeEnum } from "@prisma/client";

export default async function Articles() {
  let settings;
  let articlesheroImagesArr;
  let articles;
  let movieReviews;
  const imageGroupName = "article-hero";

  try {
    const [
      settingsData,
      articlesheroImagesData,
      articleData,
      movieReviewsData,
    ] = await Promise.all([
      db.settings.findMany({
        where: {
          field: {
            in: settingsFields,
          },
        },
      }),

      db.imageGroupArray.findUnique({
        where: { imageGroupName },
      }),

      await db.article.findMany({
        where: { type: ArticleTypeEnum.ARTICLE },
        orderBy: [
          { order: "asc" }, // Primary sort by 'order' column
          { createdAt: "desc" }, // Secondary sort by 'createdAt' column
        ],
      }),
      await db.article.findMany({
        where: { type: ArticleTypeEnum.MOVIE_REVIEW },
        orderBy: [
          { order: "asc" }, // Primary sort by 'order' column
          { createdAt: "desc" }, // Secondary sort by 'createdAt' column
        ],
      }),
    ]);

    if (
      !settingsData ||
      !articlesheroImagesData ||
      !articleData ||
      !movieReviewsData
    ) {
      return <div className="text-red-800">Данные не найдены.</div>;
    }

    settings = Object.fromEntries(
      settingsFields.map((field) => [
        field,
        settingsData.find((el) => el.field === field)?.value || "",
      ])
    );

    articlesheroImagesArr = JSON.parse(articlesheroImagesData.fileNamesArr);

    articles = articleData;
    movieReviews = movieReviewsData;
  } catch (err) {
    console.log(err);
    return <div className="text-red-800">Ошибка при загрузке данных.</div>;
  }

  return (
    <>
      <Header menuHeader={settings.menuHeader} />
      <SecondaryPageHero
        header={settings.articlesPageHeader}
        imageFilename={articlesheroImagesArr[0].name}
        imageGroupName={imageGroupName}
      />
      <ArticleList
        articleData={articles}
        header={settings.articlesPageSubheaderArticles}
      />
      <ArticleList
        articleData={movieReviews}
        header={settings.articlesPageSubheaderMovieReviews}
      />
      <Footer footerText={settings.footerText} />
    </>
  );
}

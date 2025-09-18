import Footer from "@/components/mainPage/Footer/Footer";
import Header from "@/components/mainPage/Header/Header";

import { db } from "@/db";
import { settingsFields } from "@/components/admin/settings/settingsFields";
import { ArticleHero } from "@/components/articles/articlesPage/ArcticleHero/ArticleHero";
import ArticleList from "@/components/articles/articlesPage/ArticleList/ArticleList";

export default async function Articles() {
  let settings;
  let articlesheroImagesArr;
  let articles;

  try {
    const [settingsData, articlesheroImagesData, articleData] =
      await Promise.all([
        db.settings.findMany({
          where: {
            field: {
              in: settingsFields,
            },
          },
        }),

        db.imageGroupArray.findUnique({
          where: { imageGroupName: "article-hero" },
        }),

        await db.article.findMany({
          orderBy: [
            { order: "asc" }, // Primary sort by 'order' column
            { createdAt: "desc" }, // Secondary sort by 'createdAt' column
          ],
        }),
      ]);

    if (!settingsData || !articlesheroImagesData || !articleData) {
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
  } catch (err) {
    console.log(err);
    return <div className="text-red-800">Ошибка при загрузке данных.</div>;
  }

  return (
    <>
      <Header menuHeader={settings.menuHeader} />
      <ArticleHero
        header={settings.articlesPageHeader}
        imageFilename={articlesheroImagesArr[0].name}
      />
      <ArticleList articleData={articles} />
      <Footer footerText={settings.footerText} />
    </>
  );
}

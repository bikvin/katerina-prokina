import Footer from "@/components/mainPage/Footer/Footer";
import Header from "@/components/mainPage/Header/Header";

import { db } from "@/db";
import { settingsFields } from "@/components/admin/settings/settingsFields";
import { SingleArticleCover } from "@/components/articles/singleArticlePage/SingleArticleCover";
import { Article } from "@prisma/client";
import { SingleArticleText } from "@/components/articles/singleArticlePage/SingleArticleText";

export default async function SingleArticle({
  params,
}: {
  params: { id: string };
}) {
  let settings;

  let article;

  try {
    const [settingsData, articleData] = await Promise.all([
      db.settings.findMany({
        where: {
          field: {
            in: settingsFields,
          },
        },
      }),

      await db.article.findUnique({ where: { id: params.id } }),
    ]);

    if (!settingsData || !articleData) {
      return <div className="text-red-800">Статья не найдена.</div>;
    }

    settings = Object.fromEntries(
      settingsFields.map((field) => [
        field,
        settingsData.find((el) => el.field === field)?.value || "",
      ])
    );

    article = articleData as Article;
  } catch (err) {
    console.log(err);
    return <div className="text-red-800">Ошибка при загрузке данных.</div>;
  }

  return (
    <>
      <Header menuHeader={settings.menuHeader} />
      <SingleArticleCover imageName={JSON.parse(article.coverPhotoName).name} />
      <SingleArticleText article={article} />
      <Footer footerText={settings.footerText} />
    </>
  );
}

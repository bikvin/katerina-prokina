import Footer from "@/components/mainPage/Footer/Footer";
import Header from "@/components/mainPage/Header/Header";

import { db } from "@/db";
import { settingsFields } from "@/components/admin/settings/settingsFields";
import { SecondaryPageHero } from "@/components/common/SecondaryPageHero/SecondaryPageHero";
import { EditableSection } from "@prisma/client";
import { ForCLientsContent } from "@/components/mainPage/ForClients/ForClientsContent";

export default async function ForClients() {
  let settings;
  let forclientsImagesArr;

  const imageGroupName = "forclients-hero";
  let forclients: EditableSection;

  try {
    const [settingsData, forclientsImagesData, forclientsData] =
      await Promise.all([
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

        db.editableSection.findUnique({ where: { key: "forclients" } }),
      ]);

    if (!settingsData || !forclientsImagesData || !forclientsData) {
      return <div className="text-red-800">Данные не найдены.</div>;
    }

    settings = Object.fromEntries(
      settingsFields.map((field) => [
        field,
        settingsData.find((el) => el.field === field)?.value || "",
      ])
    );

    forclientsImagesArr = JSON.parse(forclientsImagesData.fileNamesArr);

    forclients = forclientsData;
  } catch (err) {
    console.log(err);
    return <div className="text-red-800">Ошибка при загрузке данных.</div>;
  }

  return (
    <>
      <Header menuHeader={settings.menuHeader} />
      <SecondaryPageHero
        header={"Клиентам"}
        imageFilename={forclientsImagesArr[0].name}
        imageGroupName={imageGroupName}
      />
      <ForCLientsContent
        header={forclients.header}
        htmlText={forclients.htmlText}
      />
      {/* <ArticleList articleData={articles} /> */}
      <Footer footerText={settings.footerText} />
    </>
  );
}

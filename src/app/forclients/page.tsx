import Footer from "@/components/mainPage/Footer/Footer";
import Header from "@/components/mainPage/Header/Header";

import { db } from "@/db";
import { settingsFields } from "@/components/admin/settings/settingsFields";
import { SecondaryPageHero } from "@/components/common/SecondaryPageHero/SecondaryPageHero";
import { EditableSection } from "@prisma/client";
import { ForCLientsContent } from "@/components/mainPage/ForClients/ForClientsContent";
import TelegramWhatsapp from "@/components/mainPage/Contacts/TelegramWhatsapp";

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
        header={settings.forclientsPageHeader}
        imageFilename={forclientsImagesArr[0].name}
        imageGroupName={imageGroupName}
      />
      <ForCLientsContent
        header={forclients.header}
        htmlText={forclients.htmlText}
      />
      {/* <ArticleList articleData={articles} /> */}
      <section className="pb-16 md:pb-20 md:pt-10 px-8 md:px-10  overflow-x-hidden max-w-screen-lg mx-auto flex flex-col">
        <TelegramWhatsapp telegram={settings.telegram} phone={settings.phone} />
      </section>
      <Footer footerText={settings.footerText} />
    </>
  );
}

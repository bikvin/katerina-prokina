import Contacts from "@/components/mainPage/Contacts/Contacts";
import Footer from "@/components/mainPage/Footer/Footer";
import Header from "@/components/mainPage/Header/Header";
import HeroSection from "@/components/mainPage/HeroSection/HeroSection";

import Video from "@/components/mainPage/Video/Video";
import { db } from "@/db";
import { settingsFields } from "@/components/admin/settings/settingsFields";
import Parallax from "@/components/mainPage/Parallax/Parallax";
import WhenNeededServer from "@/components/mainPage/WhenNeeded/WhenNeededServer";
import Results from "@/components/mainPage/Results/Results";
import Movieclub from "@/components/mainPage/Movieclub/Movieclub";
import ForClients from "@/components/mainPage/ForClients/ForClients";
import { EditableSection } from "@prisma/client";

export default async function Home() {
  let settings;
  let parallaxImagesArr;
  let avatarImagesArr;
  let movieclubImagesArr;
  let forclients: EditableSection;

  try {
    const [
      settingsData,
      parallaxImagesData,
      avatarImagesData,
      movieclubImagesData,
      forclientsData,
    ] = await Promise.all([
      db.settings.findMany({
        where: {
          field: {
            in: settingsFields,
          },
        },
      }),

      db.imageGroupArray.findUnique({
        where: { imageGroupName: "parallax" },
      }),

      db.imageGroupArray.findUnique({
        where: { imageGroupName: "avatar" },
      }),

      db.imageGroupArray.findUnique({
        where: { imageGroupName: "movieclub" },
      }),

      db.editableSection.findUnique({ where: { key: "forclients" } }),
    ]);

    if (
      !settingsData ||
      !parallaxImagesData ||
      !avatarImagesData ||
      !movieclubImagesData ||
      !forclientsData
    ) {
      return <div className="text-red-800">Данные не найдены.</div>;
    }

    settings = Object.fromEntries(
      settingsFields.map((field) => [
        field,
        settingsData.find((el) => el.field === field)?.value || "",
      ])
    );

    parallaxImagesArr = JSON.parse(parallaxImagesData.fileNamesArr);
    avatarImagesArr = JSON.parse(avatarImagesData.fileNamesArr);
    movieclubImagesArr = JSON.parse(movieclubImagesData.fileNamesArr);
    forclients = forclientsData;
  } catch (err) {
    console.log(err);
    return <div className="text-red-800">Ошибка при загрузке данных.</div>;
  }

  return (
    <>
      <Header menuHeader={settings.menuHeader} />
      <div className="border-b border-gray-200">
        {settings.test && settings.test}
      </div>
      <HeroSection
        header={settings.header1}
        subHeader={settings.subHeader1}
        imageFilename={avatarImagesArr[0].name}
      />

      <Parallax filename={parallaxImagesArr[0].name} />
      <Video
        header={settings.headerVideo}
        subHeader={settings.subHeaderVideo}
        rutubeLink={settings.rutubeLink}
        youtubeLink={settings.youtubeLink}
      />

      <Parallax filename={parallaxImagesArr[1].name} />

      <WhenNeededServer header={settings.headerWhenneeded} />

      <Parallax filename={parallaxImagesArr[2].name} />

      <Results header={settings.resultsHeader} />

      <Parallax filename={parallaxImagesArr[3].name} />
      <ForClients header={forclients.header} htmlText={forclients.htmlText} />
      <Parallax filename={parallaxImagesArr[4].name} />

      <Movieclub
        header={settings.movieclubHeader}
        text={settings.movieclubText}
        text2={settings.movieclubText2}
        subheader={settings.movieclubSubheader}
        imageFilename={movieclubImagesArr[0].name}
      />
      <Parallax filename={parallaxImagesArr[5].name} />

      <Contacts
        header={settings.contactsHeader}
        telegram={settings.telegram}
        phone={settings.phone}
        text={settings.contactsText}
      />

      <Footer footerText={settings.footerText} />
    </>
  );
}

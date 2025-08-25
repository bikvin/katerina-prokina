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

export default async function Home() {
  let settings;
  let parallaxImagesArr;
  let avatarImagesArr;

  try {
    const [settingsData, parallaxImagesData, avatarImagesData] =
      await Promise.all([
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
      ]);

    if (!settingsData || !parallaxImagesData || !avatarImagesData) {
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
        header={settings.header2}
        subHeader={settings.subHeader2}
        rutubeLink={settings.rutubeLink}
        youtubeLink={settings.youtubeLink}
      />

      <Parallax filename={parallaxImagesArr[1].name} />

      <WhenNeededServer />

      <Parallax filename={parallaxImagesArr[2].name} />

      <Results />
      <Parallax filename={parallaxImagesArr[3].name} />
      <Contacts telegram={settings.telegram} phone={settings.phone} />

      <Footer footerText={settings.footerText} />
    </>
  );
}

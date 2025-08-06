import Contacts from "@/components/mainPage/Contacts/Contacts";
import Footer from "@/components/mainPage/Footer/Footer";
import Header from "@/components/mainPage/Header/Header";
import HeroSection from "@/components/mainPage/HeroSection/HeroSection";

import Video from "@/components/mainPage/Video/Video";
import { db } from "@/db";
import { settingsFields } from "@/components/admin/settings/settingsFields";
import Parallax from "@/components/mainPage/Parallax/Parallax";
import WhenNeededServer from "@/components/mainPage/WhenNeeded/WhenNeededServer";

export default async function Home() {
  let settings;

  try {
    const [settingsData] = await Promise.all([
      db.settings.findMany({
        where: {
          field: {
            in: settingsFields,
          },
        },
      }),
    ]);

    if (!settingsData) {
      return <div className="text-red-800">Данные не найдены.</div>;
    }

    settings = Object.fromEntries(
      settingsFields.map((field) => [
        field,
        settingsData.find((el) => el.field === field)?.value || "",
      ])
    );
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
      <HeroSection header={settings.header1} subHeader={settings.subHeader1} />
      {/* <LongImageBar imageLink={"/img/bar/red6.jpg"} /> */}
      <Parallax imageLink="/img/bar/room1.jpg" />
      <Video
        header={settings.header2}
        subHeader={settings.subHeader2}
        rutubeLink={settings.rutubeLink}
        youtubeLink={settings.youtubeLink}
      />
      {/* <LongImageBar imageLink={"/img/bar/red5.jpg"} /> */}
      {/* <Parallax imageLink="/img/bar/room2.jpg" /> */}
      {/* <About aboutData={about} /> */}

      {/* <LongImageBar imageLink={"/img/bar/red7.jpg"} /> */}
      <Parallax imageLink="/img/bar/room3.jpg" />

      <WhenNeededServer />

      {/* <LongImageBar imageLink={"/img/bar/red8.jpg"} /> */}
      {/* <Prices sessionLength={settings.sessionLength} price={settings.price} /> */}

      {/* <LongImageBar imageLink={"/img/bar/red1.jpg"} /> */}
      <Parallax imageLink="/img/bar/room4.jpg" />
      <Contacts telegram={settings.telegram} phone={settings.phone} />

      {/* <LongImageBar imageLink={"/img/bar/red4.jpg"} /> */}

      {/* <Links /> */}
      <Footer footerText={settings.footerText} />
    </>
  );
}

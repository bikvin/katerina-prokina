import SettingsForm from "@/components/admin/settings/SettingsForm";
import Header from "@/components/admin/topMenu/topMenu";
import { db } from "@/db";
import {
  settingsFields,
  settingsType,
} from "@/components/admin/settings/settingsFields";

export default async function AdminPage() {
  const settings = Object.fromEntries(
    settingsFields.map((item) => [item, ""])
  ) as settingsType;

  try {
    const data = await db.settings.findMany();

    if (!data) {
      return <div className="text-red-800">Данные не найдены.</div>;
    }

    data.forEach((el) => {
      if (
        typeof el.field === "string" &&
        settingsFields.includes(el.field as keyof settingsType)
      ) {
        const key = el.field as keyof settingsType;
        settings[key] = el.value || "";
      }
    });
  } catch (err) {
    console.log(err);
    return <div className="text-red-800">Ошибка при загрузке данных.</div>;
  }

  return (
    <>
      <Header page="settings" />

      <div className="max-w-screen-lg mx-auto ">
        <div className="w-[90%] md:w-2/3 mx-auto">
          <h1 className="admin-form-header mt-10">Основные настройки</h1>
          <SettingsForm {...settings} />
        </div>
      </div>
    </>
  );
}

// this file is used to define the settings fields for the admin settings page
// you only need to edit the fields here, the rest of the code will use these definitions
// you need to put it 2 times. In settingsFieldsWithDividers and in settingsType
// all fields are required by zod

export type settingsType = {
  pageHeader: string;
  metaDescription: string;
  menuHeader: string;
  header1: string;
  subHeader1: string;
  header2: string;
  subHeader2: string;
  rutubeLink: string;
  youtubeLink: string;
  telegram: string;
  phone: string;
  footerText: string;
  notificationEmails: string;
  allowedTelegramAccounts: string;
};

export const settingsFieldsWithDividers = [
  { name: "pageHeader", label: "Заголовок страницы" },
  { name: "metaDescription", label: "Meta описание" },
  { divider: true },
  { name: "menuHeader", label: "Заголовок меню" },
  { divider: true },
  { name: "header1", label: "Заголовок 1" },
  { name: "subHeader1", label: "Подзаголовок 1" },
  { divider: true },
  { name: "header2", label: "Заголовок 2" },
  { name: "subHeader2", label: "Подзаголовок 2" },
  {
    name: "rutubeLink",
    label: "Ссылка видео с Rutube (например https://rutube.ru/play/embed/.../)",
  },
  {
    name: "youtubeLink",
    label:
      "Ссылка видео с Youtube (например https://youtu.be/1umP_iO_obw?si=...)",
  },

  { divider: true },
  { name: "telegram", label: "Telegram" },
  { name: "phone", label: "Телефон" },

  { divider: true },
  { name: "footerText", label: "Текст футера" },
  { divider: true },
  {
    name: "notificationEmails",
    label:
      "Адреса email для уведомления о заявках. Через зяпятую (one@mail.com, two@mail.com, three@mail.com) ",
  },
  {
    name: "allowedTelegramAccounts",
    label:
      "Аккаунты telegram, которые могут получать уведомления. Через зяпятую. После добавления сюда нужно с этого аккаунта зайти в бот katerina_prokina_bot и нажать start",
  },
];

export const settingsFields: (keyof settingsType)[] = settingsFieldsWithDividers
  .filter(
    (item): item is { name: keyof settingsType; label: string } => !!item.name
  )
  .map((item) => item.name as keyof settingsType);

// export const settingsFields: (keyof settingsType)[] = settingsFieldsWithDividers
//   .filter(
//     (item): item is { name: keyof settingsType; label: string } => !!item.name
//   )
//   .map((item) => item.name as keyof settingsType);

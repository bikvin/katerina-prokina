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
  { formHeader: "Настройки сайта" },
  { name: "pageHeader", label: "Заголовок страницы", validation: "required" },
  { name: "metaDescription", label: "Meta описание", validation: "required" },
  { divider: true },
  { formHeader: "Верхнее меню" },
  { name: "menuHeader", label: "Заголовок меню", validation: "required" },
  { divider: true },
  { formHeader: "Главный блок" },
  { name: "header1", label: "Заголовок 1", validation: "required" },
  { name: "subHeader1", label: "Подзаголовок 1", validation: "required" },
  { divider: true },
  { formHeader: "Видео" },
  { name: "headerVideo", label: "Заголовок видео", validation: "required" },
  {
    name: "subHeaderVideo",
    label: "Подзаголовок видео",
    validation: "required",
  },

  {
    name: "rutubeLink",
    label: "Ссылка видео с Rutube (например https://rutube.ru/play/embed/.../)",
    validation: "required",
  },
  {
    name: "youtubeLink",
    label:
      "Ссылка видео с Youtube (например https://youtu.be/1umP_iO_obw?si=...)",
    validation: "required",
  },
  { divider: true },
  { formHeader: "Блок когда необходимо" },
  {
    name: "headerWhenneeded",
    label: "Заголовок когда необходимо",
    validation: "required",
  },

  { divider: true },
  { formHeader: "Блок результаты" },
  {
    name: "resultsHeader",
    label: "Заголовок результаты",
    validation: "required",
  },
  { divider: true },
  { formHeader: "Киноклуб" },
  {
    name: "movieclubHeader",
    label: "Заголовок киноклуба",
    validation: "required",
  },
  {
    name: "movieclubText",
    label: "Описание киноклуба",
    validation: "required",
  },
  {
    name: "movieclubSubheader",
    label: "Подзаголовок киноклуба",
    validation: "required",
  },
  {
    name: "movieclubText2",
    label: "Описание киноклуба 2",
    validation: "required",
  },
  { divider: true },
  { formHeader: "Контакты" },
  {
    name: "contactsHeader",
    label: "Заголовок контактов",
    validation: "required",
  },
  {
    name: "contactsText",
    label: "Текст для контактов",
    validation: "required",
  },
  { name: "telegram", label: "Telegram", validation: "required" },
  { name: "phone", label: "Телефон", validation: "required" },

  { divider: true },
  { formHeader: "Футер" },
  { name: "footerText", label: "Текст футера", validation: "required" },
  { divider: true },
  { formHeader: "Настройки уведомлений" },
  {
    name: "notificationEmails",
    label:
      "Адреса email для уведомления о заявках. Через зяпятую (one@mail.com, two@mail.com, three@mail.com) ",
    validation: "optional",
  },
  {
    name: "allowedTelegramAccounts",
    label:
      "Аккаунты telegram, которые могут получать уведомления. Через зяпятую. После добавления сюда нужно с этого аккаунта зайти в бот katerina_prokina_bot и нажать start",
    validation: "optional",
  },
  { divider: true },
  { formHeader: "Статьи" },
  {
    name: "articlesPageHeader",
    label: "Заголовок страницы статей",
    validation: "required",
  },
];

export const settingsFields: (keyof settingsType)[] = settingsFieldsWithDividers
  .filter(
    (
      item
    ): item is {
      name: keyof settingsType;
      label: string;
      validation: string;
    } => !!item.name
  )
  .map((item) => item.name as keyof settingsType);

export const settingsFieldsWithValidation: {
  name: keyof settingsType;
  validation: string;
}[] = settingsFieldsWithDividers
  .filter(
    (
      item
    ): item is {
      name: keyof settingsType;
      label: string;
      validation: string;
    } => !!item.name
  )
  .map((item) => {
    return { name: item.name, validation: item.validation } as {
      name: keyof settingsType;
      validation: string;
    };
  });

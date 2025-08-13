import { db } from "@/db";

export const sendTelegramMessage = async (
  name: string,
  contacts: string,
  message: string
) => {
  const token = process.env.TELEGRAM_BOT_KEY!;
  // const chatId = process.env.TELEGRAM_CHAT_ID!;

  console.log("token", token);
  // console.log("chatId", chatId);

  const text = `<b>Пришла новая заявка:</b>\n\nИмя клиента: <b>${escapeHtml(
    name
  )}</b>\nКонтакты: <b>${escapeHtml(contacts)}</b>\nСообщение:\n${escapeHtml(
    message
  )}`;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  // console.log("url", url);

  const telegramChats = await db.telegramChat.findMany({});

  const allowedTelegramAcounts = await db.settings.findUnique({
    where: { field: "allowedTelegramAccounts" },
  });

  if (!allowedTelegramAcounts) return;

  const allowedTelegramAccountsArr = allowedTelegramAcounts.value
    .split(",")
    .map((telegramAcc) => telegramAcc.trim())
    .filter((telegramAcc) => telegramAcc.length > 0);

  const allowedTelegramChats = telegramChats.filter((chat) =>
    allowedTelegramAccountsArr.includes(chat.username)
  );

  // console.log("allowedTelegramChats", allowedTelegramChats);

  await Promise.all(
    allowedTelegramChats.map((chat) =>
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chat.chatId,
          text,
          parse_mode: "HTML",
        }),
      })
    )
  );
};

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

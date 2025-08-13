import { db } from "@/db";

export const cleanTelegramChats = async (allowedTelegramAccounts: string) => {
  console.log("aallowedTelegramAccounts", allowedTelegramAccounts);

  const allowedUsernames = allowedTelegramAccounts
    .split(",")
    .map((u) => u.trim())
    .filter((u) => u.length > 0); // string[]

  console.log("allowedUsernames", allowedUsernames);

  await db.telegramChat.deleteMany({
    where: {
      username: {
        notIn: allowedUsernames, // the updated list
      },
    },
  });
};

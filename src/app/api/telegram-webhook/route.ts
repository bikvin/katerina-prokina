import { db } from "@/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const update = await request.json();

    console.log("update", update);

    const chatId = update.message.chat.id;
    const username = update.message.from?.username;
    const text = update.message.text;

    console.log("Incoming Telegram:", { chatId, username, text });

    const allowedTelegramUsers = await db.settings.findUnique({
      where: { field: "allowedTelegramAccounts" },
    });

    if (!allowedTelegramUsers) {
      await sendNotAllowedToBot(chatId);
      return NextResponse.json(
        { message: "You are not allowed" },
        { status: 200 }
      );
    }

    const allowedTelegramAccountsArr = allowedTelegramUsers.value
      .split(",")
      .map((telegramAcc) => telegramAcc.trim())
      .filter((telegramAcc) => telegramAcc.length > 0);

    if (!allowedTelegramAccountsArr.includes(username)) {
      // Remove them from the table if they are there
      await db.telegramChat.deleteMany({
        where: { username },
      });
      await sendNotAllowedToBot(chatId);
      return NextResponse.json(
        { message: "You are not allowed" },
        { status: 200 }
      );
    }

    await db.telegramChat.upsert({
      where: { username: username },
      update: { chatId: String(chatId) },
      create: { username: username, chatId: String(chatId) },
    });

    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_KEY}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "✅ Notifications connected successfully.",
        }),
      }
    );

    return NextResponse.json(
      { message: "Connected to notifications" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 200 }
    );
  }
}

const sendNotAllowedToBot = async (chatId: string) => {
  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_KEY}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "You are not authorized to use this bot.",
      }),
    }
  );
};

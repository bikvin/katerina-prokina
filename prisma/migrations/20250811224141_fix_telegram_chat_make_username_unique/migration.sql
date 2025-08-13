/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `TelegramChat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TelegramChat_username_key" ON "TelegramChat"("username");

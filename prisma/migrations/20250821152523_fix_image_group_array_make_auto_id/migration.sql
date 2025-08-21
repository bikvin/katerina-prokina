/*
  Warnings:

  - The primary key for the `ImageGroupArray` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ImageGroupArray" DROP CONSTRAINT "ImageGroupArray_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ImageGroupArray_pkey" PRIMARY KEY ("id");

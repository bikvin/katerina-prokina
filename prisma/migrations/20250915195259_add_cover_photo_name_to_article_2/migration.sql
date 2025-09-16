/*
  Warnings:

  - You are about to drop the column `fileNamesArr` on the `Article` table. All the data in the column will be lost.
  - Added the required column `coverPhotoName` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "fileNamesArr",
ADD COLUMN     "coverPhotoName" TEXT NOT NULL;

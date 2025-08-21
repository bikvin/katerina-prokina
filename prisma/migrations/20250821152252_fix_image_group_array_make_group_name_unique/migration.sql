/*
  Warnings:

  - You are about to drop the column `groupName` on the `ImageGroupArray` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageGroupName]` on the table `ImageGroupArray` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageGroupName` to the `ImageGroupArray` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageGroupArray" DROP COLUMN "groupName",
ADD COLUMN     "imageGroupName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ImageGroupArray_imageGroupName_key" ON "ImageGroupArray"("imageGroupName");

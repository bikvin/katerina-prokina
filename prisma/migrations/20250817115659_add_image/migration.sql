-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL,
    "imageGroupName" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "orderInGroup" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_imageGroupName_key" ON "Image"("imageGroupName");

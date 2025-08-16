-- CreateTable
CREATE TABLE "ParallaxImage" (
    "id" INTEGER NOT NULL,
    "fileNamesArr" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParallaxImage_pkey" PRIMARY KEY ("id")
);

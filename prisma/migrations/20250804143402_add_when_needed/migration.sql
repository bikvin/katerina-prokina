-- CreateTable
CREATE TABLE "WhenNeeded" (
    "id" TEXT NOT NULL,
    "header" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhenNeeded_pkey" PRIMARY KEY ("id")
);

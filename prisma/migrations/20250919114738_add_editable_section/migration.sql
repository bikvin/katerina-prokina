-- CreateTable
CREATE TABLE "EditableSection" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "header" TEXT NOT NULL,
    "htmlText" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EditableSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EditableSection_key_key" ON "EditableSection"("key");

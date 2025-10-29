-- CreateEnum
CREATE TYPE "ArticleTypeEnum" AS ENUM ('ARTICLE', 'MOVIE_REVIEW');

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "type" "ArticleTypeEnum" NOT NULL DEFAULT 'ARTICLE';

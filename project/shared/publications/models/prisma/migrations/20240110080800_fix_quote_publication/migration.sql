/*
  Warnings:

  - You are about to drop the column `announcement` on the `quote_publications` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `quote_publications` table. All the data in the column will be lost.
  - Added the required column `author` to the `quote_publications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quote_publications" DROP COLUMN "announcement",
DROP COLUMN "name",
ADD COLUMN     "author" TEXT NOT NULL;

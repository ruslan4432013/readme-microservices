/*
  Warnings:

  - You are about to drop the column `link` on the `photo_publications` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `photo_publications` table. All the data in the column will be lost.
  - Added the required column `photo` to the `photo_publications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "photo_publications" DROP COLUMN "link",
DROP COLUMN "name",
ADD COLUMN     "photo" TEXT NOT NULL;

/*
  Warnings:

  - Added the required column `type` to the `publications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "publications" ADD COLUMN     "type" TEXT NOT NULL;

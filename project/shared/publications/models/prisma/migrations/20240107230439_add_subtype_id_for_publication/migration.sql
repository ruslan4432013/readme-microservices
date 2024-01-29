/*
  Warnings:

  - Added the required column `subtype_id` to the `publications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "publications" ADD COLUMN     "subtype_id" TEXT NOT NULL;

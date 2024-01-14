/*
  Warnings:

  - Changed the type of `status` on the `publications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `publications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PublicationStatus" AS ENUM ('Published', 'Draft');

-- CreateEnum
CREATE TYPE "PublicationType" AS ENUM ('Photo', 'Video', 'Text', 'Quote', 'Link');

-- AlterTable
ALTER TABLE "publications" DROP COLUMN "status",
ADD COLUMN     "status" "PublicationStatus" NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "PublicationType" NOT NULL;

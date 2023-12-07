/*
  Warnings:

  - You are about to drop the column `location` on the `Workshop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Material" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Workshop" DROP COLUMN "location";

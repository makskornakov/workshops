/*
  Warnings:

  - The `complexity` column on the `Material` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `timeConsumption` column on the `Material` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Material" DROP COLUMN "complexity",
ADD COLUMN     "complexity" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "timeConsumption",
ADD COLUMN     "timeConsumption" INTEGER NOT NULL DEFAULT 5;

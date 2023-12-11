/*
  Warnings:

  - Changed the type of `complexity` on the `Material` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `timeConsumption` on the `Material` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Material" DROP COLUMN "complexity",
ADD COLUMN     "complexity" INTEGER NOT NULL,
DROP COLUMN "timeConsumption",
ADD COLUMN     "timeConsumption" INTEGER NOT NULL;

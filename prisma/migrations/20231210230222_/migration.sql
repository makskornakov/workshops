/*
  Warnings:

  - Added the required column `timeConsumption` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Material" ADD COLUMN     "complexity" TEXT NOT NULL DEFAULT 'simple',
ADD COLUMN     "timeConsumption" TEXT NOT NULL;

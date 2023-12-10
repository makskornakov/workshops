/*
  Warnings:

  - Made the column `categoryName` on table `Material` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Material" ALTER COLUMN "categoryName" SET NOT NULL;

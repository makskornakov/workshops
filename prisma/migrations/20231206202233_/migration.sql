/*
  Warnings:

  - Added the required column `userId` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Material" ADD COLUMN     "userId" TEXT NOT NULL;
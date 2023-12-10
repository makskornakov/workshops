/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Material` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_categoryId_fkey";

-- AlterTable
ALTER TABLE "Material" DROP COLUMN "categoryId",
ADD COLUMN     "categoryName" TEXT;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

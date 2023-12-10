/*
  Warnings:

  - You are about to drop the column `categoryName` on the `Material` table. All the data in the column will be lost.
  - Added the required column `categorySlug` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_categoryName_fkey";

-- AlterTable
ALTER TABLE "Material" DROP COLUMN "categoryName",
ADD COLUMN     "categorySlug" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_categorySlug_fkey" FOREIGN KEY ("categorySlug") REFERENCES "Category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

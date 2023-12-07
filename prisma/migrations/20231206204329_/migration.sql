/*
  Warnings:

  - The `workshopId` column on the `Material` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_workshopId_fkey";

-- AlterTable
ALTER TABLE "Material" DROP COLUMN "workshopId",
ADD COLUMN     "workshopId" TEXT[];

-- CreateTable
CREATE TABLE "_MaterialToWorkshop" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MaterialToWorkshop_AB_unique" ON "_MaterialToWorkshop"("A", "B");

-- CreateIndex
CREATE INDEX "_MaterialToWorkshop_B_index" ON "_MaterialToWorkshop"("B");

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaterialToWorkshop" ADD CONSTRAINT "_MaterialToWorkshop_A_fkey" FOREIGN KEY ("A") REFERENCES "Material"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaterialToWorkshop" ADD CONSTRAINT "_MaterialToWorkshop_B_fkey" FOREIGN KEY ("B") REFERENCES "Workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

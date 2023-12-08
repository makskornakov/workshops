/*
  Warnings:

  - A unique constraint covering the columns `[mediaUrl]` on the table `Material` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Material_mediaUrl_key" ON "Material"("mediaUrl");

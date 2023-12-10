-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_categorySlug_fkey";

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_categorySlug_fkey" FOREIGN KEY ("categorySlug") REFERENCES "Category"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

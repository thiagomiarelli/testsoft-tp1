/*
  Warnings:

  - Added the required column `alternative_id` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "alternative_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_alternative_id_fkey" FOREIGN KEY ("alternative_id") REFERENCES "Alternative"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

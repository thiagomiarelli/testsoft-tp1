/*
  Warnings:

  - The primary key for the `userSkills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `userSkills` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "userSkills" DROP CONSTRAINT "userSkills_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "userSkills_pkey" PRIMARY KEY ("user_id", "skill_id");

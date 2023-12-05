/*
  Warnings:

  - You are about to drop the `userSkills` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `test_block` on table `Question` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "TestBlocks" AS ENUM ('CH', 'CN', 'MT', 'LC');

-- DropForeignKey
ALTER TABLE "userSkills" DROP CONSTRAINT "userSkills_skill_id_fkey";

-- DropForeignKey
ALTER TABLE "userSkills" DROP CONSTRAINT "userSkills_user_id_fkey";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "test_block" SET NOT NULL;

-- DropTable
DROP TABLE "userSkills";

-- CreateTable
CREATE TABLE "userAbilities" (
    "user_id" TEXT NOT NULL,
    "test_block" "TestBlocks" NOT NULL,
    "answered_questions_count" INTEGER NOT NULL DEFAULT 0,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 1.3,

    CONSTRAINT "userAbilities_pkey" PRIMARY KEY ("user_id","test_block")
);

-- AddForeignKey
ALTER TABLE "userAbilities" ADD CONSTRAINT "userAbilities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

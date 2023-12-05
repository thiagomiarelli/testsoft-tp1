/*
  Warnings:

  - You are about to drop the `Topic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_QuestionToTopic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `skill_id` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_QuestionToTopic" DROP CONSTRAINT "_QuestionToTopic_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionToTopic" DROP CONSTRAINT "_QuestionToTopic_B_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "irt_param_a" DOUBLE PRECISION,
ADD COLUMN     "irt_param_b" DOUBLE PRECISION,
ADD COLUMN     "irt_param_c" DOUBLE PRECISION,
ADD COLUMN     "skill_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Topic";

-- DropTable
DROP TABLE "_QuestionToTopic";

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "test_block" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "skill_code" INTEGER NOT NULL,
    "test_block" TEXT NOT NULL,
    "description" TEXT,
    "area" TEXT,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_QuestionToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionToTag_AB_unique" ON "_QuestionToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionToTag_B_index" ON "_QuestionToTag"("B");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToTag" ADD CONSTRAINT "_QuestionToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToTag" ADD CONSTRAINT "_QuestionToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

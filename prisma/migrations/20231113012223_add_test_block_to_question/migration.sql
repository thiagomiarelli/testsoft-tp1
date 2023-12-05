-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_skill_id_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "test_block" TEXT,
ALTER COLUMN "skill_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

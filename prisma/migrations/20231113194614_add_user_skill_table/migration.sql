-- CreateTable
CREATE TABLE "userSkills" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "skill_id" TEXT NOT NULL,
    "answered_questions_count" INTEGER NOT NULL DEFAULT 0,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 1.3,

    CONSTRAINT "userSkills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userSkills" ADD CONSTRAINT "userSkills_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userSkills" ADD CONSTRAINT "userSkills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

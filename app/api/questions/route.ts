import prisma from "../../../lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const subjectsString = req.nextUrl.searchParams.get("subjects");
  const subjects = subjectsString ? subjectsString.split(",") : []; // Split subjects into an array
  const questions = await prisma.question.findMany({
    where: { subject: { in: subjects } },
    include: {
      alternatives: true,
    },
  });

  return NextResponse.json(questions);
}

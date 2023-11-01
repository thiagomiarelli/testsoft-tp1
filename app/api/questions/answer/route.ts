import prisma from "../../../../lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { getAuthSession } from "@/lib/auth/googleAuth";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({
        error: "You must be logged in to answer a question",
        status: 403,
      })
    );
  }

  try {
    const { questionId, alternativeId } = await req.json();
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: { alternatives: true, topics: true },
    });

    const isCorrect =
      question?.alternatives.find(
        (alternative) => alternative.id === alternativeId
      )?.id === alternativeId;

    const answer = await prisma.answer.create({
      data: {
        question: { connect: { id: questionId } },
        alternative: { connect: { id: alternativeId } },
        user: { connect: { email: session.user?.email || "" } },
        isCorrect,
      },
    });

    return NextResponse.json({ answer, question });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "Something went wrong when answering the question",
        status: 500,
      })
    );
  }
}

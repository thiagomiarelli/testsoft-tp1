"use client";
import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { SubjectsContext } from "@/context/subjectsContext";

import { getQuestion } from "@/lib/questions/getQuestion";
import { answerQuestion } from "@/lib/questions/answerQuestion";
import Question from "@/types/question";
import Topic from "@/types/topic";

import QuestionStatement from "./components/statement";
import QuestionAlternative from "./components/alternative";

import selectStyleByCondition from "@/utils/selectStyleByCondition";

export default function Question() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const [selected, set_selected] = useState<string | null>(null);
  const [question, set_question] = useState<Question | null>();
  const [correctAnswer, set_correctAnswer] = useState<string | null>(null);
  const [topics, set_topics] = useState<string[]>([]);
  const { subjects, defineSubjects } = useContext(SubjectsContext);

  const findCorrectAnswer = (alternatives: any) => {
    for (let i = 0; i < alternatives.length; i++) {
      if (alternatives[i].correct) {
        return alternatives[i].id;
      }
    }
    return null;
  };

  const handleAnswerSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const response = answerQuestion(
      question?.id ? question?.id : "",
      selected ? selected : ""
    ).then((response) => {
      set_correctAnswer(findCorrectAnswer(response.question?.alternatives));
      set_topics(response.question?.topics.map((topic: Topic) => topic.name));
    });
  };

  const goToFeedbackPage = () => {
    let link = "/questions/feedbacks/?";
    link += "correct=" + (correctAnswer === selected);
    link += "&topics=" + encodeURIComponent(topics.join(","));
    router.push(link);
  };

  useEffect(() => {
    getQuestion(subjects).then((question) => {
      set_question(question);
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-primary h-[25rem] -mt-20 w-full"></div>
      <div className="bg-white h-full m-4 lg:m-12 lg:mx-20 -mt-72 lg:-mt-72 rounded-xl drop-shadow-md p-12 px-8 lg:px-20 w-11/12 lg:w-3/4 max-w-6xl">
        <h2 className="font-decorative text-base mb-4">
          {question?.subject} | {question?.university}
        </h2>
        <div className="flex flex-col gap-4">
          <QuestionStatement statement={question ? question.text : ""} />
          {question?.alternatives.map((alternative, index) => (
            <QuestionAlternative
              key={alternative.id}
              index={index}
              id={alternative.id}
              text={alternative.text}
              selected={selected !== null ? selected === alternative.id : false}
              correct={
                correctAnswer !== null ? correctAnswer === alternative.id : null
              }
              on_click={() => set_selected(alternative.id)}
            />
          ))}
        </div>
        <button
          className={selectStyleByCondition(
            selected === null
              ? "bg-gray-300"
              : "bg-primary hover:bg-primaryDark",
            "w-full p-2 py-3 mt-6 text-white font-semibold rounded-md transition-colors duration-200"
          )}
          onClick={
            correctAnswer === null ? handleAnswerSubmit : goToFeedbackPage
          }
        >
          {correctAnswer === null ? "Responder" : "Ver feedback"}
        </button>
      </div>
    </div>
  );
}

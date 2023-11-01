"use client";
import { useState, useEffect, use } from "react";

import selectStyleByCondition from "@/utils/selectStyleByCondition";
import { Player } from "@lottiefiles/react-lottie-player";
import sad from "@/public/sad.json";
import happy from "@/public/happy.json";

import Chips from "../components/chips/chips";
import { useSearchParams } from "next/navigation";

export default function FeedbackPage() {
  const params = useSearchParams();
  const topics = params.get("topics")?.split(",");
  const correct = params.get("correct") === "true";

  return (
    <div className="flex flex-col items-center h-full">
      <div
        className={selectStyleByCondition(
          correct ? "bg-green-600" : "bg-red-600",
          "h-[25rem] -mt-20 w-full"
        )}
      ></div>
      <div className="bg-white rounded-xl drop-shadow-md -mt-72 p-4 lg:p-10 w-11/12 lg:w-3/4 h-full my-16 max-w-6xl flex flex-col justify-between">
        <div>
          <Player
            src={correct ? happy : sad}
            background="transparent"
            speed={1}
            style={{ height: "250px", width: "250px" }}
            loop
            autoplay
          />
          <div className="text-center">
            <h1 className="text-2xl font-decorative mb-6 mt-2">
              {correct ? " Boa! Resposta correta." : "Ops! Resposta incorreta"}
            </h1>
            {correct
              ? "Você demonstrou domínio nos seguintes tópicos"
              : "Você precisa estudar mais nos seguintes tópicos"}
          </div>
          <div className="flex justify-center mt-4 gap-2 flex-wrap">
            {topics?.map((topic) => (
              <Chips text={topic} correct={correct} key={topic} />
            ))}
          </div>
        </div>
        <button
          className={selectStyleByCondition(
            correct ? "bg-green-600" : "bg-red-600",
            "w-full bg-primary p-2 py-3 mt-6 text-white font-semibold rounded-md"
          )}
          onClick={() => window.location.replace("/questions")}
        >
          Próxima questão
        </button>
      </div>
    </div>
  );
}

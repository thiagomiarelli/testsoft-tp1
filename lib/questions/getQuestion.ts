import { endpoint } from "@/utils/endpoint";

function removeCorrectField(jsonObj: any) {
  if (jsonObj && jsonObj.alternatives && Array.isArray(jsonObj.alternatives)) {
    jsonObj.alternatives.forEach((alternative: any) => {
      delete alternative.correct;
    });
  }
  return jsonObj;
}

export async function getQuestion(subjectList: string[]) {
  const queryString = `subjects=${subjectList.join(",")}`;
  const url = `${endpoint}/api/questions?${queryString}`;
  const data = await fetch(url);

  const randomInt = (max: number) => Math.floor(Math.random() * max);

  const questions = await data.json();
  const randomQuestion = questions[randomInt(questions.length)];
  return removeCorrectField(randomQuestion);
}

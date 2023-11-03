export default function validateQuestionAnswer(question_alternatives:any|any[], answer_index:number|null){
    const ids = question_alternatives.map((alternative:any) => alternative.id);
    const isAnswerIndexValid = ids.includes(answer_index);
    if(!isAnswerIndexValid){
        throw new Error("The answer index is not valid");
    }
}
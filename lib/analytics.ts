export function countCorrectQuestions(answers: string[]){
  return answers.filter((answer) => answer === 'correct').length;
}


export function percentOfCorrectOrIncorrectQuestions(answers: string[], criterion: string){
  if (criterion === 'correct') {
    const correctCount = answers.filter((answer) => answer === 'correct').length;
    const totalQuestions = answers.length;

    if (totalQuestions === 0) {
      return 0; // Evita divisão por zero
    }

    return (correctCount / totalQuestions) * 100;
  } else if (criterion === 'incorrect') {
    const incorrectCount = answers.filter((answer) => answer === 'incorrect').length;
    const totalQuestions = answers.length;

    if (totalQuestions === 0) {
      return 0; // Evita divisão por zero
    }

    return (incorrectCount / totalQuestions) * 100;
  } else {
    throw new Error('Critério inválido. Use "correct" ou "incorrect".');
  }
}

export function countIncorrectQuestions(questions: string[]){
  return questions.filter((questions) => questions === 'incorrect').length;
}

export function countQuestionsBySubject(questions: string[], criterion: string){
  return questions.filter((question) => question === criterion).length;
}


export function countQuestionsByStudentID(questions: { id: string; alternatives: { text: string; correct: boolean }[] }[], id: string){
  return questions.filter((question) => question.id === id).length;
}

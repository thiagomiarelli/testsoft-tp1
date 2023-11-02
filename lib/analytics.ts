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


export function findIDHighestScore(score:  {id: string; scores: number []} []): string {
  let maxScore = 0;
  let maxId = '';

  for (const question of score) {
    const totalScore = question.scores.reduce((a, b) => a + b, 0);
    if (totalScore > maxScore) {
      maxScore = totalScore;
      maxId = question.id;
    }
  }

  return maxId;
}

export function findHighestScore(score:  {id: string; scores: number []} []): number {
  let maxScore = 0;
  let maxId = '';

  for (const question of score) {
    const totalScore = question.scores.reduce((a, b) => a + b, 0);
    if (totalScore > maxScore) {
      maxScore = totalScore;
      maxId = question.id;
    }
  }

  return maxScore;
}
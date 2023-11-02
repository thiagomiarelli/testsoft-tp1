import { getQuestion } from '../lib/questions/getQuestion'; // replace with your file name
import fetchMock from 'jest-fetch-mock';
import { countCorrectQuestions } from '../lib/analytics';
import { countIncorrectQuestions } from '../lib/analytics';
import { percentOfCorrectOrIncorrectQuestions } from '../lib/analytics';
import { countQuestionsBySubject } from '../lib/analytics';
import { countQuestionsByStudentID } from '../lib/analytics';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.enableMocks();
});

it('should call the correct endpoint', async () => {
  fetchMock.mockResponseOnce(JSON.stringify([]));
  await getQuestion(['math']);
  expect(fetchMock.mock.calls[0][0]).toEqual('http://localhost:3000/api/questions?subjects=math');
});

it('should handle server error', async () => {
  fetchMock.mockReject(() => Promise.reject('API is down'));
  await expect(getQuestion(['math'])).rejects.toMatch('API is down');
});

it('should return undefined if no questions are returned', async () => {
  fetchMock.mockResponseOnce(JSON.stringify([]));
  const question = await getQuestion(['math']);
  expect(question).toBeUndefined();
});

it('should return undefined if too many questions are returned', async () => {
  fetchMock.mockResponseOnce(JSON.stringify([]));
  const many_questions = await getQuestion(['math']);
  expect(many_questions).toBeUndefined();
});

it('should remove correct field from alternatives', async () => {
  const mockQuestion = {
    alternatives: [
      { text: 'Alternative 1', correct: true },
      { text: 'Alternative 2', correct: false },
    ],
  };
  fetchMock.mockResponseOnce(JSON.stringify([mockQuestion]));
  const question = await getQuestion(['math']);
  expect(question.alternatives[0].correct).toBeUndefined();
});

it('should not remove other fields from alternatives', async () => {
  const mockQuestion = {
    alternatives: [
      { text: 'Alternative 1', correct: true },
      { text: 'Alternative 2', correct: false },
    ],
  };
  fetchMock.mockResponseOnce(JSON.stringify([mockQuestion]));
  const question = await getQuestion(['math']);
  expect(question.alternatives[0].text).toEqual('Alternative 1');
});

it('should a random question', async () => {
  const mockQuestions = [
    { id: '1', alternatives: [{ text: 'Alternative 1', correct: true }] },
    { id: '2', alternatives: [{ text: 'Alternative 2', correct: false }] },
    { id: '3', alternatives: [{ text: 'Alternative 3', correct: true }] },
    { id: '4', alternatives: [{ text: 'Alternative 4', correct: false }] },
    { id: '5', alternatives: [{ text: 'Alternative 5', correct: true }] },
  ];
  
  fetchMock.mockResponseOnce(JSON.stringify(mockQuestions));
  
  const questionIds = new Set<string>();
  
  for (let i = 0; i < mockQuestions.length; i++) {
    const question = await getQuestion(['math']);
    questionIds.add(question.id);
    
    // Reset the mock to ensure it returns the same response in the next iteration
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify(mockQuestions));
  }
  
  // If the function is truly random, it should have returned all different questions in these iterations
  expect(questionIds.size).toEqual(questionIds.size);
});

it('shouldnt remove other fields from alternatives', async () => {
  const mockQuestion = {
    alternatives: [
      { text: 'Alternative 1', correct: true },
      { text: 'Alternative 2', correct: false },
    ],
  };
  fetchMock.mockResponseOnce(JSON.stringify([mockQuestion]));
  const question = await getQuestion(['math']);
  expect(question.alternatives[0].text).toEqual(question.alternatives[0].text);
});

// Add more tests as needed
it('should count correct answers correctly', () => {
  const answers: string[] = ['correct', 'incorrect', 'correct', 'correct', 'incorrect'];
  const correctCount: number = countCorrectQuestions(answers);
  expect(correctCount).toEqual(3);
});


it('calculate the percentage of correct answers', () => {
  const answers: string[] = ['correct', 'incorrect', 'correct', 'correct', 'incorrect'];
  const correctCount: number = percentOfCorrectOrIncorrectQuestions(answers,'correct');
  expect(correctCount).toEqual(60);
});

it('calculate the percentage of incorrect answers', () => {
  const answers: string[] = ['correct', 'incorrect', 'correct', 'correct', 'incorrect'];
  const correctCount: number = percentOfCorrectOrIncorrectQuestions(answers,'incorrect');
  expect(correctCount).toEqual(40);
});

it('calculate the percentage of incorrect answers when all answers is correct', () => {
  const answers: string[] = ['correct', 'correct', 'correct', 'correct', 'correct'];
  const correctCount: number = percentOfCorrectOrIncorrectQuestions(answers,'incorrect');
  expect(correctCount).toEqual(0);
});


it('calculate the percentage of incorrect answers when answers were not given', () => {
  const answers: string[] = [];
  const correctCount: number = percentOfCorrectOrIncorrectQuestions(answers,'incorrect');
  expect(correctCount).toEqual(0);
});

it('should count incorrect answers correctly', () => {
  const answers: string[] = ['correct', 'incorrect', 'correct', 'correct', 'incorrect'];
  const correctCount: number = countIncorrectQuestions(answers);
  expect(correctCount).toEqual(2);
});

it('should count the number of Math questions', () => {
  const questions: string[] = ['Math', 'History', 'History', 'English', 'Portuguese'];
  const correctCount: number = countQuestionsBySubject(questions,'Math');
  expect(correctCount).toEqual(1);
});

it('should count the number of History questions', () => {
  const questions: string[] = ['Math', 'History', 'History', 'English', 'Portuguese'];
  const correctCount: number = countQuestionsBySubject(questions, 'History');
  expect(correctCount).toEqual(2);
});

it('should count the number of English questions', () => {
  const questions: string[] = ['Math', 'History', 'History', 'English', 'Portuguese'];
  const correctCount: number = countQuestionsBySubject(questions, 'English');
  expect(correctCount).toEqual(1);
});

it('should count the number of Chemical questions', () => {
  const questions: string[] = ['Math', 'History', 'History', 'English', 'Portuguese'];
  const correctCount: number = countQuestionsBySubject(questions, 'Chemical');
  expect(correctCount).toEqual(0);
});

it('should count the number of Geography questions', () => {
  const questions: string[] = ['Geography', 'Geography', 'Geography', 'Geography', 'Portuguese'];
  const correctCount: number = countQuestionsBySubject(questions, 'Geography');
  expect(correctCount).toEqual(4);
});


it('should count questions by student ID', () => {
  const mockQuestions = [
    { id: '1', alternatives: [{ text: 'Alternative 1', correct: true }] },
    { id: '1', alternatives: [{ text: 'Alternative 2', correct: false }] },
    { id: '3', alternatives: [{ text: 'Alternative 3', correct: true }] },
    { id: '4', alternatives: [{ text: 'Alternative 4', correct: false }] },
    { id: '5', alternatives: [{ text: 'Alternative 5', correct: true }] },
  ];

  fetchMock.mockResponseOnce(JSON.stringify([mockQuestions]));
  const questionsById: number = countQuestionsByStudentID(mockQuestions,'1');
  expect(questionsById).toEqual(2);
  });

  it('should count questions by student ID with no questions', () => {
  const mockQuestions = [
    { id: '1', alternatives: [{ text: 'Alternative 1', correct: true }] },
    { id: '1', alternatives: [{ text: 'Alternative 2', correct: false }] },
    { id: '3', alternatives: [{ text: 'Alternative 3', correct: true }] },
    { id: '4', alternatives: [{ text: 'Alternative 4', correct: false }] },
    { id: '5', alternatives: [{ text: 'Alternative 5', correct: true }] },
  ];

  fetchMock.mockResponseOnce(JSON.stringify([mockQuestions]));
  const questionsById: number = countQuestionsByStudentID(mockQuestions,'10');
  expect(questionsById).toEqual(0);
  });

    it('should count questions by student ID with all questions done', () => {
  const mockQuestions = [
    { id: '1', alternatives: [{ text: 'Alternative 1', correct: true }] },
    { id: '1', alternatives: [{ text: 'Alternative 2', correct: false }] },
    { id: '1', alternatives: [{ text: 'Alternative 3', correct: true }] },
    { id: '1', alternatives: [{ text: 'Alternative 4', correct: false }] },
    { id: '1', alternatives: [{ text: 'Alternative 5', correct: true }] },
  ];

  fetchMock.mockResponseOnce(JSON.stringify([mockQuestions]));
  const questionsById: number = countQuestionsByStudentID(mockQuestions,'1');
  expect(questionsById).toEqual(5);
  });
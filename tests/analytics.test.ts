import fetchMock from 'jest-fetch-mock';

import { countCorrectQuestions } from '../lib/analytics';
import { countIncorrectQuestions } from '../lib/analytics';
import { percentOfCorrectOrIncorrectQuestions } from '../lib/analytics';
import { countQuestionsBySubject } from '../lib/analytics';
import { countQuestionsByStudentID } from '../lib/analytics';
import { findIDHighestScore } from '../lib/analytics';
import { findHighestScore } from '../lib/analytics';
import { calculateAverageScoreById } from '../lib/analytics';
import { calculateStandardDeviationById } from '../lib/analytics';
import { countAnswersByQuestion } from '../lib/analytics';


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
  
  
    it('find the ID with Highest Score', () => {
    const mockQuestions = [
      { id: '1', scores: [100,80,95] },
      { id: '2', scores: [70,40,80] },
      { id: '3', scores: [50,50,50] },
      { id: '4', scores: [40,10,30] },
      { id: '5', scores: [10,20,30] },
    ];
  
    fetchMock.mockResponseOnce(JSON.stringify([mockQuestions]));
    const HighestScoreID: string = findIDHighestScore(mockQuestions);
    expect(HighestScoreID).toEqual('1');
    });
  
  
      it('find the ID with Highest Score with all scores equal to 0', () => {
    const mockQuestions = [
      { id: '1', scores: [0] },
      { id: '2', scores: [0] },
      { id: '3', scores: [0] },
      { id: '4', scores: [0] },
      { id: '5', scores: [0] },
    ];
  
    fetchMock.mockResponseOnce(JSON.stringify([mockQuestions]));
    const HighestScoreID: string = findIDHighestScore(mockQuestions);
    expect(HighestScoreID).toEqual('');
    });
  
  
    it('find the Highest Score', () => {
    const mockQuestions = [
      { id: '1', scores: [100,80,95] },
      { id: '2', scores: [70,40,80] },
      { id: '3', scores: [50,50,50] },
      { id: '4', scores: [40,10,30] },
      { id: '5', scores: [10,20,30] },
    ];
  
    fetchMock.mockResponseOnce(JSON.stringify([mockQuestions]));
    const HighestScore: number = findHighestScore(mockQuestions);
    expect(HighestScore).toEqual(275);
    });
  
  
  
    it('find the Highest Score with all scores equal to 0', () => {
    const mockQuestions = [
      { id: '1', scores: [0,0] },
      { id: '2', scores: [0] },
      { id: '3', scores: [0,0,0] },
      { id: '4', scores: [0] },
      { id: '5', scores: [0,0,0,0,0] },
    ];
  
    fetchMock.mockResponseOnce(JSON.stringify([mockQuestions]));
    const HighestScore: number = findHighestScore(mockQuestions);
    expect(HighestScore).toEqual(0);
    });
  
  
    it('calculate the average score by id', () => {
    const mockQuestions = [
      { id: '1', scores: [10,5,15] },
    ];
  
    fetchMock.mockResponseOnce(JSON.stringify([mockQuestions]));
    const averageScore: number = calculateAverageScoreById(mockQuestions,'1');
    expect(averageScore).toEqual(10);
    });
  
  
    it('calculate the average score by id with score 0 ', () => {
    const mockQuestions = [
      { id: '1', scores: [0] },
    ];
  
    fetchMock.mockResponseOnce(JSON.stringify([mockQuestions]));
    const averageScore: number = calculateAverageScoreById(mockQuestions,'1');
    expect(averageScore).toEqual(0);
    });
  
  
    it('calculate the standard deviation by id with equal scores', () => {
    const mockQuestions = [
      { id: '1', scores: [10, 10, 10] },
    ];
  
    fetchMock.mockResponseOnce(JSON.stringify([mockQuestions]));
    const standardDeviation = calculateStandardDeviationById(mockQuestions,'1');
    expect(standardDeviation).toEqual(0);
  });
  
  
    it('calculate the standard deviation by id with different scores', () => {
    const mockQuestions = [
      { id: '1', scores: [10, 20, 30] },
    ];
  
    fetchMock.mockResponseOnce(JSON.stringify([mockQuestions]));
    const standardDeviation = calculateStandardDeviationById(mockQuestions,'1');
    expect(standardDeviation).toEqual(8.16496580927726);
  });
  
  
    it('calculate the standard deviation by id with scores equal to 0', () => {
    const mockQuestions = [
      { id: '1', scores: [0,0,0] },
    ];
  
    fetchMock.mockResponseOnce(JSON.stringify([mockQuestions]));
    const standardDeviation = calculateStandardDeviationById(mockQuestions,'1');
    expect(standardDeviation).toEqual(0);
  });
  
  
    it('should count the answers by question', () => {
    const mockQuestions = [
      { question_id: '1', answers: ['A','A','B','D']  },
    ];
  
    fetchMock.mockResponseOnce(JSON.stringify([mockQuestions]));
    const totalQuestions: number = countAnswersByQuestion(mockQuestions,'1');
    expect(totalQuestions).toEqual(4);
    });
  
  
  
    it('should count the answers by question in a question with 0 answers', () => {
    const mockQuestions = [
      { question_id: '1', answers: []},
    ];
  
    fetchMock.mockResponseOnce(JSON.stringify([mockQuestions]));
    const totalQuestions: number = countAnswersByQuestion(mockQuestions,'1');
    expect(totalQuestions).toEqual(0);
    });
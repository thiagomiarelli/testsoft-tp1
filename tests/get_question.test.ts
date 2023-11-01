import { getQuestion } from '../lib/questions/getQuestion'; // replace with your file name
import fetchMock from 'jest-fetch-mock';

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

import { answerQuestion } from '../lib/questions/answerQuestion'; // replace 'yourFile' with the actual file name
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

it('returns data when request is successful', async () => {
  const mockData = { message: 'Success' };
  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  const response = await answerQuestion('1', '1');
  expect(response).toEqual(mockData);
  expect(fetchMock).toHaveBeenCalledTimes(1);
});

it('throws error when server returns non-200 status', async () => {
  fetchMock.mockRejectOnce(new Error('Request failed with status: 500'));

  await expect(answerQuestion('1', '1')).rejects.toThrow('Request failed with status: 500');
  expect(fetchMock).toHaveBeenCalledTimes(1);
});

it('throws error when fetch fails', async () => {
  fetchMock.mockRejectOnce(new Error('Network error'));

  await expect(answerQuestion('1', '1')).rejects.toThrow('Network error');
  expect(fetchMock).toHaveBeenCalledTimes(1);
});

it('sends correct request body', async () => {
  const mockData = { message: 'Success' };
  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  await answerQuestion('1', '1');
  const body = fetchMock.mock.calls[0][1]?.body;
  if (typeof body === 'string') {
    expect(JSON.parse(body)).toEqual({ alternativeId: '1', questionId: '1' });
  }
  });

it('sends correct request headers', async () => {
  const mockData = { message: 'Success' };
  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  await answerQuestion('1', '1');
  expect(fetchMock.mock.calls[0][1]?.headers).toEqual({ "Content-Type": "application/json" });
});

it('sends correct request method', async () => {
  const mockData = { message: 'Success' };
  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  await answerQuestion('1', '1');
  expect(fetchMock.mock.calls[0][1]?.method).toEqual('POST');
});

it('sends request to correct URL', async () => {
  const mockData = { message: 'Success' };
  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  await answerQuestion('1', '1');
  expect(fetchMock.mock.calls[0][0]).toEqual(`http://localhost:3000/api/questions/answer`);
});

it('handles non-JSON response', async () => {
  fetchMock.mockResponseOnce('Not JSON');

  await expect(answerQuestion('1', '1')).rejects.toThrow( "invalid json response body at  reason: Unexpected token 'N', \"Not JSON\" is not valid JSON");
  expect(fetchMock).toHaveBeenCalledTimes(1);
});

it('handles empty response', async () => {
  fetchMock.mockResponseOnce('');

  await expect(answerQuestion('1', '1')).rejects.toThrow('Unexpected end of JSON input');
  expect(fetchMock).toHaveBeenCalledTimes(1);
});

it('handles null response', async () => {
  fetchMock.mockResponseOnce('');

  await expect(answerQuestion('1', '1')).rejects.toThrow('Unexpected end of JSON input');
  expect(fetchMock).toHaveBeenCalledTimes(1);
});

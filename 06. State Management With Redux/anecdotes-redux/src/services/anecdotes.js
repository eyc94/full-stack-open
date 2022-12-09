import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const generateId = () => Number((100000 * Math.random()).toFixed(0));
  const object = { content, id: generateId(), votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const vote = async (id) => {
  const anecdoteResponse = await axios.get(`${baseUrl}/${id}`);
  const anecdote = anecdoteResponse.data;
  const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const response = await axios.put(`${baseUrl}/${id}`, votedAnecdote);
  return response.data;
}

export default { getAll, createNew, vote };

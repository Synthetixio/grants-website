import axios from 'axios';

const requester = axios.create({
  baseURL: 'https://api-v2.dhedge.org',
  timeout: 300000,
});

requester.interceptors.response.use(
  (response) => response,
  (error) => {
    throw new Error(error);
  }
);

export default requester;

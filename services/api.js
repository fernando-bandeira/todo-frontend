import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fbt-drf-next.herokuapp.com/api',
});

export default api;
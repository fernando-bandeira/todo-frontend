import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fbt-django-next.herokuapp.com/api',
});

export default api;
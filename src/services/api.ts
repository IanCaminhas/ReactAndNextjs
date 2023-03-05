import axios from 'axios';
//axios.create recebe um objeto com configuração básica
export const api = axios.create({
  baseURL: 'https://api.github.com',
});

import axios from "axios";
import {ACCESS_TOKEN, REFRESH_TOKEN, GOOGLE_ACCESS_TOKEN} from '../config/token'

const API_URL = import.meta.env.VITE_API_URL;

// Criação da instância do Axios
const api = axios.create({
  baseURL: API_URL, // Substitua pela URL da sua API
});

// Adiciona o interceptor para incluir o token nos headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN); // Recupera o token do localStorage (ou outro local de armazenamento)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Adiciona o token no header Authorization
    }

    const googleAccessToken = localStorage.getItem(GOOGLE_ACCESS_TOKEN);
    // if (googleAccessToken) {
    //   config.headers["X-Google-Access-Token"] = googleAccessToken;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error); // Lida com erros de configuração
  }
);

export default api

import axios from "axios";
import { logout } from "./users";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://azure/app/31231231/api",
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(error.response.status === 401) {
    logout();
    window.location="/";
  }
  return Promise.reject(error);
});

const token = localStorage.getItem('jwt');
if (token)
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;


export const setClientToken = (token) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default instance;
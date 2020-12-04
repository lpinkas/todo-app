import axios from "axios";

console.log(process.env, process.env.REACT_APP_NOT_SECRET_CODE);
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://azure/app/31231231/api",
});

const token = localStorage.getItem('jwt');
if (token)
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;


export const setClientToken = (token) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default instance;
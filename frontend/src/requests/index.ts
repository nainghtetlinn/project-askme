import axios from "axios";

export const userInstance = axios.create({
  baseURL: "https://askme-backend.onrender.com/api/users",
});
export const questionInstance = axios.create({
  baseURL: "https://askme-backend.onrender.com/api/questions",
});

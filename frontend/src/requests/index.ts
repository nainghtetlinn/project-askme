import axios from "axios";

export const userInstance = axios.create({ baseURL: "/api/users" });
export const questionInstance = axios.create({ baseURL: "/api/questions" });

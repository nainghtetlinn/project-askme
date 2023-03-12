import axios, { AxiosError } from "axios";

const user = axios.create({ baseURL: "http://localhost:5000/api/users" });

const loginUser = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return user
    .post("/login", { username, password })
    .then((response) => {
      return response.data;
    })
    .catch((err: AxiosError | any) => {
      throw new Error(err.response?.data.message);
    });
};

const registerUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await user.post("/register", { username, password });
  return response.data;
};

export { loginUser, registerUser };

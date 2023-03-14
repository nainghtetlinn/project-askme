import axios from "axios";
import { useState, useContext, createContext } from "react";

const user = axios.create({ baseURL: "http://localhost:5000/api/users" });

const UserContext = createContext<any>({
  username: "",
  token: "",
  login: (username: string, password: string) => {},
  signup: (username: string, password: string) => {},
  loginwithtoken: (token: string) => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [username, setUsername] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const login = async (username: string, password: string) => {
    const { data } = await user.post("/login", { username, password });
    setUsername(data.username);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    return data;
  };
  const signup = async (username: string, password: string) => {
    const { data } = await user.post("/register", { username, password });
    setUsername(data.username);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    return data;
  };
  const loginwithtoken = async (token: string) => {
    const { data } = await user.get(`/token/${token}`);
    setUsername(data.username);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    return data;
  };

  return (
    <UserContext.Provider
      value={{ username, token, login, signup, loginwithtoken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

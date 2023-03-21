import axios from "axios";
import { useState, useContext, createContext } from "react";

const user = axios.create({ baseURL: "http://localhost:5000/api/users" });

const UserContext = createContext<any>({
  username: "",
  token: "",
  isLogin: false,
  login: (username: string, password: string) => {},
  signup: (username: string, password: string) => {},
  loginwithtoken: (token: string) => {},
  logout: () => {},
  findUser: (username: string) => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [username, setUsername] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const successfn = (data: any) => {
    setUsername(data.username);
    setToken(data.token);
    setIsLogin(true);
    localStorage.setItem("token", data.token);
  };

  const login = async (username: string, password: string) => {
    const { data } = await user.post("/login", { username, password });
    successfn(data);
    return data;
  };
  const signup = async (username: string, password: string) => {
    const { data } = await user.post("/register", { username, password });
    successfn(data);
    return data;
  };
  const loginwithtoken = async (token: string) => {
    const { data } = await user.get(`/token/${token}`);
    successfn(data);
    return data;
  };
  const logout = () => {
    setUsername("");
    setToken("");
    setIsLogin(false);
    localStorage.removeItem("token");
  };
  const findUser = async (username: string) => {
    const { data } = await user.get(`/find?user=${username}`);
    return data;
  };

  return (
    <UserContext.Provider
      value={{
        username,
        token,
        isLogin,
        login,
        signup,
        loginwithtoken,
        logout,
        findUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

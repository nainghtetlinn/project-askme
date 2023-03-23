import { useState, useContext, createContext } from "react";

import { userInstance } from "../requests";

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
    const { data } = await userInstance.post("/login", { username, password });
    successfn(data);
    return data;
  };
  const signup = async (username: string, password: string) => {
    const { data } = await userInstance.post("/register", {
      username,
      password,
    });
    successfn(data);
    return data;
  };
  const loginwithtoken = async (token: string) => {
    const { data } = await userInstance.get("/token", {
      headers: { Authorization: `Bearer ${token}` },
    });
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
    const { data } = await userInstance.get(`/find/${username}`);
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

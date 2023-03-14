import { Box } from "@mui/material";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Header, Footer, Noti } from "./components/globel";
import { Home, About, Signup, Login } from "./pages";

import { useUserContext } from "./context/user";

const usertoken = localStorage.getItem("token");

function App() {
  const navigate = useNavigate();
  const { username, token, loginwithtoken } = useUserContext();

  useEffect(() => {
    if (!token) navigate("/");
  }, [token]);

  useEffect(() => {
    const lwt = async () => {
      if (usertoken) {
        await loginwithtoken(usertoken);
      }
    };
    lwt();
  }, []);

  return (
    <>
      <Noti />
      <Box
        sx={{
          backgroundColor: "#4158D0",
          backgroundImage:
            "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Routes>
          <Route
            path="/"
            element={!token ? <Home /> : <Navigate to={`/${username}`} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:user" element={<div>hello</div>} />
        </Routes>
        <Footer />
      </Box>
    </>
  );
}

export default App;

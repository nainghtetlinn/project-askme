import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components/globel";
import { Home, About, Signup } from "./pages";

function App() {
  return (
    <>
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
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Box>
    </>
  );
}

export default App;

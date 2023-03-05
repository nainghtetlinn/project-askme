import { Button } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/globel";
import { Home, About } from "./pages";

import { useModeContext } from "./context/theme";

function App() {
  const { toggleColorMode } = useModeContext();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Button variant="contained" onClick={toggleColorMode}>
        Toggle
      </Button>
    </>
  );
}

export default App;

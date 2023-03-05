import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider, useTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import { ColorModeProvider, useModeContext } from "./context/theme";

function Root() {
  const { theme } = useModeContext();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <ColorModeProvider>
    <Root />
  </ColorModeProvider>
  // </React.StrictMode>
);

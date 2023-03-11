import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import { ColorModeProvider, useModeContext } from "./context/theme";

const queryClient = new QueryClient();

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
  <QueryClientProvider client={queryClient}>
    <ColorModeProvider>
      <Root />
    </ColorModeProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);

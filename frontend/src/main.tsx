import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";

import { ColorModeProvider, useModeContext } from "./context/theme";
import { NotiContextProvider } from "./context/noti";
import { UserContextProvider } from "./context/user";

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
    <UserContextProvider>
      <ColorModeProvider>
        <NotiContextProvider>
          <Root />
        </NotiContextProvider>
      </ColorModeProvider>
    </UserContextProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
  // </React.StrictMode>
);

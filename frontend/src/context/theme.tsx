import { createContext, useState, useMemo, useContext } from "react";
import { createTheme, ThemeOptions } from "@mui/material";

const light: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#784BA0",
    },
    secondary: {
      main: "#fff",
    },
  },
};

const dark: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#041C32",
    },
    secondary: {
      main: "#064663",
    },
  },
};

const themeSetting = (mode: "light" | "dark") => {
  return mode === "light" ? light : dark;
};

const ColorModeContext = createContext<any>({
  toggleColorMode: () => {},
  mode: "light",
  theme: {},
});

export const ColorModeProvider = ({ children }: { children: JSX.Element }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const toggleColorMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  const theme = useMemo(() => createTheme(themeSetting(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode, theme }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useModeContext = () => useContext(ColorModeContext);

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Stack,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import React from "react";
import { useNavigate } from "react-router-dom";

import { useModeContext } from "../../context/theme";
import { useUserContext } from "../../context/user";

export const Header = () => {
  const navigate = useNavigate();
  const { toggleColorMode, mode } = useModeContext();
  const { isLogin, logout } = useUserContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#4158D0",
          backgroundImage:
            "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
        }}
      >
        <Toolbar disableGutters>
          <Container maxWidth="lg">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5">Askme</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Button
                  onClick={() => navigate("/")}
                  color="inherit"
                  size="small"
                >
                  Home
                </Button>
                <Button
                  onClick={() => navigate("/about")}
                  color="inherit"
                  size="small"
                >
                  About
                </Button>
                {isLogin && (
                  <Button
                    sx={{ display: { xs: "none", md: "block" } }}
                    onClick={handleLogout}
                    color="inherit"
                    size="small"
                  >
                    Logout
                  </Button>
                )}
                {!isLogin && (
                  <Button
                    sx={{ display: { xs: "none", md: "block" } }}
                    onClick={() => navigate("/signup")}
                    color="inherit"
                    size="small"
                  >
                    Signup
                  </Button>
                )}
                {!isLogin && (
                  <Button
                    sx={{ display: { xs: "none", md: "block" } }}
                    onClick={() => navigate("/login")}
                    color="inherit"
                    size="small"
                  >
                    Login
                  </Button>
                )}

                <IconButton color="inherit" onClick={toggleColorMode}>
                  {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
                <IconButton
                  sx={{ display: { md: "none" } }}
                  color="inherit"
                  onClick={handleClick}
                >
                  <MenuIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        {isLogin && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
        {!isLogin && (
          <MenuItem onClick={() => navigate("/signup")}>Signup</MenuItem>
        )}
        {!isLogin && (
          <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
        )}
      </Menu>
    </>
  );
};

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

export const Header = () => {
  const navigate = useNavigate();
  const { toggleColorMode, mode } = useModeContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
            <Stack direction="row" alignItems="center">
              <Typography variant="h5">Askme</Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={{ xs: "space-between", md: "right" }}
                sx={{ width: "100%", ml: 1 }}
              >
                <Stack direction="row" alignItems="center">
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
                  <Button
                    sx={{ display: { xs: "none", md: "block" } }}
                    onClick={() => navigate("/signup")}
                    color="inherit"
                    size="small"
                  >
                    Signup
                  </Button>
                  <Button
                    sx={{ display: { xs: "none", md: "block" } }}
                    onClick={() => navigate("/login")}
                    color="inherit"
                    size="small"
                  >
                    Login
                  </Button>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
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
        <MenuItem onClick={() => navigate("/signup")}>Signup</MenuItem>
        <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
      </Menu>
    </>
  );
};

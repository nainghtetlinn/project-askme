import {
  Container,
  Paper,
  Stack,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../validation";
import { useNotiContext } from "../context/noti";
import { useUserContext } from "../context/user";

export const Login = () => {
  const navigate = useNavigate();
  const { showNoti } = useNotiContext();
  const { login } = useUserContext();
  const [show, setShow] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setErr] = useState<{ path: string; msg: string }>({
    path: "",
    msg: "",
  });

  const handleLogin = async () => {
    setErr({ path: "", msg: "" });
    const { error, value } = validateForm(username, password);
    if (error) {
      setErr({
        path: error.details[0].path[0].toString(),
        msg: error.details[0].message,
      });
      return;
    }

    try {
      const data = await login(username, password);
      navigate(data.username);
    } catch (error: any) {
      showNoti({ type: "error", msg: error?.response?.data?.message });
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ height: "100vh" }}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%" }}
        >
          <Paper sx={{ maxWidth: "500px" }}>
            <DialogTitle align="center">Log in</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                margin="dense"
                label="Username"
                placeholder="call_me_harry"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                helperText={err.path === "username" ? err.msg : ""}
                error={err.path === "username"}
              />
              <TextField
                type={show ? "text" : "password"}
                fullWidth
                margin="dense"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                helperText={err.path === "password" ? err.msg : ""}
                error={err.path === "password"}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Show password"
                value={show}
                onChange={() => setShow(!show)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleLogin} color="primary" variant="contained">
                Login
              </Button>
            </DialogActions>
          </Paper>
        </Stack>
      </Container>
    </>
  );
};

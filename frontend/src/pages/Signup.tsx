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

export const Signup = () => {
  const navigate = useNavigate();
  const { showNoti } = useNotiContext();
  const { signup } = useUserContext();
  const [show, setShow] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState<{ path: string; msg: string }>({
    path: "",
    msg: "",
  });

  const handleSignup = async () => {
    setErr({ path: "", msg: "" });
    if (password !== confirm)
      return setErr({ path: "confirm", msg: "Password didn't match." });
    const { error, value } = validateForm(username, password);
    if (error) {
      setErr({
        path: error.details[0].path[0].toString(),
        msg: error.details[0].message,
      });
      return;
    }
    try {
      const data = await signup(username, password);
      navigate(`/${data.username}`);
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
            <DialogTitle align="center">Sign Up</DialogTitle>
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
              <TextField
                type="password"
                fullWidth
                margin="dense"
                label="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                helperText={err.path === "confirm" ? err.msg : ""}
                error={err.path === "confirm"}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleSignup}
                color="primary"
                variant="contained"
              >
                Sign up
              </Button>
            </DialogActions>
          </Paper>
        </Stack>
      </Container>
    </>
  );
};

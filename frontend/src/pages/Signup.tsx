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
import { validateForm } from "../validation";

export const Signup = () => {
  const [show, setShow] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<{ path: string; msg: string }>({
    path: "",
    msg: "",
  });

  const handleSignup = () => {
    setErr({ path: "", msg: "" });
    const { error, value } = validateForm(username, password);
    if (error) {
      setErr({
        path: error.details[0].path[0].toString(),
        msg: error.details[0].message,
      });
      return;
    }
    console.log(value);
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

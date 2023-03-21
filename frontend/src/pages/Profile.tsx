import {
  Container,
  Paper,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
import { useUserContext } from "../context/user";
import { AskQuestionBox } from "../components/profile";
import { getbg } from "../assets/bgs";

const msg = ["hello", "hi", "my name is naing"];
export const Profile = () => {
  const { user } = useParams();
  const { username } = useUserContext();
  const url = window.location.href;
  return (
    <>
      <Container maxWidth="xs" sx={{ pt: 4, minHeight: "100vh" }}>
        {username !== user && <AskQuestionBox user={user} />}
        {username === user && (
          <>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                alignItems="center"
              >
                <TextField label="URL" value={url} />
                <Button
                  variant="contained"
                  onClick={() => {
                    navigator.clipboard.writeText(url);
                  }}
                >
                  Copy
                </Button>
              </Stack>
            </Paper>
          </>
        )}
        {username === user && (
          <Stack direction="column" spacing={2}>
            {msg.map((m, i) => {
              const bg = getbg();
              return (
                <Paper
                  key={i}
                  sx={{
                    fontSize: "18px",
                    minHeight: "150px",
                    p: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: bg.backgroundColor,
                    backgroundImage: bg.backgroundImage,
                  }}
                >
                  {m}
                </Paper>
              );
            })}
          </Stack>
        )}
      </Container>
    </>
  );
};

import { Container, Paper, Stack } from "@mui/material";
import { useParams } from "react-router";
import { useUserContext } from "../context/user";
import { AskQuestionBox } from "../components/profile";
import { getbg } from "../assets/bgs";

const msg = ["hello", "hi", "my name is naing"];
export const Profile = () => {
  const { user } = useParams();
  const { username } = useUserContext();
  return (
    <>
      <Container maxWidth="lg" sx={{ pt: 4, minHeight: "100vh" }}>
        {username !== user && <AskQuestionBox user={user} />}
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

import { Container, Paper, Stack } from "@mui/material";
import { useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "react-query";

import { useUserContext } from "../context/user";
import { getbgandtext } from "../utils/bg";
import { questionInstance } from "../requests";
import { AskQuestionBox, CopyUrlBox } from "../components/profile";

export const Profile = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const { username, findUser } = useUserContext();
  const { data } = useQuery(
    "questions",
    () => {
      return questionInstance.get("/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    },
    { refetchOnWindowFocus: false, enabled: user === username }
  );
  useLayoutEffect(() => {
    const cb = async () => {
      try {
        const data = await findUser(user);
      } catch (error) {
        navigate("/");
      }
    };
    cb();
  }, []);
  return (
    <>
      <Container maxWidth="xs" sx={{ pt: 4, minHeight: "100vh" }}>
        {username !== user && <AskQuestionBox user={user} />}
        {username === user && <CopyUrlBox />}
        {username !== user ? null : (
          <Stack direction="column" spacing={2}>
            {data?.data.map((m: any) => {
              const bgandtext = getbgandtext();
              return (
                <Paper
                  key={m._id}
                  sx={{
                    fontSize: "18px",
                    minHeight: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    ...bgandtext,
                  }}
                >
                  {m.title}
                </Paper>
              );
            })}
          </Stack>
        )}
      </Container>
    </>
  );
};

import { Container, Typography, Stack, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container maxWidth="lg">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", height: "100vh" }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={500}
              align="center"
              sx={{ mb: 3, color: "#fff" }}
            >
              Ask questions anonymously
            </Typography>
            <Typography variant="body1" align="center" sx={{ color: "#fff" }}>
              The platform for anonymous questioning!
            </Typography>
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ width: "100%", mt: 8 }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

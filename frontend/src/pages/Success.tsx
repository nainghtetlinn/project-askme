import { Container, Typography, Stack, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Success = () => {
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
              Success!
            </Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={() => navigate("/signup")}
            >
              Get your own message
            </Button>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

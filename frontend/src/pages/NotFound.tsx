import { useNavigate } from "react-router-dom";
import { Button, Typography, Container, Stack, Box } from "@mui/material";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
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
            Page Not Found
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate("/")}
          >
            Redirect
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

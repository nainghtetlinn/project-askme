import { Container } from "@mui/material";
import axios from "axios";
import { useQuery } from "react-query";

export const Home = () => {
  const login = async () => {
    const res = await fetch("http://localhost:5000");
    console.log(res);
  };
  login();

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: 1 }}>
        Home
      </Container>
    </>
  );
};

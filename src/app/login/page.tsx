"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useLogin } from "@refinedev/core";
import { yariga} from "@assets";
import Image from 'next/image';


export default function Login() {
  const { mutate: login } = useLogin();
  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        gap="30px"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Image src={yariga} alt="Yariga"  />
    <Button
      style={{ width: "240px" }}
      variant="contained"
      size="large"
      onClick={() => login({})}
    >
      Sign in
    </Button>
    <Typography align="center" color={"text.secondary"} fontSize="12px">
      Powered by
      <img
        style={{ padding: "0 5px" }}
        alt="Google"
        src="https://refine.ams3.cdn.digitaloceanspaces.com/superplate-auth-icons%2Fgoogle.svg"
      />
      Google
    </Typography>
    </Box>
    </Container>
    );
    }
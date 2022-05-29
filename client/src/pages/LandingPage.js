import React from "react";

import character from "../../src/assets/images/character.svg";
import logo from "../../src/assets/images/Logo.svg";

import { Box, Container, CssBaseline, Button, Stack } from "@mui/material";

const LandingPage = () => {
  return (
    <main>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={character} alt="buddy journal character"></img>
          <img src={logo} alt="buddy journal character" className="logo"></img>
          <p>Creating memories that will last forever</p>
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" href="/login">
              Log In
            </Button>
            <Button type="submit" variant="contained" href="/signup">
              Sign Up
            </Button>
          </Stack>
        </Box>
      </Container>
    </main>
  );
};

export default LandingPage;

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo.svg";

import Auth from "../../utils/auth";
export default function MenuAppBar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img
              src={logo}
              alt="buddy journal character"
              className="logo"
            ></img>
          </Typography>
          <div>
            {Auth.loggedIn() ? (
              <>
                <Link to="/profile">
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    // onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Link>
                <a href="/" onClick={logout}>
                  Logout
                </a>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

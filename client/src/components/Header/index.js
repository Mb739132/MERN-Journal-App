import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo.svg";
import "./styles.css";

import Auth from "../../utils/auth";
export default function MenuAppBar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="headerbar">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">
              <img
                src={logo}
                alt="buddy journal character"
                className="logo"
              ></img>
            </Link>
          </Typography>
          <div>
            {Auth.loggedIn() ? (
              <>
                <a href="/" onClick={logout}>
                  Logout
                </a>
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
              </>
            ) : (
              <>
                <Link to="/login" className="navMenu">
                  Login
                </Link>
                <Link to="/signup" className="navMenu">
                  Signup
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

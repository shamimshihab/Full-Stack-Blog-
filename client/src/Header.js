import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Hidden from "@mui/material/Hidden";
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Typography } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
export default function Header({ toggleTheme }) {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;
  const theme = useTheme();
  return (
    <>
      <header>
        <Hidden mdDown>
          <Link to="/" className="logo">
            MyBlog
          </Link>
          <nav>
            {username && (
              <>
                <Link to="/create">
                  <Button style={{ textTransform: "none" }}>
                    Create new post
                  </Button>
                </Link>

                <Button style={{ textTransform: "none" }} onClick={logout}>
                  Logout{" "}
                </Button>
              </>
            )}
            {!username && (
              <>
                <Link to="/login">
                  {" "}
                  <Button style={{ textTransform: "none" }}>Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}

            <Button
              sx={{ ml: 1, textTransform: "none" }}
              onClick={toggleTheme}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <>
                  <Typography> {theme.palette.mode} mode </Typography>{" "}
                  <Brightness7Icon />
                </>
              ) : (
                <>
                  <Typography> {theme.palette.mode} mode </Typography>{" "}
                  <Brightness4Icon />
                </>
              )}
            </Button>
          </nav>
        </Hidden>

        <Hidden mdUp>
          <Stack direction="row" spacing={2}>
            <Button
              edge="start"
              // color="inherit"
              aria-label="menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <MenuIcon />
            </Button>

            <Link to="/">
              <Button edge="start" color="inherit" aria-label="menu">
                MyBlog
              </Button>
            </Link>
          </Stack>

          <Drawer
            anchor="top"
            open={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {username && (
              <>
                <List style={{}}>
                  <Link to="/create">
                    {" "}
                    <Button onClick={() => setIsMobileMenuOpen(false)}>
                      Create new post
                    </Button>
                  </Link>

                  <ListItem onClick={() => setIsMobileMenuOpen(false)}>
                    <Button onClick={logout}>Logout ({username})</Button>
                  </ListItem>
                  <Button onClick={() => setIsMobileMenuOpen(false)}>
                    Close
                  </Button>
                </List>
              </>
            )}

            {!username && (
              <>
                <List>
                  <Link to="/login">
                    <Button onClick={() => setIsMobileMenuOpen(false)}>
                      <Button>Login</Button>
                    </Button>
                  </Link>

                  <Link to="/register">
                    <Button onClick={() => setIsMobileMenuOpen(false)}>
                      Register
                    </Button>
                  </Link>

                  <Button onClick={() => setIsMobileMenuOpen(false)}>
                    Close
                  </Button>
                </List>
              </>
            )}
          </Drawer>
        </Hidden>
        {/* Mobile Menu */}
      </header>
    </>
  );
}

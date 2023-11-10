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
                <Link to="/">
                  <Button style={{ textTransform: "none" }}>Home</Button>
                </Link>

                <Link to="/create">
                  <Button
                    style={{ textTransform: "none", whiteSpace: "nowrap" }}
                  >
                    Create new post
                  </Button>
                </Link>

                <Button
                  style={{ textTransform: "none", whiteSpace: "nowrap" }}
                  onClick={logout}
                >
                  Logout{" "}
                </Button>
              </>
            )}
            {!username && (
              <>
                <Link to="/">
                  <Button style={{ textTransform: "none" }}>Home</Button>
                </Link>
                <Link to="/login">
                  {" "}
                  <Button style={{ textTransform: "none" }}>Login</Button>
                </Link>
                <Link to="/register">
                  <Button style={{ textTransform: "none" }}>Register</Button>
                </Link>
              </>
            )}

            {theme.palette.mode === "dark" ? (
              <>
                <Button
                  varai
                  sx={{ ml: 1, textTransform: "none", whiteSpace: "nowrap" }}
                  onClick={toggleTheme}
                >
                  {" "}
                  Dark mode <Brightness7Icon />
                </Button>
              </>
            ) : (
              <>
                <Button
                  sx={{ ml: 1, textTransform: "none", whiteSpace: "nowrap" }}
                  onClick={toggleTheme}
                >
                  Light mode <Brightness4Icon />
                </Button>
              </>
            )}
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
                    <Button
                      style={{ textTransform: "none" }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Create new post
                    </Button>
                  </Link>

                  <ListItem onClick={() => setIsMobileMenuOpen(false)}>
                    <Button style={{ textTransform: "none" }} onClick={logout}>
                      Logout ({username})
                    </Button>
                  </ListItem>
                  {theme.palette.mode === "dark" ? (
                    <>
                      <Button
                        varai
                        sx={{
                          ml: 1,
                          textTransform: "none",
                          whiteSpace: "nowrap",
                        }}
                        onClick={toggleTheme}
                      >
                        {" "}
                        Dark mode <Brightness7Icon />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        sx={{
                          ml: 1,
                          textTransform: "none",
                          whiteSpace: "nowrap",
                        }}
                        onClick={toggleTheme}
                      >
                        Light mode <Brightness4Icon />
                      </Button>
                    </>
                  )}
                  <Button
                    style={{ textTransform: "none" }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
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
                      <Button style={{ textTransform: "none" }}>Login</Button>
                    </Button>
                  </Link>

                  <Link to="/register">
                    <Button
                      style={{ textTransform: "none" }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Register
                    </Button>
                  </Link>
                  {theme.palette.mode === "dark" ? (
                    <>
                      <Button
                        varai
                        sx={{
                          ml: 1,
                          textTransform: "none",
                          whiteSpace: "nowrap",
                        }}
                        onClick={toggleTheme}
                      >
                        {" "}
                        Dark mode <Brightness7Icon />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        sx={{
                          ml: 1,
                          textTransform: "none",
                          whiteSpace: "nowrap",
                        }}
                        onClick={toggleTheme}
                      >
                        Light mode <Brightness4Icon />
                      </Button>
                    </>
                  )}
                  <Button
                    style={{ textTransform: "none" }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
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

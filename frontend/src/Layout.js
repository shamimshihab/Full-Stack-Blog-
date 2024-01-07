import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Typography, Box, Paper, Button } from "@mui/material";
import Footer from "./Footer";

export default function Layout({ toggleTheme }) {
  console.log("toggleTheme ", toggleTheme);
  return (
    <Paper>
      <main>
        {" "}
        <Header toggleTheme={toggleTheme} />
        <Outlet />
        <Footer />
      </main>
    </Paper>
  );
}

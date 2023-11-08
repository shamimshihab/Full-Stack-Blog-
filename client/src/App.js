import "./App.css";
import Post from "./Post";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };
  console.log("theme", theme);
  console.log("isDarkTheme", isDarkTheme);
  console.log("darkTheme", darkTheme);
  console.log("lightTheme ", lightTheme);
  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Layout toggleTheme={toggleTheme} />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/create" element={<CreatePost />} />

            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;

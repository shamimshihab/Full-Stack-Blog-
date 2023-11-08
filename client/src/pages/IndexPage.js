import Post from "../Post";
import { useEffect, useState } from "react";

import { Typography, Box, Paper, Button } from "@mui/material";
export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return <> {posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
}

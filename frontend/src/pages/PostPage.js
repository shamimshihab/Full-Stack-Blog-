import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import {
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  Stack,
  TextField,
} from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";

import SimilarPost from "../SimilarPost";
export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, [id]);

  if (!postInfo) return "";
  console.log("outputid", id);
  async function deletePost() {
    const response = await fetch("http://localhost:4000/post/${id}" + id, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to="/" />;
  }
  console.log("clicked1");
  function sanitizeHTML(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }
  const sanitizedContent = sanitizeHTML(postInfo.content);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSave = async (ev) => {
    ev.preventDefault();

    const response = await fetch(
      `http://localhost:4000/post/${id}/review/addNew`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      }
    );
    if (response.ok) {
      console.log("saved");
    }
  };

  return (
    <>
      <Paper
        className="home-page-container"
        elevation={3}
        style={{ minHeight: "90vh" }}
      >
        <Grid container spacing={1}>
          <Grid item sm={12} xs={12} md={8} style={{ padding: 5 }}>
            <div className="post-page">
              <Typography
                style={{
                  textAlign: "left",
                  wordWrap: "break-word",
                  maxWidth: "90%",
                }}
              >
                <h1>{postInfo.title}</h1>
              </Typography>{" "}
              <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
              <div className="author">by @{postInfo.author.username}</div>
              {userInfo.id === postInfo.author._id && (
                <Stack
                  direction="row"
                  spacing={3}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    margin: 8,
                  }}
                >
                  <Link to={`/edit/${postInfo._id}`}>
                    <Button
                      variant="contained"
                      style={{ textTransform: "none" }}
                    >
                      <EditIcon /> Edit this post
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    style={{ textTransform: "none", width: "30%" }}
                    onClick={deletePost}
                  >
                    <DeleteForeverIcon />
                    Delete this post
                  </Button>
                </Stack>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: 8,
                  padding: 3,
                }}
              >
                <img
                  className="postImagePhoto"
                  src={`http://localhost:4000/${postInfo.cover}`}
                  alt=""
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",

                  margin: 8,
                  padding: 3,
                }}
              >
                <Typography
                  style={{
                    textAlign: "left",
                    wordWrap: "break-word",
                    maxWidth: "90%",
                  }}
                >
                  {sanitizedContent}
                </Typography>{" "}
              </div>
              <Box>
                <form>
                  <TextField
                    label="Write your comment"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={comment}
                    onChange={handleCommentChange}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </form>
              </Box>
            </div>
          </Grid>
          <Grid item sm={12} xs={12} md={4} style={{ padding: 8 }}>
            <Typography variant="h6">Post You may like</Typography>
            <Divider />
            <Divider />
            <SimilarPost />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

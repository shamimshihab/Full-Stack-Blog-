import { useContext, useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
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
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
        console.log("postInfo", postInfo);
      });
    });
  }, [id]);

  if (!postInfo) return "";
  console.log("outputid", id);
  async function deletePost() {
    const response = await fetch("http://localhost:4000/post/" + id, {
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
      // Wait for the new comment to be added, then fetch the updated post information
      await fetch(`http://localhost:4000/post/${id}`).then((response) => {
        if (response.ok) {
          response.json().then((postInfo) => {
            setPostInfo(postInfo);
          });
        }
      });
      setComment("");
      navigate(`/post/${id}`);
    }
  };
  function formatDate(dateString) {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  }
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
                    rows={3}
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
              <Box style={{ marginTop: "1.5rem" }}>
                {postInfo.review?.map((review) => (
                  <Stack
                    key={review._id}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    marginBottom={2}
                    padding={2}
                    border={1}
                    borderColor="grey.300"
                  >
                    <Avatar />

                    <Stack direction="column">
                      {" "}
                      <Typography>{review.comment}</Typography>
                      <Typography
                        variant="body2"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {formatDate(review.createdAt)}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
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

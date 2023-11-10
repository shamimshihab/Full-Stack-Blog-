import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import { Typography, Box, Paper, Button, Grid } from "@mui/material";

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  return (
    <Paper style={{ margin: 3, padding: 3 }}>
      <Grid container spacing={1}>
        <Grid
          item
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          sm={12}
          md={6}
        >
          <div className="image">
            <Link to={`/post/${_id}`}>
              <img src={"http://localhost:4000/" + cover} alt="" />
            </Link>
          </div>
        </Grid>
        <Grid item sm={12} md={6}>
          <Box
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to={`/post/${_id}`}>
              <h2>{title.substring(0, 25)}</h2>
            </Link>
            <p className="infoDetails ">
              User : <a className="author">{author.username}</a>
              Time : <time>{formatISO9075(new Date(createdAt))}</time>
            </p>
            <p className="summary">{summary.substring(0, 30)}</p>
            <Link to={`/post/${_id}`}>
              <Button
                variant="contained"
                style={{
                  margin: 0,
                  padding: 0,
                  width: "25%",
                  textTransform: "none",
                }}
              >
                {" "}
                Read more
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

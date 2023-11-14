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
    <Paper elevation={3} style={{ margin: 5, padding: 5 }}>
      <Grid container spacing={2}>
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
          <div>
            <Link to={`/post/${_id}`}>
              <img
                className="index-Image"
                src={"http://localhost:4000/" + cover}
                alt=""
              />
            </Link>
          </div>
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // "@media (max-width: 720px)": {
            //   alignItems: "center",
            // },
          }}
        >
          <Box>
            <Link to={`/post/${_id}`}>
              <Button
                style={{
                  textTransform: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                <h2>{title.substring(0, 25)}</h2>
              </Button>
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
                  padding: "4px",
                  width: "50%",
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

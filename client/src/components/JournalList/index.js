import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";

const JournalList = ({ journals, heading }) => {
  if (!journals.length) {
    return <h3>No journals Yet</h3>;
  }

  return (
    <>
      {journals &&
        journals.map((journal) => (
          <Grid xs={4} px={2} py={2}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={journal.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Link to={`/journal/${journal._id}`}>
                    <Typography gutterBottom variant="h5" component="div">
                      <h3>{journal.heading}</h3>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <p>{journal.journalText}</p>
                    </Typography>
                  </Link>
                  <div key={journal._id} className="card mb-3">
                    <p className="card-header createAt">
                      {journal.username} journal on {journal.createdAt}
                    </p>
                    <div className="card-body"></div>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
    </>
  );
};

export default JournalList;

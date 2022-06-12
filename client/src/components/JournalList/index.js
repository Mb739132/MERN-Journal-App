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
          <Grid py={2} key={journal._id} sx={{ m: 2 }}>
            <Link to={`/journal/${journal._id}`}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={journal.image}
                    alt=""
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <h3>{journal.heading}</h3>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <span>{journal.journalText}</span>
                    </Typography>
                    <div key={journal._id} className="card mb-3">
                      <span className="card-header createAt">
                        {journal.username} journal on {journal.createdAt}
                      </span>
                      <div className="card-body"></div>
                    </div>
                  </CardContent>
                </CardActionArea>

    
     
              </Card>
            </Link>
          </Grid>
        ))}
    </>
  );
};

export default JournalList;

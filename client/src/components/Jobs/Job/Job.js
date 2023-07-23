import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteJob } from "../../../actions/jobs";
import useStyles from "./styles";

const Job = ({ job, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  // Function to generate the cover letter download link
  const downloadCoverLetter = () => {
    if (job.coverLetterFile) {
      const base64String = job.coverLetterFile;
      if (base64String.startsWith("JVBER")) {
        // The Base64 string starts with 'JVBER' (PDF format)
        const fullBase64 = `data:application/pdf;base64,${base64String}`;
        const link = document.createElement("a");
        link.href = fullBase64;
        link.download = "cover_letter.pdf";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (base64String.startsWith("data:")) {
        // The Base64 string starts with 'data:' prefix (already contains metadata)
        const link = document.createElement("a");
        link.href = base64String;
        link.download = "cover_letter.pdf";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Invalid PDF Base64 string
        alert("Invalid PDF Base64 string. Cannot download the file.");
      }
    } else {
      // No cover letter file available
      alert("No cover letter available for download.");
    }
  };
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          job.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={job.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{job.company}</Typography>
        <Typography variant="body2">
          {moment(job.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(job._id)}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {job.status}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {job.title}
      </Typography>
      <CardContent>
        <Typography variant="body1" color="textPrimary">
          {job.location ? `Location: ${job.location}` : ""}
        </Typography>
        <Typography variant="body1">Link:</Typography>
        <a href={job.link} target="_blank">
          {" "}
          <Typography className={classes.link} variant="body2">
            {job.link}
          </Typography>
        </a>
      </CardContent>
      <div className={classes.notes}>
        <Typography variant="body1">Notes:</Typography>
        <Typography variant="body2" component="p">
          {job.notes}
        </Typography>
      </div>
      {job.coverLetterFile && (
        <div className={classes.download}>
          <Typography>Cover Letter:</Typography>
          <Button
            onClick={downloadCoverLetter}
            variant="contained"
            color="primary"
          >
            Download
          </Button>
        </div>
      )}
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deleteJob(job._id))}
        >
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Job;

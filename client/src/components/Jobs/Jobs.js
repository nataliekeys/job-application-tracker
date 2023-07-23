import React, { useState } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Buttons from "../Buttons/Buttons";
import Search from "../Search/Search";
import Job from "./Job/Job";
import useStyles from "./styles";

function Jobs({ setCurrentId }) {
  const classes = useStyles();
  const [data, setData] = useState("");
  let jobs = useSelector((state) => state.jobs);
  let allJobs = useSelector((state) => state.jobs);
  const [searchQuery, setSearchQuery, searchClicked] = useState("");

  if (data == "All" || data == "") {
  } else {
    jobs = jobs.filter((jobs) => jobs.status === data);
  }

  const filterButton = (childdata) => {
    setData(childdata);
  };

  if (searchQuery) {
    console.log(searchQuery);
    jobs = jobs.filter((jobs) =>
      jobs.company.toLowerCase().includes(searchQuery)
    );
  }

  return !allJobs.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={0.5}
      >
        <Buttons filterButton={filterButton} />
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        ></Search>
      </Grid>
      {jobs.map((job) => (
        <Grid key={job._id} item xs={12} sm={6} md={6}>
          <Job job={job} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Jobs;

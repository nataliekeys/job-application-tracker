import React, { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import Jobs from "./components/Jobs/Jobs";
import Form from "./components/Form/Form";
import { getJobs } from "./actions/jobs";
import useStyles from "./styles";

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getJobs());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography
          className={classes.heading}
          color="primary"
          variant="h2"
          align="center"
        >
          Job Application Board
        </Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Jobs setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;

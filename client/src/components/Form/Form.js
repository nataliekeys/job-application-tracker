import React, { useState, useEffect } from 'react';
import { Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import TextField from '@mui/material/TextField'
import useStyles from './styles';
import InputLabel from '@mui/material/InputLabel';
import { createJob, updateJob } from '../../actions/jobs';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Form = ({ currentId, setCurrentId }) => {
  const [jobData, setJobData] = useState({title: '', company: '', status: '', location: '', link: '',  notes: '',selectedFile: '', coverLetterFile: '' });
  const job = useSelector((state) => (currentId ? state.jobs.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (job) setJobData(job);
  }, [job]);

  const clear = () => {
    setCurrentId(0);
    setJobData({ title: '', company: '', link: '', notes: '', status: '', location:'', selectedFile: '', coverLetterFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createJob(jobData));
      clear();
    } else {
      dispatch(updateJob(currentId, jobData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${job.title}"` : "Enter a Job"}
        </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={jobData.title}
          onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
        />
        <TextField
          name="company"
          variant="outlined"
          label="Company"
          fullWidth
          value={jobData.company}
          onChange={(e) => setJobData({ ...jobData, company: e.target.value })}
        />

        <TextField
          name="Location"
          variant="outlined"
          label="Location"
          fullWidth
          value={jobData.location}
          onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
        />
        <TextField
          name="Link"
          variant="outlined"
          label="Link"
          fullWidth
          multiline
          rows={2}
          value={jobData.link}
          onChange={(e) => setJobData({ ...jobData, link: e.target.value })}
        />

        <FormControl>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            fullWidth
            value={jobData.status}
            label="Status"
            onChange={(e) => setJobData({ ...jobData, status: e.target.value })}
          >
            <MenuItem value={"Not Started"}>Not Started</MenuItem>
            <MenuItem value={"In Progress"}>In Progress</MenuItem>
            <MenuItem value={"Submitted"}>Submitted</MenuItem>
          </Select>
          <div className={classes.fileInput}>
            <Typography>Upload Company Photo</Typography>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setJobData({ ...jobData, selectedFile: base64 })
              }
            />
          </div>
          <div className={classes.fileInput}>
            <Typography>Upload Cover Letter</Typography>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setJobData({ ...jobData, coverLetterFile: base64 })
              }
            />
          </div>

          <TextField
            name="Notes"
            variant="outlined"
            label="Notes"
            fullWidth
            multiline
            rows={4}
            value={jobData.notes}
            onChange={(e) => setJobData({ ...jobData, notes: e.target.value })}
          />
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </FormControl>
      </form>
    </Paper>
  );
};

export default Form;

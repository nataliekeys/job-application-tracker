import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getJobs = () => async (dispatch) => {
  try {
    const { data } = await api.fetchJobs();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createJob = (job) => async (dispatch) => {
  try {
    const { data } = await api.createJob(job);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateJob = (id, job) => async (dispatch) => {
  try {
    const { data } = await api.updateJob(id, job);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteJob = (id) => async (dispatch) => {
  try {
    await api.deleteJob(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

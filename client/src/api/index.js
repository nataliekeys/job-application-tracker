import axios from 'axios';

const url = 'http://localhost:5000/jobs';

export const fetchJobs = () => axios.get(url);
export const createJob = (newJob) => axios.post(url, newJob);
export const updateJob = (id, updatedJob) => axios.patch(`${url}/${id}`, updatedJob);
export const deleteJob = (id) => axios.delete(`${url}/${id}`);

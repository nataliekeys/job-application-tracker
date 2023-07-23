import express from 'express';

import { getJobs, getJob, createJob, updateJob, deleteJob } from '../controllers/jobs.js';

const router = express.Router();

router.get('/', getJobs);
router.post('/', createJob);
router.get('/:id', getJob);
router.patch('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;
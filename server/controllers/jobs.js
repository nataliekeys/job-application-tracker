import express from "express";
import mongoose from "mongoose";

import Jobs from "../models/Jobs.js";

const router = express.Router();

export const getJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find();

    res.status(200).json(jobs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Jobs.findById(id);

    res.status(200).json(job);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createJob = async (req, res) => {
  const {
    title,
    company,
    notes,
    link,
    status,
    location,
    selectedFile,
    coverLetterFile,
    createdAt,
  } = req.body;

  const newJob = new Jobs({
    title,
    company,
    notes,
    link,
    status,
    location,
    selectedFile,
    coverLetterFile,
    createdAt,
  });

  try {
    await newJob.save();

    res.status(201).json(newJob);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    company,
    link,
    notes,
    status,
    location,
    selectedFile,
    coverLetterFile,
    createdAt,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No job with id: ${id}`);

  const updatedJob = {
    title,
    company,
    notes,
    link,
    status,
    location,
    selectedFile,
    coverLetterFile,
    createdAt,
    _id: id,
  };

  await Jobs.findByIdAndUpdate(id, updatedJob, { new: true });

  res.json(updatedJob);
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Jobs.findByIdAndRemove(id);

  res.json({ message: "Job deleted successfully." });
};

export default router;

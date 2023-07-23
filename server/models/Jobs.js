import mongoose from 'mongoose';

const jobSchema = mongoose.Schema({
  title: String,
  company: String,
  link: String,
  status: {
    type: String,
    default: "Not Started",
  },
  notes: String,
  resumeFile: String,
  coverLetterFile: String,
  selectedFile: String,

  location: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

let Jobs = mongoose.model('Jobs', jobSchema);

export default Jobs;
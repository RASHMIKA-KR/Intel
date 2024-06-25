// models/vacancyModel.js
import mongoose from 'mongoose';

const vacancySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter the job title'],
    minLength: [3, 'Job title must be at least 3 characters'],
    maxLength: [100, 'Job title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please enter the job description'],
    minLength: [10, 'Job description must be at least 10 characters'],
    maxLength: [2000, 'Job description cannot exceed 2000 characters'],
  },
  institutionId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Institution',
    required: true,
  },
  centerId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Center',
    required: false,
  },
  postedByModel: {
    type: String,
    enum: ['Institution', 'Center'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Vacancy = mongoose.model('Vacancy', vacancySchema);

export default Vacancy;

// models/admissionSchema.js
import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema({
  // postedBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Institution',
  //   refPath: 'postedByType',
  //   required: true,
  // },
  postedBy: {
    type: String,
    enum: ['Institution', 'Center'],
    required: true,
  },
  coursesAvailable: [{
    type: String,
    required: true,
  }],
  insName: [{
    type: String,
    required: true,
  }],
  feesStructure: {
    type: Number,
    required: true,
  },
  lastDateToApply: {
    type: Date,
    required: true,
  },
  // Add other fields as needed
});

const Admission = mongoose.model('Admission', admissionSchema);

export default Admission;

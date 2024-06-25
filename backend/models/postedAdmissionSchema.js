import mongoose from 'mongoose';

const postedAdmissionSchema = new mongoose.Schema({
  institutionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Institution', // Reference to the Institution model
  },
  centerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center', // Reference to the Center model (if applicable)
  },
  courseName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eligibilityCriteria: {
    type: String,
    required: true,
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  // Other fields related to the admission
});

const PostedAdmission = mongoose.model('PostedAdmission', postedAdmissionSchema);

export default PostedAdmission;

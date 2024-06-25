import mongoose from "mongoose";
import validator from "validator";

const vacancyEnquirySchema = new mongoose.Schema({
  applicantName: {
    type: String,
    required: [true, "Please enter the Applicant's Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [50, "Name cannot exceed 50 Characters!"],
  },
  applicantEmail: {
    type: String,
    required: [true, "Please enter the Applicant's Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  applicantPhone: {
    type: String,
    required: [true, "Please enter the Applicant's Phone Number!"],
    validate: {
      validator: function(value) {
        return /^[6-9]\d{9}$/.test(value);
      },
      message: "Phone number must be exactly 10 digits long and contain only digits!",
    },
  },
  institutionId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Institution"
  },
  vacancyId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Vacancy"
  },
  positionOfInterest: {
    type: String,
    required: [true, "Please enter the Position of Interest!"],
    minLength: [3, "Position name must contain at least 3 Characters!"],
    maxLength: [100, "Position name cannot exceed 100 Characters!"],
  },
  enquiryDetails: {
    type: String,
    maxLength: [500, "Enquiry details cannot exceed 500 Characters!"],
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Declined"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const VacancyEnquiry = mongoose.model('VacancyEnquiry', vacancyEnquirySchema);

export default VacancyEnquiry;

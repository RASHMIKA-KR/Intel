import mongoose from "mongoose";
import validator from "validator";

const admissionEnquirySchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, "Please enter the Student's Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [50, "Name cannot exceed 50 Characters!"],
  },
  studentEmail: {
    type: String,
    required: [true, "Please enter the Student's Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  studentPhone: {
    type: String,
    required: [true, "Please enter the Student's Phone Number!"],
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
  },
  applicantId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  courseOfInterest: {
    type: String,
    required: [true, "Please enter the Course of Interest!"],
    minLength: [3, "Course name must contain at least 3 Characters!"],
    maxLength: [100, "Course name cannot exceed 100 Characters!"],
  },
  enquiryDetails: {
    type: String,
    maxLength: [500, "Enquiry details cannot exceed 500 Characters!"],
  },
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Contacted"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("AdmissionEnquiry", admissionEnquirySchema);

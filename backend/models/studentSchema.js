import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    maxLength: [32, "Password cannot exceed 32 characters!"],
    select: false,
  },
  gender: {
    type: String,
    required: [true, "Please select your Gender!"],
    enum: ["Male", "Female", "Other"],
  },
  address: {
    type: String,
    required: [true, "Please enter your Address!"],
  },
  age: {
    type: Number,
    required: [true, "Please enter your Age!"],
    min: [3, "Age must be at least 3 years!"],
    max: [100, "Age must be at most 100 years!"],
  },
  phone: {
    type: String,
    required: [true, "Please enter your Phone Number!"],
    validate: {
      validator: function(value) {
        // Check if the phone number is exactly 10 digits and contains only digits
        return /^[6-9]\d{9}$/.test(value);
      },
      message: "Phone number must be exactly 10 digits long and contain only digits!",
    },
  },
  institutionType: {
    type: String,
    required: [true, "Please select an institution type!"],
    enum: ["School", "College"],
  },
  institutionName: {
    type: String,
    required: [true, "Please enter your School/College Name!"],
  },
  standard: {
    type: String,
    required: function() {
      return this.institutionType === "School";
    },
  },
  collegeDepartment: {
    type: String,
    required: function() {
      return this.institutionType === "College";
    },
  },
  yearOfStudy: {
    type: Number,
    required: function() {
      return this.institutionType === "College";
    },
    min: [1, "Year of study cannot be less than 1!"],
    max: [5, "Year of study cannot exceed 5!"],
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to hash the password before saving
studentSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
studentSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JWT token
studentSchema.methods.getJWTToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const Student = mongoose.model("Student", studentSchema);
export default Student;
import  Student  from "../models/studentSchema.js";
import Institution from "../models/institutionSchema.js"; 
import Center  from "../models/centerSchema.js"; 
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import { getAllMaterials, getMaterialById } from '../controllers/materialController.js';

// Register a new student
export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const {
      name,
      email,
      password,
      gender,
      address,
      age,
      phone,
      institutionType,
      institutionName,
      standard,
      collegeDepartment,
      yearOfStudy,
    } = req.body;
      // Check if the user already exists
      const existingUser = await Student.findOne({ email });
      if (existingUser) {
          return next(new ErrorHandler("Student already exists!", 400));
      }
    let student;
  
    if (institutionType === 'School') {
      student = await Student.create({
        name,
        email,
        password,
        gender,
        address,
        age,
        phone,
        institutionType,
        institutionName,
        standard,
      });
    } else if (institutionType === 'College') {
      student = await Student.create({
        name,
        email,
        password,
        gender,
        address,
        age,
        phone,
        institutionType,
        institutionName,
        collegeDepartment,
        yearOfStudy,
      });
    } else {
      return next(new ErrorHandler("Invalid institution type!", 400));
    }
  
    sendToken(student, 201, res, "Student Registered Successfully!");
  });
  
// Login a student
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password!", 400));
  }

  const student = await Student.findOne({ email }).select("+password");

  if (!student) {
    return next(new ErrorHandler("Invalid Email or Password!", 400));
  }

  const isPasswordMatched = await student.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password!", 400));
  }

  sendToken(student, 200, res, "Student Logged In Successfully!");
});

// Logout a student
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully!",
  });
});


// Get all materials
export const getAllMaterials = getAllMaterials;

// Get material by ID
export const getMaterialById = getMaterialById;

// Get institutions
export const getInstitutions = catchAsyncErrors(async (req, res, next) => {
  const institutions = await Institution.find();
  res.status(200).json({
    success: true,
    institutions,
  });
});

// Get institution by ID
export const getInstitutionById = catchAsyncErrors(async (req, res, next) => {
  const institution = await Institution.findById(req.params.id);
  if (!institution) {
    return next(new ErrorHandler("Institution not found!", 404));
  }
  res.status(200).json({
    success: true,
    institution,
  });
});

// Get centers
export const getCenters = catchAsyncErrors(async (req, res, next) => {
  const centers = await Center.find();
  res.status(200).json({
    success: true,
    centers,
  });
});

// Get center by ID
export const getCenterById = catchAsyncErrors(async (req, res, next) => {
  const center = await Center.findById(req.params.id);
  if (!center) {
    return next(new ErrorHandler("Center not found!", 404));
  }
  res.status(200).json({
    success: true,
    center,
  });
});

// Get student profile
export const getProfile = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.user.id);
  res.status(200).json({
    success: true,
    student,
  });
});

// Update student profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.user; // Assuming req.user.id contains the student's ID
  
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true, useFindAndModify: false }
    );
  
    res.status(200).json({
      success: true,
      student: updatedStudent,
      message: "Profile Updated!",
    });
  });
  

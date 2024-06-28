import Student from "../models/studentSchema.js";
import Institution from "../models/institutionSchema.js"; 
import Center from "../models/centerSchema.js"; 
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import { getAllMaterials, getMaterialById} from './materialController.js';
import { applyToAdmission, getMyAdmissionEnquiries} from './admissionEnquiryController.js';
import { getAllAdmissions } from  './admissionController.js';
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
    if (!name || !email || !password || !gender || !address || !age || !phone || !institutionType || !institutionName ||
      (institutionType === 'school' && !standard) ||
      (institutionType === 'college' && (!collegeDepartment || !yearOfStudy))) {
      return next(new ErrorHandler('Please fill in all required fields', 400));
  }
      // Check if the user already exists
      const existingUser = await Student.findOne({ email });
      if (existingUser) {
          return next(new ErrorHandler("Student already exists!", 400));
      }
    let student;
  
    if (institutionType =='School') {
      student = await Student.create({
        type,
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
    } else if (institutionType == 'College') {
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


export const getStudentMaterials = catchAsyncErrors(async (req, res, next) => {
  await getAllMaterials(req, res, next);
});

export const getStudentMaterialById = catchAsyncErrors(async (req, res, next) => {
  await getMaterialById(req, res, next);
});


export const getInstitutions = async (req, res, next) => {
  try {
    const institutions = await Institution.find();
    res.status(200).json({ success: true, institutions });
  } catch (error) {
    next(error);
  }
};


// Get institution by ID
export const getInstitutionById = catchAsyncErrors(async (req, res, next) => {
  try {
    const institution = await Institution.findById(req.params.id);
    if (!institution) {
      return next(new ErrorHandler("Institution not found!", 404));
    }
    res.status(200).json({
      success: true,
      institution,
    });
  } catch (error) {
    return next(new ErrorHandler("An error occurred while fetching the institution!", 500));
  }
});

// Get centers
export const getCenters = catchAsyncErrors(async (req, res, next) => {
  const centers = await Center.find();

  if (!centers || centers.length === 0) {
    return next(new ErrorHandler("No Centers available", 404));
  }

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

// Get all posted admissions
export const getAllPostedAdmissions = catchAsyncErrors(async (req, res, next) => {
  await getAllAdmissions(req, res, next);

});

// Get posted admission by ID
export const getPostedAdmissionById = catchAsyncErrors(async (req, res, next) => {
  await getAdmissionById(req, res, next);
});

// Apply to admission
export const applyToAnyAdmission = catchAsyncErrors(async (req, res, next) => {
  await applyToAdmission(req, res, next);

});
export const getmyAdmissionEnquiries= catchAsyncErrors(async (req, res, next) => {
  await getMyAdmissionEnquiries(req, res, next);

});
// Apply to center admission
export const applyToCenterAdmission = catchAsyncErrors(async (req, res, next) => {
  await applyToAdmission(req, res, next);

});

// Apply to institution admission
export const applyToInstitutionAdmission = catchAsyncErrors(async (req, res, next) => {
  await applyToAdmission(req, res, next);

});


export const getProfile = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log('req.student:', req.student); // Add this line

    const student = await Student.findById(req.student.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    console.error('Error fetching student profile:', error);
    next(error);
  }
});


import bcrypt from "bcrypt";

// Update profile controller
export const updateProfile = async (req, res) => {
  try {
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
      yearOfStudy 
    } = req.body;
    console.log('req.BODY:', req.body); // Add this line

    const studentId = req.body._id;
    console.log('id in params',studentId);
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (gender) updateData.gender = gender;
    if (address) updateData.address = address;
    if (age) updateData.age = age;
    if (phone) updateData.phone = phone;
    if (institutionType) updateData.institutionType = institutionType;
    if (institutionName) updateData.institutionName = institutionName;
    if (standard) updateData.standard = standard;
    if (collegeDepartment) updateData.collegeDepartment = collegeDepartment;
    if (yearOfStudy) updateData.yearOfStudy = yearOfStudy;

    // If password is being updated, hash it before saving
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedStudent = await Student.findByIdAndUpdate(studentId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


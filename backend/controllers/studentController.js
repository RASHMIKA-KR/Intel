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

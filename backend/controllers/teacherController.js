import {Teacher} from '../models/teacherSchema.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import { sendToken } from '../utils/jwtToken.js';
import { getAllMaterials, getMaterialById, getMyMaterials, postMaterial,deleteSingleMaterial } from './materialController.js';
import { applyToVacancy,getMyVacancyEnquiries} from '../controllers/vacancyEnquiryController.js';
import { getAllVacancies,getVacancyById} from './vacancyController.js';
// Register a new teacher
export const registerTeacher = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    password,
    gender,
    address,
    age,
    phone,
    institutionType,
    institutionDetails,
  } = req.body;
  // Check if any required fields are missing
  const requiredFields = ['name', 'email', 'password', 'gender', 'address', 'age', 'phone', 'institutionType', 'name'];
  const missingFields = requiredFields.filter(field => !req.body[field]);
  if (missingFields.length > 0) {
      return next(new ErrorHandler(`Missing required fields: ${missingFields.join(', ')}`, 400));
  }
    // Check if the user already exists
    const existingUser = await Teacher.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("Teacher already exists!", 400));
    }
  const teacher = await Teacher.create({
    name,
    email,
    password,
    gender,
    address,
    age,
    phone,
    institutionType,
    institutionDetails,
  });

  sendToken(teacher, 201, res, "Teacher Registered Successfully!");
});

// Login a teacher
export const loginTeacher = catchAsyncErrors(async (req, res, next) => {
  
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password!", 400));
  }

const teacher = await Teacher.findOne({ email }).select("+password");

  if (!teacher) {
    return next(new ErrorHandler("Invalid Email or Password!", 400));
  }

  const isPasswordMatched = await teacher.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password!", 400));
  }

  sendToken(teacher, 200, res, "Teacher Logged In Successfully!");
});

// Logout a teacher
export const logoutTeacher = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully!",
  });
});


export const getAllPostedMaterials = catchAsyncErrors(async (req, res, next) => {
  await getAllMaterials(req, res, next);
});

export const getPostedMaterialById = catchAsyncErrors(async (req, res, next) => {
  await getMaterialById(req, res, next);
});

export const getMaterialsPostedByMe = catchAsyncErrors(async (req, res, next) => {
  await getMyMaterials(req, res, next);
});

export const postNewMaterial = catchAsyncErrors(async (req, res, next) => {
  await postMaterial(req, res, next);
});
export const deletePostMaterial=catchAsyncErrors(async(req,res,next)=>{
  await deleteSingleMaterial(req,res,next);
});

export const getAllvacancies = catchAsyncErrors(async (req, res, next) => {
  await getAllVacancies(req, res, next);
});
export const getvacancybyid = catchAsyncErrors(async (req, res, next) => {
  await getVacancyById(req, res, next);
});

export const applytoVacancy = catchAsyncErrors(async (req, res, next) => {
  await applyToVacancy(req, res, next);

});

export const getmyVacancyEnquiries= catchAsyncErrors(async (req, res, next) => {
  await getMyVacancyEnquiries(req, res, next);

});


import Teacher from '../models/teacherSchema.js';
import Material from '../models/materialSchema.js';
import Center from '../models/centerSchema.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import { sendToken } from '../utils/jwtToken.js';

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

// Get all materials
export const getMaterials = catchAsyncErrors(async (req, res, next) => {
  const materials = await Material.find();
  res.status(200).json({
    success: true,
    materials,
  });
});

// Get material by ID
export const getMaterialById = catchAsyncErrors(async (req, res, next) => {
  const material = await Material.findById(req.params.id);
  if (!material) {
    return next(new ErrorHandler("Material not found!", 404));
  }
  res.status(200).json({
    success: true,
    material,
  });
});

// Post a new material
export const postMaterial = catchAsyncErrors(async (req, res, next) => {
  const { name, description, files } = req.body;
  const uploadedBy = req.user._id;
  const uploadedByModel = 'Teacher';

  const material = await Material.create({
    name,
    description,
    files,
    uploadedBy,
    uploadedByModel,
  });

  res.status(201).json({
    success: true,
    material,
    message: "Material Posted Successfully!",
  });
});

// Create a new center
export const createCenter = catchAsyncErrors(async (req, res, next) => {
  const { name, address, phone, domain } = req.body;
  const center = await Center.create({
    name,
    address,
    phone,
    domain,
  });

  res.status(201).json({
    success: true,
    center,
    message: "Center Created Successfully!",
  });
});
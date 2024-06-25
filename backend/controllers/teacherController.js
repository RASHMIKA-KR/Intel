import Teacher from '../models/teacherSchema.js';
import Center from '../models/centerSchema.js';
import Material from '../models/materialSchema.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import { sendToken } from '../utils/jwtToken.js';
import cloudinary from 'cloudinary';

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
export const getAllMaterials = catchAsyncErrors(async (req, res, next) => {
  const materials = await Material.find();
  res.status(200).json({
    success: true,
    materials,
  });
});

// Get materials uploaded by the current user
export const getMyMaterials = catchAsyncErrors(async (req, res, next) => {
  const myMaterials = await Material.find({ uploadedBy: req.user._id });
  res.status(200).json({
    success: true,
    myMaterials,
  });
});

// Get material by ID
export const getMaterialById = catchAsyncErrors(async (req, res, next) => {
  const material = await Material.findById(req.params.id);
  if (!material) {
    return next(new ErrorHandler("Material not found", 404));
  }
  res.status(200).json({
    success: true,
    material,
  });
});

// Post new learning material
export const postMaterial = catchAsyncErrors(async (req, res, next) => {
  const { title, description, category, uploadedByModel } = req.body;
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("File Required!", 400));
  }

  const { file } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp", "video/mp4", "application/pdf"];
  if (!allowedFormats.includes(file.mimetype)) {
    return next(new ErrorHandler("Invalid file type. Please upload a valid file.", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(file.tempFilePath);
  
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary error");
    return next(new ErrorHandler("Failed to upload file to Cloudinary", 500));
  }

  const newMaterial = new Material({
    title,
    description,
    category,
    file: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    uploadedBy: req.user._id,
    uploadedByModel
  });

  await newMaterial.save();

  res.status(201).json({
    success: true,
    material: newMaterial,
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

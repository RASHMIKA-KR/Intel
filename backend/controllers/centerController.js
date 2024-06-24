import Center from '../models/centerSchema.js';
import Material from '../models/materialSchema.js';
import Admission from '../models/admissionSchema.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import cloudinary from '../config/cloudinary.js'; // Assuming you have a cloudinary configuration file

// Register a new center with image upload
export const registerCenter = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    password,
    type,
    address,
    phone,
    courses,
  } = req.body;

  // Check if there are any images uploaded
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Images Required!", 400));
  }

  // Assuming 'images' is the key for images upload
  const { images } = req.files;

  // Validate image formats
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  const invalidImages = images.filter(img => !allowedFormats.includes(img.mimetype));

  if (invalidImages.length > 0) {
    const invalidFormats = invalidImages.map(img => img.mimetype).join(', ');
    return next(new ErrorHandler(`Invalid image formats: ${invalidFormats}. Please upload PNG, JPEG, or WEBP.`, 400));
  }

  // Upload images to Cloudinary and collect responses
  const uploadedImages = [];
  for (const img of images) {
    const cloudinaryResponse = await cloudinary.uploader.upload(img.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      return next(new ErrorHandler("Failed to upload images to Cloudinary", 500));
    }
    uploadedImages.push({
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    });
  }

  // Save center details with uploaded images
  const center = new Center({
    name,
    email,
    password,
    type,
    address,
    phone,
    courses,
    images: uploadedImages,
  });

  await center.save();
  sendToken(center, 201, res, "Center Registered Successfully!");
});

// Login a center
export const loginCenter = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password!", 400));
  }

  const center = await Center.findOne({ email }).select("+password");

  if (!center) {
    return next(new ErrorHandler("Invalid Email or Password!", 400));
  }

  const isPasswordMatched = await center.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password!", 400));
  }

  sendToken(center, 200, res, "Center Logged In Successfully!");
});

// Logout a center
export const logoutCenter = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully!",
  });
});

// Post a new learning material with Cloudinary integration
export const postMaterial = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("File Required!", 400));
  }

  const { file } = req.files; // Assuming 'file' is the key for file upload

  // Check if the file format is allowed
  const allowedFormats = ["image/png", "image/jpeg", "image/webp", "video/mp4", "application/pdf"];
  if (!allowedFormats.includes(file.mimetype)) {
    return next(
      new ErrorHandler("Invalid file type. Please upload a valid file.", 400)
    );
  }

  // Upload file to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(file.tempFilePath);

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload Material to Cloudinary", 500));
  }

  // Save material details to MongoDB
  const { title, description, category } = req.body;
  const newMaterial = new Material({
    title,
    description,
    category,
    file: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    center: req.user.id, // Assuming authenticated user's center ID is stored in req.user.id
  });

  await newMaterial.save();

  res.status(201).json({
    success: true,
    material: newMaterial,
  });
});

// Get all learning materials
export const getMaterials = catchAsyncErrors(async (req, res, next) => {
  const materials = await Material.find();
  res.status(200).json({
    success: true,
    materials,
  });
});

// Get learning material by ID
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

// Post a new admission
export const postAdmission = catchAsyncErrors(async (req, res, next) => {
  const { name, age, grade, centerId } = req.body;

  const newAdmission = new Admission({ name, age, grade, center: centerId });

  await newAdmission.save();

  res.status(201).json({
    success: true,
    admission: newAdmission,
  });
});

// Get all admissions
export const getAdmissions = catchAsyncErrors(async (req, res, next) => {
  const admissions = await Admission.find();
  res.status(200).json({
    success: true,
    admissions,
  });
});

// Get admission by ID
export const getAdmissionById = catchAsyncErrors(async (req, res, next) => {
  const admission = await Admission.findById(req.params.id);
  if (!admission) {
    return next(new ErrorHandler("Admission not found!", 404));
  }
  res.status(200).json({
    success: true,
    admission,
  });
});

// Get admission enquiries for the authenticated center
export const getAdmissionEnquiry = catchAsyncErrors(async (req, res, next) => {
  const admissions = await Admission.find({ center: req.user.id });
  res.status(200).json({
    success: true,
    admissions,
  });
});

// Get a specific admission enquiry by ID for the authenticated center
export const getAdmissionEnquiryById = catchAsyncErrors(async (req, res, next) => {
  const admission = await Admission.findOne({ _id: req.params.id, center: req.user.id });
  if (!admission) {
    return next(new ErrorHandler("Admission enquiry not found!", 404));
  }
  res.status(200).json({
    success: true,
    admission,
  });
});

// Get center profile
export const getCenterProfile = catchAsyncErrors(async (req, res, next) => {
  const center = await Center.findById(req.user.id);
  res.status(200).json({
    success: true,
    center,
  });
});

// Update center profile
export const updateCenterProfile = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.user; // Assuming req.user.id contains the center's ID

  const updatedCenter = await Center.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
    success: true,
    center: updatedCenter,
    message: "Profile Updated!",
  });
});

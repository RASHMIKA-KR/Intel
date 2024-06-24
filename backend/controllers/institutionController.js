import Institution from '../models/institutionSchema.js';
import Material from '../models/materialSchema.js';
import Admission from '../models/admissionSchema.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import cloudinary from '../config/cloudinary.js'; // Assuming you have a cloudinary configuration file
import { postMaterial, getAllMaterials, getMaterialById, getMyMaterials } from '../controllers/materialController.js';
// Register a new institution with image upload
export const registerInstitution = catchAsyncErrors(async (req, res, next) => {
    const {
      name,
      email,
      password,
      gender,
      address,
      age,
      institutionType,
      description,
      institutionDetails,
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
  
    // Save institution details with uploaded images
    const institution = new Institution({
      name,
      email,
      password,
      gender,
      address,
      age,
      institutionType,
      description,
      institutionDetails: {
        ...institutionDetails,
        images: uploadedImages, // Add uploaded images to institutionDetails
      },
    });
  
    await institution.save();
    sendToken(institution, 201, res, "Institution Registered Successfully!");
  });
// Login an institution
export const loginInstitution = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password!", 400));
  }

  const institution = await Institution.findOne({ email }).select("+password");

  if (!institution) {
    return next(new ErrorHandler("Invalid Email or Password!", 400));
  }

  const isPasswordMatched = await institution.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password!", 400));
  }

  sendToken(institution, 200, res, "Institution Logged In Successfully!");
});

// Logout an institution
export const logoutInstitution = catchAsyncErrors(async (req, res, next) => {
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

// Reuse the postMaterial 
export const postMaterial = postMaterial;

// Get my materials
export const getMyMaterials=getMyMaterials;
// Post a new admission
export const postAdmission = catchAsyncErrors(async (req, res, next) => {
  const { name, age, grade, institutionId } = req.body;

  const newAdmission = new Admission({ name, age, grade, institution: institutionId });

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

// Get admission enquiries for the authenticated institution
export const getAdmissionEnquiry = catchAsyncErrors(async (req, res, next) => {
  const admissions = await Admission.find({ institution: req.user.id });
  res.status(200).json({
    success: true,
    admissions,
  });
});

// Get a specific admission enquiry by ID for the authenticated institution
export const getAdmissionEnquiryById = catchAsyncErrors(async (req, res, next) => {
  const admission = await Admission.findOne({ _id: req.params.id, institution: req.user.id });
  if (!admission) {
    return next(new ErrorHandler("Admission enquiry not found!", 404));
  }
  res.status(200).json({
    success: true,
    admission,
  });
});

// Get institution profile
export const getInstitutionProfile = catchAsyncErrors(async (req, res, next) => {
  const institution = await Institution.findById(req.user.id);
  res.status(200).json({
    success: true,
    institution,
  });
});




// Update institution profile
export const updateInstitutionProfile = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.user; // Assuming req.user.id contains the institution's ID

  const updatedInstitution = await Institution.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
    success: true,
    institution: updatedInstitution,
    message: "Profile Updated!",
  });
});


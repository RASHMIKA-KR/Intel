import Center from '../models/centerSchema.js';
import { getAllMaterials, getMaterialById, getMyMaterials, postMaterial,deleteSingleMaterial } from './materialController.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import cloudinary from "cloudinary";
import { getAdmissionEnquiryById,getAllAdmissionEnquiries,changeEnquiryStatus } from './admissionEnquiryController.js';
import {postVacancy,updatevacancy,deleteVacancy,getVacanciesByMe,getVacancyById} from '../controllers/vacancyController.js';
import {getVacancyEnquiryById,getAllVacancyEnquiries,changeVacancyEnquiryStatus} from '../controllers/vacancyEnquiryController.js';

// Register a new center with image upload
export const registerCenter = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    password,
    centerType,
    address,
    phone,
    description,
  } = req.body;

  // Check if any required fields are missing
  const requiredFields = ['name', 'email', 'password', 'address', 'centerType', 'phone', 'description'];
  const missingFields = requiredFields.filter(field => !req.body[field]);
  if (missingFields.length > 0) {
    return next(new ErrorHandler(`Missing required fields: ${missingFields.join(', ')}`, 400));
  }

  // Check if there are any images uploaded
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Images Required!", 400));
  }

  // Validate image format
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  const { image } = req.files;
  if (!allowedFormats.includes(image.mimetype)) {
    return next(new ErrorHandler(`Invalid image format: ${image.mimetype}. Please upload PNG, JPEG, or WEBP.`, 400));
  }

  // Upload image to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath);
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary error");
    return next(new ErrorHandler("Failed to upload image to Cloudinary", 500));
  }
  const { secure_url: imageUrl, public_id: imagePublicId } = cloudinaryResponse;

  // Check if the user already exists
  const existingUser = await Center.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("Center already applied!", 400));
  }

  try {
    // Save center details with uploaded images and pending status
    const center = new Center({
      name,
      email,
      password,
      centerType,
      address,
      phone,
      description,
      image: {
        url: imageUrl,
        public_id: imagePublicId,
      },
      status: "Pending", // Initial status for approval
    });

    await center.save();
    res.status(201).json({
      success: true,
      message: "Center Registration Pending Approval",
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message || "Failed to register center", 500));
  }
});// Login a center
export const loginCenter = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password!", 400));
  }

  const center = await Center.findOne({ email }).select("+password");

  if (!center) {
    return next(new ErrorHandler("Invalid Email or Password!", 400));
  }
  if (center.status !== "Approved") {
    return next(new ErrorHandler("Center is not approved yet!", 403));
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

export const allPostedMaterials = catchAsyncErrors(async (req, res, next) => {
  await getAllMaterials(req, res, next);
});

export const postedMaterialById = catchAsyncErrors(async (req, res, next) => {
  await getMaterialById(req, res, next);
});

export const materialsPostedByMe = catchAsyncErrors(async (req, res, next) => {
  await getMyMaterials(req, res, next);
});

export const newMaterialPost = catchAsyncErrors(async (req, res, next) => {
  await postMaterial(req, res, next);
});

export const deletetheMaterial=catchAsyncErrors(async(req,res,next)=>{
  await deleteMaterial(req,res,next);
});

// Post a new admission
export const postNewAdmission = catchAsyncErrors(async (req, res, next) => {
  req.body.center = req.user.centerId;  // Ensure the admission is linked to the center
  await createAdmission(req, res, next);
});

// Get all admissions
export const getPostedAdmissions = catchAsyncErrors(async (req, res, next) => {
  await getMyAdmissions(req,res,next);

});

// Get admission by ID
export const getSingleAdmission = catchAsyncErrors(async (req, res, next) => {
  await getAdmissionById(req, res, next);
});

export const updatetheAdmission=catchAsyncErrors(async(req,res,next)=>{
  await updateAdmission(req,res,next);
});

export const deletetheAdmission=catchAsyncErrors(async(req,res,next)=>{
  await deleteAdmission(req,res,next);
});

// Get admission enquiries for the authenticated center
export const getEveryAdmissionEnquiry = catchAsyncErrors(async (req, res, next) => {
  await getAllAdmissionEnquiries(req,res,next);
});

// Get a specific admission enquiry by ID for the authenticated center
export const getSingleAdmissionEnquiry = catchAsyncErrors(async (req, res, next) => {
  await getAdmissionEnquiryById(req,res,next);
});

export const updateStatusOfEnquiry=catchAsyncErrors(async(req,res,next)=>{
  await changeEnquiryStatus(req,res,next);
});

export const UpdateVacancy=catchAsyncErrors(async(req,res,next)=>{
  await updatevacancy(req,res,next);
});

export const DelVacancy=catchAsyncErrors(async(req,res,next)=>{
  await deleteVacancy(req,res,next);
});

export const CreateVacancy=catchAsyncErrors(async(req,res,next)=>{
  req.body.postedByModel = 'Center';
  req.user.institutionId = req.user._id;  // Assuming req.user._id is the institution's ID
  await postVacancy(req, res, next);
});

export const getvacanciesbyMe = catchAsyncErrors(async (req, res, next) => {
  await getVacanciesByMe(req, res, next);
});
export const getvacancybyId = catchAsyncErrors(async (req, res, next) => {
  await getVacancyById(req, res, next);
});
// Get admission enquiries for the authenticated institution
export const getAllvEnquiries = catchAsyncErrors(async (req, res, next) => {
  await getAllVacancyEnquiries(req,res,next);
});

// Get a specific admission enquiry by ID for the authenticated institution
export const getvEnquiryById = catchAsyncErrors(async (req, res, next) => {
  await getVacancyEnquiryById(req,res,next);
});

export const updatevEnquiryStatus=catchAsyncErrors(async(req,res,next)=>{
  await changeVacancyEnquiryStatus(req,res,next);
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

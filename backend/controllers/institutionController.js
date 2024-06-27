import Institution from '../models/institutionSchema.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import cloudinary from "cloudinary";
import { createAdmission,deleteAdmission,getAdmissionById,getMyAdmissions, updateAdmission } from './admissionController.js';
import { changeEnquiryStatus, getAdmissionEnquiryById,getAllAdmissionEnquiries} from './admissionEnquiryController.js';
import { getAllMaterials, getMaterialById, getMyMaterials, postMaterial,deleteSingleMaterial } from './materialController.js';
import {postVacancy,updatevacancy,deleteVacancy,getVacanciesByMe} from '../controllers/vacancyController.js';
import {getVacancyEnquiryById,getAllVacancyEnquiries,changeVacancyEnquiryStatus,} from '../controllers/vacancyEnquiryController.js';
import { sendToken } from "../utils/jwtToken.js";
export const registerInstitution = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    password,
    address,
    phone,
    institutionType,
    website,
    description,
  } = req.body;

  // Check if any required fields are missing
  const requiredFields = ['name', 'email', 'password', 'address', 'phone', 'institutionType', 'website', 'description'];
  const missingFields = requiredFields.filter(field => !req.body[field]);
  if (missingFields.length > 0) {
    return next(new ErrorHandler(`Missing required fields: ${missingFields.join(', ')}`, 400));
  }
if (!req.files || Object.keys(req.files).length === 0) {
  return next(new ErrorHandler("Image Required!", 400));
}

const {image} = req.files;

// Validate image format
const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
if (!allowedFormats.includes(image.mimetype)) {
  return next(new ErrorHandler(`Invalid image format: ${image.mimetype}. Please upload PNG, JPEG, or WEBP.`, 400));
}

const cloudinaryResponse = await cloudinary.uploader.upload(
  image.tempFilePath
);

if (!cloudinaryResponse || cloudinaryResponse.error) {
  console.error(
    "Cloudinary Error:",
    cloudinaryResponse.error || "Unknown Cloudinary error"
  );
  return next(new ErrorHandler("Failed to upload image to Cloudinary", 500));
}
const { secure_url: imageUrl, public_id: imagePublicId } = cloudinaryResponse;
// Check if the user already exists
const existingUser = await Institution.findOne({ email });
if (existingUser) {
    return next(new ErrorHandler("Institution already aplied!", 400));
}
  try {
    // Save institution details with uploaded images and status
    const institution = new Institution({
      name,
      email,
      password,
      address,
      phone,
      institutionType,
      website,
      description,
      image: {
        url: imageUrl,
        public_id: imagePublicId,
      },
      status: "Pending", // Initial status for approval
    });

    await institution.save();
    res.status(201).json({
      success: true,
      message: "Institution Registration Pending Approval",
    });
  } catch (error) {
    console.error( error);
  }
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
  if (institution.status !== "Approved") {
    return next(new ErrorHandler("Institution is not approved yet!", 403));
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

export const AllPostedMaterials = catchAsyncErrors(async (req, res, next) => {
  await getAllMaterials(req, res, next);
});

export const PostedMaterialById = catchAsyncErrors(async (req, res, next) => {
  await getMaterialById(req, res, next);
});

export const MaterialsPostedByMe = catchAsyncErrors(async (req, res, next) => {
  await getMyMaterials(req, res, next);
});

export const NewMaterialPost = catchAsyncErrors(async (req, res, next) => {
  await postMaterial(req, res, next);
});

export const deletePostedMaterial=catchAsyncErrors(async(req,res,next)=>{
  await deleteSingleMaterial(req,res,next);
});

// Post a new admission
export const postAdmission = catchAsyncErrors(async (req, res, next) => {
  req.body.institution = req.user.institutionId;  // Ensure the admission is linked to the institution
  await createAdmission(req, res, next);

});

// Get all admissions posted by a particular institution
export const getAdmissionsByMe = catchAsyncErrors(async (req, res, next) => {
  await getMyAdmissions(req,res,next);
  });

// Get admission by ID
export const getOneAdmission = catchAsyncErrors(async (req, res, next) => {
  await getAdmissionById(req, res, next);

});

export const updatePostedAdmission=catchAsyncErrors(async(req,res,next)=>{
  await updateAdmission(req,res,next);
});
export const deletePostedAdmission=catchAsyncErrors(async(req,res,next)=>{
  await deleteAdmission(req,res,next);
});

// Get admission enquiries for the authenticated institution
export const getAllAdmissionEnquiry = catchAsyncErrors(async (req, res, next) => {
  await getAllAdmissionEnquiries(req,res,next);
});

// Get a specific admission enquiry by ID for the authenticated institution
export const getOneAdmissionEnquiry = catchAsyncErrors(async (req, res, next) => {
  await getAdmissionEnquiryById(req,res,next);
});

export const updateEnquiryStatus=catchAsyncErrors(async(req,res,next)=>{
  await changeEnquiryStatus(req,res,next);
});

export const Updatevacancy=catchAsyncErrors(async(req,res,next)=>{
  await updatevacancy(req,res,next);
});

export const delVacancy=catchAsyncErrors(async(req,res,next)=>{
  await deleteVacancy(req,res,next);
});

export const createVacancy=catchAsyncErrors(async(req,res,next)=>{
  req.body.postedByModel = 'Institution';
  req.user.institutionId = req.user._id;  // Assuming req.user._id is the institution's ID
  await postVacancy(req, res, next);
});

export const getvacanciesByMe = catchAsyncErrors(async (req, res, next) => {
  await getVacanciesByMe(req, res, next);
});

export const getvacancybyId = catchAsyncErrors(async (req, res, next) => {
  await getVacancyById(req, res, next);
});
export const getAllVEnquiries = catchAsyncErrors(async (req, res, next) => {
  await getAllVacancyEnquiries(req,res,next);
});

export const getVEnquiryById = catchAsyncErrors(async (req, res, next) => {
  await getVacancyEnquiryById(req,res,next);
});

export const updateVEnquiryStatus=catchAsyncErrors(async(req,res,next)=>{
  await changeVacancyEnquiryStatus(req,res,next);
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

// Get all materials
export { getAllMaterials };

// Get material by ID
export { getMaterialById };

// Post a new material
export { postMaterial };

// Get my materials
export { getMyMaterials };

import AdmissionEnquiry  from '../models/admissionEnquirySchema.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';

// Apply to admission
export const applyToAdmission = catchAsyncErrors(async (req, res, next) => {
  const { studentName, studentEmail, studentPhone, courseOfInterest, enquiryDetails } = req.body;
  const { id: admissionId } = req.params;

  const enquiry = await AdmissionEnquiry.create({
    studentName,
    studentEmail,
    studentPhone,
    admissionId,
    applicantId: req.user.id, // Assuming the user ID is available in req.user.id
    courseOfInterest,
    enquiryDetails,
  });

  res.status(201).json({
    success: true,
    data: enquiry,
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

// Get all submitted inquiries for a single admission
export const getAllAdmissionEnquiries = async (req, res, next) => {
  try {
    const { admissionId } = req.params;
    const enquiries = await AdmissionEnquiry.find({ admissionId });
    res.status(200).json({ success: true, enquiries });
  } catch (error) {
    next(error);
  }
};


// Change the status of an inquiry by the institution
export const changeEnquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const enquiry = await AdmissionEnquiry.findById(id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    enquiry.status = status;
    await enquiry.save();
    res.status(200).json({ success: true, message: 'Enquiry status updated successfully' });
  } catch (error) {
    next(error);
  }
};

// Get all admission enquiries submitted by the authenticated user
export const getMyAdmissionEnquiries = catchAsyncErrors(async (req, res, next) => {
  const enquiries = await AdmissionEnquiry.find({ applicantId: req.user.id });

  if (!enquiries || enquiries.length === 0) {
    return next(new ErrorHandler("No admission enquiries found!", 404));
  }

  res.status(200).json({
    success: true,
    data: enquiries,
  });
});
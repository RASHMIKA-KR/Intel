import VacancyEnquiry from '../models/vacancyEnquirySchema.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';

// Apply to vacancy
export const applyToVacancy = catchAsyncErrors(async (req, res, next) => {
  const { applicantName, applicantEmail, applicantPhone, positionOfInterest, enquiryDetails } = req.body;
  const { id: vacancyId } = req.params;

  const enquiry = await VacancyEnquiry.create({
    applicantName,
    applicantEmail,
    applicantPhone,
    vacancyId,
    applicantId: req.user.id, // Assuming the user ID is available in req.user.id
    positionOfInterest,
    enquiryDetails,
  });

  res.status(201).json({
    success: true,
    data: enquiry,
  });
});

// Get a specific vacancy enquiry by ID for the authenticated institution or center
export const getVacancyEnquiryById = catchAsyncErrors(async (req, res, next) => {
  const vacancyEnquiry = await VacancyEnquiry.findOne({
    _id: req.params.id,
    $or: [
      { institutionId: req.user.institutionId },
      { centerId: req.user.centerId }
    ]
  });

  if (!vacancyEnquiry) {
    return next(new ErrorHandler("Vacancy enquiry not found!", 404));
  }
  res.status(200).json({
    success: true,
    data: vacancyEnquiry,
  });
});

// Get all submitted inquiries for a single vacancy
export const getAllVacancyEnquiries = async (req, res, next) => {
  try {
    const { vacancyId } = req.params;
    const enquiries = await VacancyEnquiry.find({ vacancyId });
    res.status(200).json({ success: true, enquiries });
  } catch (error) {
    next(error);
  }
};

// Get all vacancy enquiries submitted by the authenticated teacher
export const getMyVacancyEnquiries = catchAsyncErrors(async (req, res, next) => {
  const enquiries = await VacancyEnquiry.find({ applicantId: req.user.id });

  if (!enquiries || enquiries.length === 0) {
    return next(new ErrorHandler("No vacancy enquiries found!", 404));
  }

  res.status(200).json({
    success: true,
    data: enquiries,
  });
});

// Change the status of an enquiry by the institution or center
export const changeVacancyEnquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const enquiry = await VacancyEnquiry.findById(id);
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

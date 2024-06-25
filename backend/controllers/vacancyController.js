// controllers/vacancyController.js
import Vacancy from '../models/vacancySchema.js';
import {catchAsyncErrors} from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';

// Post a new vacancy
export const postVacancy = catchAsyncErrors(async (req, res, next) => {
  const { title, description, postedByModel } = req.body;
  let posterId;

  if (postedByModel === 'Institution') {
    posterId = req.user.institutionId;
  } else if (postedByModel === 'Center') {
    posterId = req.user.centerId;
  } else {
    return next(new ErrorHandler('Invalid poster type', 400));
  }

  const vacancy = await Vacancy.create({
    title,
    description,
    [`${postedByModel.toLowerCase()}Id`]: posterId,
    postedByModel,
  });

  res.status(201).json({
    success: true,
    vacancy,
  });
});

// Update a vacancy
export const updatevacancy = catchAsyncErrors(async (req, res, next) => {
  let vacancy = await Vacancy.findById(req.params.id);

  if (!vacancy) {
    return next(new ErrorHandler('Vacancy not found', 404));
  }

  // Ensure the vacancy belongs to the authenticated institution or center
  if (
    (vacancy.postedByModel === 'Institution' && vacancy.institutionId.toString() !== req.user._id.toString()) ||
    (vacancy.postedByModel === 'Center' && vacancy.centerId.toString() !== req.user._id.toString())
  ) {
    return next(new ErrorHandler('Not authorized to access this vacancy', 403));
  }

  vacancy = await Vacancy.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    vacancy,
  });
});

// Delete a vacancy
export const deleteVacancy = catchAsyncErrors(async (req, res, next) => {
  const vacancy = await Vacancy.findById(req.params.id);

  if (!vacancy) {
    return next(new ErrorHandler('Vacancy not found', 404));
  }

  // Ensure the vacancy belongs to the authenticated institution or center
  if (
    (vacancy.postedByModel === 'Institution' && vacancy.institutionId.toString() !== req.user._id.toString()) ||
    (vacancy.postedByModel === 'Center' && vacancy.centerId.toString() !== req.user._id.toString())
  ) {
    return next(new ErrorHandler('Not authorized to access this vacancy', 403));
  }

  await vacancy.remove();

  res.status(200).json({
    success: true,
    message: 'Vacancy deleted successfully',
  });
});
// List all available vacancies
export const getAllVacancies = catchAsyncErrors(async (req, res, next) => {
  const vacancies = await Vacancy.find();
  
  if (vacancies.length === 0) {
    return next(new ErrorHandler("No vacancies available", 404));
  }

  res.status(200).json({
    success: true,
    data: vacancies,
  });
});

// Get a specific vacancy by ID
export const getVacancyById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const vacancy = await Vacancy.findById(id);

  if (!vacancy) {
    return next(new ErrorHandler("Vacancy not found!", 404));
  }

  res.status(200).json({
    success: true,
    data: vacancy,
  });
});

// List vacancies posted by a specific institution or center
export const getVacanciesByMe = catchAsyncErrors(async (req, res, next) => {
  const { institutionId, centerId } = req.user;
  let vacancies;

  if (institutionId) {
    vacancies = await Vacancy.find({ institutionId });
  } else if (centerId) {
    vacancies = await Vacancy.find({ centerId });
  } else {
    return next(new ErrorHandler("User is not associated with any institution or center", 403));
  }

  if (vacancies.length === 0) {
    return next(new ErrorHandler("No vacancies available for this poster", 404));
  }

  res.status(200).json({
    success: true,
    data: vacancies,
  });
});

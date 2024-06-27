import Admission from "../models/admissionSchema.js";
import ErrorHandler from "../middlewares/error.js";

// @desc    Get all admissions
export const getAllAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find();
    if (admissions.length === 0) {
      return res.status(404).json({ success: false, message: "No admissions available" });
    }
    res.status(200).json({ success: true, data: admissions });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get single admission by ID
export const getAdmissionById = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission) {
      throw new ErrorHandler("Admission not found", 404);
    }
    res.status(200).json({ success: true, data: admission });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Create new admission
export const createAdmission = async (req, res) => {
  try {
    const admission = await Admission.create(req.body);
    res.status(201).json({ success: true, data: admission });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update admission
export const updateAdmission = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!admission) {
      throw new ErrorHandler("Admission not found", 404);
    }
    res.status(200).json({ success: true, data: admission });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc  Delete admission
export const deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndDelete(req.params.id);
    if (!admission) {
      throw new ErrorHandler("Admission not found", 404);
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get admissions posted by specific institution
// @route   GET /api/admissions/my
// @access  Public
export const getMyAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find({ institution: req.user.institutionId });
    if (admissions.length === 0) {
      return res.status(404).json({ success: false, message: "No admissions available for your institution" });
    }
    res.status(200).json({ success: true, data: admissions });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


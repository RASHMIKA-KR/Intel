// controllers/adminController.js
import Student from '../models/studentSchema.js';
import {Teacher} from '../models/teacherSchema.js';
import Institution from '../models/institutionSchema.js';
import Center from '../models/centerSchema.js';

// Add a student
export const addStudent = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, student });
  } catch (error) {
    next(error);
  }
};

// Delete a student
export const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Add a teacher
export const addTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).json({ success: true, teacher });
  } catch (error) {
    next(error);
  }
};

// Delete a teacher
export const deleteTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }
    res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Add an institution
export const addInstitution = async (req, res, next) => {
  try {
    const institution = await Institution.create(req.body);
    res.status(201).json({ success: true, institution });
  } catch (error) {
    next(error);
  }
};

// Delete an institution
export const deleteInstitution = async (req, res, next) => {
  try {
    const institution = await Institution.findByIdAndDelete(req.params.id);
    if (!institution) {
      return res.status(404).json({ success: false, message: 'Institution not found' });
    }
    res.status(200).json({ success: true, message: 'Institution deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Add a center
export const addCenter = async (req, res, next) => {
  try {
    const center = await Center.create(req.body);
    res.status(201).json({ success: true, center });
  } catch (error) {
    next(error);
  }
};

// Delete a center
export const deleteCenter = async (req, res, next) => {
  try {
    const center = await Center.findByIdAndDelete(req.params.id);
    if (!center) {
      return res.status(404).json({ success: false, message: 'Center not found' });
    }
    res.status(200).json({ success: true, message: 'Center deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// List all pending institution registrations
export const listPendingInstitutions = async (req, res, next) => {
    try {
      const pendingInstitutions = await Institution.find({ status: 'Pending' });
      res.status(200).json({ success: true, data: pendingInstitutions });
    } catch (error) {
      next(error);
    }
  };
  // View a single institution registration
export const viewInstitutionRegistration = async (req, res, next) => {
    try {
      const { id } = req.params;
      const institution = await Institution.findById(id);
      if (!institution || institution.status !== 'Pending') {
        return res.status(404).json({ success: false, message: 'Institution registration not found' });
      }
      res.status(200).json({ success: true, data: institution });
    } catch (error) {
      next(error);
    }
  };
  
  // Approve an institution registration
  export const approveInstitutionRegistration = async (req, res, next) => {
    try {
      const { id } = req.params;
      const institution = await Institution.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });
      if (!institution || institution.status !== 'Pending') {
        return res.status(404).json({ success: false, message: 'Institution registration not found' });
      }
      res.status(200).json({ success: true, data: institution });
    } catch (error) {
      next(error);
    }
  };
  
  // Deny an institution registration
  export const denyInstitutionRegistration = async (req, res, next) => {
    try {
      const { id } = req.params;
      const institution = await Institution.findByIdAndUpdate(id, { status: 'Denied' }, { new: true });
      if (!institution || institution.status !== 'Pending') {
        return res.status(404).json({ success: false, message: 'Institution registration not found' });
      }
      res.status(200).json({ success: true, data: institution });
    } catch (error) {
      next(error);
    }
  };
   
  // List all pending center registrations
  export const listPendingCenters = async (req, res, next) => {
    try {
      const pendingCenters = await Center.find({ status: 'Pending' });
      res.status(200).json({ success: true, data: pendingCenters });
    } catch (error) {
      next(error);
    }
  };
  // View a single center registration
  export const viewCenterRegistration = async (req, res, next) => {
    try {
      const { id } = req.params;
      const center = await Center.findById(id);
      if (!center || center.status !== 'Pending') {
        return res.status(404).json({ success: false, message: 'Center registration not found' });
      }
      res.status(200).json({ success: true, data: center });
    } catch (error) {
      next(error);
    }
  };
  // Approve a center registration
export const approveCenterRegistration = async (req, res, next) => {
    try {
      const { id } = req.params;
      const center = await Center.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });
      if (!center || center.status !== 'Pending') {
        return res.status(404).json({ success: false, message: 'Center registration not found' });
      }
      res.status(200).json({ success: true, data: center });
    } catch (error) {
      next(error);
    }
  };
// Deny a center registration
export const denyCenterRegistration = async (req, res, next) => {
    try {
      const { id } = req.params;
      const center = await Center.findByIdAndUpdate(id, { status: 'Denied' }, { new: true });
      if (!center || center.status !== 'Pending') {
        return res.status(404).json({ success: false, message: 'Center registration not found' });
      }
      res.status(200).json({ success: true, data: center });
    } catch (error) {
      next(error);
    }
  };
    
  
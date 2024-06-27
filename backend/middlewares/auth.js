import jwt from 'jsonwebtoken';
import ErrorHandler from './error.js';
import Student from '../models/studentSchema.js';
import Teacher from '../models/teacherSchema.js';
import Institution from '../models/institutionSchema.js';
import Center from '../models/centerSchema.js';
import Admin from '../models/adminSchema.js';

export const authenticateStudent = async (req, res, next) => {
  const { authToken } = req.cookies;

  if (!authToken) {
    return res.status(401).json({ message: 'No token found. You are not authorized to access this page.' });
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    console.log('Token decoded:', decoded);

    const student = await Student.findById(decoded.id);
    if (!student) {
      console.log(`Student not found for ID: ${decoded.id}`);
      return res.status(404).json({ message: 'Student not found' });
    }

    req.student = student;
    next();
  } catch (error) {
    console.log(`Authentication error: ${error.message}`);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const authenticateTeacher = async (req, res, next) => {
  const { authToken } = req.cookies;

  if (!authToken) {
    return res.status(401).json({ message: 'No token found. You are not authorized to access this page.' });
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    console.log('Token decoded:', decoded);

    const teacher = await Teacher.findById(decoded.id);
    if (!teacher) {
      console.log(`Teacher not found for ID: ${decoded.id}`);
      return res.status(404).json({ message: 'Teacher not found' });
    }

    req.teacher = teacher;
    next();
  } catch (error) {
    console.log(`Authentication error: ${error.message}`);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const authenticateInstitution = async (req, res, next) => {
  const { authToken } = req.cookies;

  if (!authToken) {
    return res.status(401).json({ message: 'No token found. You are not authorized to access this page.' });
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    console.log('Token decoded:', decoded);

    const institution = await Institution.findById(decoded.id);
    if (!institution) {
      console.log(`Institution not found for ID: ${decoded.id}`);
      return res.status(404).json({ message: 'Institution not found' });
    }

    req.institution = institution;
    next();
  } catch (error) {
    console.log(`Authentication error: ${error.message}`);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const authenticateCenter = async (req, res, next) => {
  const { authToken } = req.cookies;

  if (!authToken) {
    return res.status(401).json({ message: 'No token found. You are not authorized to access this page.' });
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    console.log('Token decoded:', decoded);

    const center = await Center.findById(decoded.id);
    if (!center) {
      console.log(`Center not found for ID: ${decoded.id}`);
      return res.status(404).json({ message: 'Center not found' });
    }

    req.center = center;
    next();
  } catch (error) {
    console.log(`Authentication error: ${error.message}`);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const authenticateAdmin = async (req, res, next) => {
  const { authToken } = req.cookies;

  if (!authToken) {
    return res.status(401).json({ message: 'No token found. You are not authorized to access this page.' });
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    console.log('Token decoded:', decoded);

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      console.log(`Admin not found for ID: ${decoded.id}`);
      return res.status(404).json({ message: 'Admin not found' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.log(`Authentication error: ${error.message}`);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

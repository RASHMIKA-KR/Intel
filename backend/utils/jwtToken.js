import Student from '../models/studentSchema.js';
import {Teacher} from '../models/teacherSchema.js';
import Institution from '../models/institutionSchema.js';
import Center from '../models/centerSchema.js';
import {Admin} from '../models/adminSchema.js'; // MongoDB model for Admin

export const sendToken = (user, statusCode, res, message) => {
  let token;

  if (user instanceof Student || user instanceof Teacher || user instanceof Institution || user instanceof Center || user instanceof Admin) {
    token = user.getJWTToken();
  } else {
    throw new Error('Unsupported user type');
  }

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Set httpOnly to true
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};

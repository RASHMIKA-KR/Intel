// auth.js
import { Student } from "../models/studentSchema.js";
import { Teacher } from "../models/teacherSchema.js";
import { Institution } from "../models/institutionSchema.js";
import { Center } from "../models/centerSchema.js";
import { Admin } from "../models/adminSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// Middleware to check if user is authenticated
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  let user;
  switch (decoded.type) {
    case "student":
      user = await Student.findById(decoded.id);
      break;
    case "teacher":
      user = await Teacher.findById(decoded.id);
      break;
    case "institution":
      user = await Institution.findById(decoded.id);
      break;
    case "center":
      user = await Center.findById(decoded.id);
      break;
    case "admin":
      user = await Admin.findById(decoded.id);
      break;
    default:
      return next(new ErrorHandler("Invalid User Type", 400));
  }

  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  req.user = user;

  next();
});

// Middleware to authorize roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

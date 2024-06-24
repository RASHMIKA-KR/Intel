import Material from '../models/materialSchema.js';
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import cloudinary from 'cloudinary';

// Post new learning material
export const postLearningMaterial = catchAsyncErrors(async (req, res, next) => {
    const { title, description, category, uploadedByModel } = req.body;
    
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("File Required!", 400));
    }

    const { file } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp", "video/mp4", "application/pdf"];
    if (!allowedFormats.includes(file.mimetype)) {
        return next(new ErrorHandler("Invalid file type. Please upload a valid file.", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(file.tempFilePath);
    
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary error");
        return next(new ErrorHandler("Failed to upload file to Cloudinary", 500));
    }

    const newMaterial = new Material({
        title,
        description,
        category,
        file: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
        uploadedBy: req.user._id,
        uploadedByModel
    });

    await newMaterial.save();

    res.status(201).json({
        success: true,
        material: newMaterial,
    });
});

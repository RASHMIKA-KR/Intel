import Material from '../models/materialSchema.js';
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import cloudinary from 'cloudinary';

// Get all materials
export const getAllMaterials = catchAsyncErrors(async (req, res, next) => {
    const materials = await Material.find();
    res.status(200).json({
        success: true,
        materials,
    });
});

// Get materials uploaded by the current user
export const getMyMaterials = catchAsyncErrors(async (req, res, next) => {
    const myMaterials = await Material.find({ uploadedBy: req.user._id });
    res.status(200).json({
        success: true,
        myMaterials,
    });
});

// Get material by ID
export const getMaterialById = catchAsyncErrors(async (req, res, next) => {
    const material = await Material.findById(req.params.id);
    if (!material) {
        return next(new ErrorHandler("Material not found", 404));
    }
    res.status(200).json({
        success: true,
        material,
    });
});

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

import Material from '../models/materialSchema.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import PdfDetails from '../models/PdfDetailsSchema.js'
import express from 'express';
import multer from 'multer';
import path from 'path';
// Get all materials
export const getAllMaterials = catchAsyncErrors(async (req, res, next) => {
  const materials = await Material.find();

  if (!materials || materials.length === 0) {
    return next(new ErrorHandler("No materials available", 404));
  }

  res.status(200).json({
    success: true,
    materials,
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
  // Get materials uploaded by the current user
export const getMyMaterials = catchAsyncErrors(async (req, res, next) => {
    const myMaterials = await Material.find({ uploadedBy: req.user._id });
    if (!myMaterials || myMaterials.length === 0) {
      return next(new ErrorHandler("No materials available", 404));
    }
    res.status(200).json({
        success: true,
        myMaterials,
    });
  });
  export const postMaterial = async (req, res, next) => {
    const { name, description, materialType, uploadedBy, schoolOrCollege, domain, title } = req.body;
  
    try {
      let pdfTitle, pdf, pdfFilename;
      
      // Handle PDF upload if exists
      if (req.file && req.file.mimetype === 'application/pdf') {
        pdfTitle = title; // Use title from request body
        pdfFilename = req.file.originalname;
        pdf = req.file.filename; // Assuming you store file path or URL here
      }
  
      // Save to MongoDB using your Material model (adjust this to your actual model)
      const newMaterial = await Material.create({
        name,
        description,
        materialType,
        pdfTitle,
        pdf,
        pdfFilename,
        uploadedBy,
        schoolOrCollege,
        domain,
        createdAt: Date.now(),
      });
  
      res.status(201).json({
        success: true,
        material: newMaterial,
      });
    } catch (error) {
      next(error); // Pass error to the error handling middleware
    }
  };
  

import fs from 'fs';

export const deleteSingleMaterial = async (req, res, next) => {
  try {
    const materialId = req.params.id; // Assuming the material ID is passed in the request params

    // Find the material by ID
    const material = await Material.findById(materialId);

    if (!material) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }

    // Check if the user has permission to delete the material
    if (material.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    // Delete files associated with the material
    for (const file of material.files) {
      // Delete the file from the filesystem
      fs.unlinkSync(file.url);
    }

    // Delete the material from the database
    await Material.findByIdAndDelete(materialId);

    res.status(200).json({ success: true, message: 'Material deleted successfully' });
  } catch (error) {
    next(error);
  }
};

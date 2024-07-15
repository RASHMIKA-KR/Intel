import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the material name'],
    minLength: [3, 'Name must be at least 3 characters'],
    maxLength: [100, 'Name cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please enter a description'],
    minLength: [10, 'Description must be at least 10 characters'],
    maxLength: [500, 'Description cannot exceed 500 characters'],
  },
  materialType: {
    type: String,
    required: [true, 'Please specify the material type'],
    enum: ['Learning', 'Other'],
  },
  pdfTitle: {
    type: String,
    required: true 
  },
  pdf: {
    type: String,
    required: true  // Assuming you store the file path or URL here
  },
  pdfFilename: {
    type: String,
    required: true 
  },
  uploadedBy: {
    type: String,
    enum: ['Instructor', 'Institution', 'Center'],
    required: true,
  },
  schoolOrCollege: {
    type: String,
    enum: ['School', 'College'], // Adjust enum values as needed
  },
  domain: {
    type: String,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Material = mongoose.model('Material', materialSchema);

export default Material;

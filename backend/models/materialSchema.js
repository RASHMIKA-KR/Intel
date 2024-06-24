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
  files: [
    {
      url: {
        type: String,
        required: true,
      },
      format: {
        type: String,
        required: true,
        enum: ['PDF', 'Text', 'Video', 'Audio', 'Picture'],
      },
    },
  ],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'uploadedByModel',
    required: true,
  },
  uploadedByModel: {
    type: String,
    enum: ['Instructor', 'Institution', 'Center'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

materialSchema.index({ name: 'text', description: 'text' });

const Material = mongoose.model('Material', materialSchema);

export default Material;
import mongoose from 'mongoose';

const PdfDetailsSchema = new mongoose.Schema(
  {
    pdf: { type: String, required: true },
    title: { type: String, required: true },
    filename: { type: String, required: true } // Add filename property
  },
  { collection: 'PdfDetails' }
);

const PdfDetails = mongoose.model('PdfDetails', PdfDetailsSchema);

export default PdfDetails;

// AdmissionForm.jsx
import  { useState } from 'react';
import axios from 'axios';

const InstitutionAdmission = () => {
    const [formData, setFormData] = useState({
        postedBy: '', // This will be a dropdown with options 'Institution' and 'Center'
        coursesAvailable: [],
        feesStructure: 0,
        lastDateToApply: '',
        insName:'',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:4000/api/institution/postAdmission', formData);
          console.log('New admission created:', response.data.data);
          // Optionally, update state or show success message
        } catch (error) {
          console.error('Error creating admission:', error);
          // Handle errors, show error message
        }
      };
  return (
    <div>
      <h2>Create New Admission</h2>
      <form onSubmit={handleSubmit}>
      <label>
        <br></br>
  Posted By:<br></br>
  <select name="postedBy" value={formData.postedBy} onChange={handleChange}>
    <option value="">Select Posted By</option>
    <option value="Institution">Institution</option>
    <option value="Center">Center</option>
  </select>
</label>
Institution Name: 
<input type="text" name="insName" value={formData.insName} onChange={handleChange} />
<label>
    <br></br>

          Courses Available:
          <input type="text" name="coursesAvailable" value={formData.coursesAvailable} onChange={handleChange} />
        </label>
        <br />
        <label>
          Fees Structure:
          <input type="number" name="feesStructure" value={formData.feesStructure} onChange={handleChange} />
        </label>
        <br />
        <label>
          Last Date To Apply:
          <input type="date" name="lastDateToApply" value={formData.lastDateToApply} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Create Admission</button>
      </form>
    </div>
  );
};

export default InstitutionAdmission;

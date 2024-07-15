import { useState } from 'react';
import axios from 'axios';
// Check the exact cookie name set by your server
import Cookies from 'js-cookie';
const authToken = Cookies.get('token'); 
console.log('Token:', authToken); // Ensure token is not undefined

const TeacherUploadMaterial = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    materialType: '',
    uploadedBy: 'Instructor', // Default value
    schoolOrCollege: '',
    domain: '',
    title: '',
    pdf: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, pdf: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('materialType', formData.materialType);
    data.append('uploadedBy', formData.uploadedBy);
    data.append('schoolOrCollege', formData.schoolOrCollege);
    data.append('domain', formData.domain);
    data.append('title', formData.title);
    data.append('file', formData.pdf);

    try {
      const response = await axios.post('http://localhost:4000/api/teacher/postMaterial', data, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Material uploaded successfully!');
      } else {
        alert('Error uploading material');
      }
    } catch (error) {
      console.error('Error uploading material:', error);
      alert('Error uploading material');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <br></br>
        <h1>Upload a Material</h1>
        <br></br>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <input type="text" name="materialType" placeholder="Material Type" value={formData.materialType} onChange={handleChange} required />
      <select name="uploadedBy" value={formData.uploadedBy} onChange={handleChange} required>
        <option value="Teacher">Instructor</option>
        <option value="Institution">Institution</option>
        <option value="Center">Center</option>
      </select>
      <input type="text" name="schoolOrCollege" placeholder="School or College" value={formData.schoolOrCollege} onChange={handleChange} required />
      <input type="text" name="domain" placeholder="Domain" value={formData.domain} onChange={handleChange} required />
      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <input type="file" name="file" accept="application/pdf" onChange={handleFileChange} required />
      <button type="submit">Upload Material</button>
      <br></br>
    </form>
  );
};

export default TeacherUploadMaterial;

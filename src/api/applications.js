import axios from 'axios';

const API_URL = 'http://localhost:8081/api/application';

export const applyForInternship = async (studentId, internshipId, formData) => {
  const response = await axios.post(
    `${API_URL}/${studentId}/apply/${internshipId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const getApplicationStatus = async (studentId) => {
  const response = await axios.get(`${API_URL}/status/${studentId}`);
  return response.data;
};

export const getApplicants = async (internshipId) => {
  const response = await axios.get(`${API_URL}/internship/${internshipId}/applicants`);
  return response.data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const response = await axios.put(`${API_URL}/${applicationId}/status`, { status });
  return response.data;
};
import axios from 'axios';

const API_URL = 'http://localhost:8081/api/recruiter';

export const getAllInternships = async () => {
  const response = await axios.get(`${API_URL}/public/internships`);
  return response.data;
};

export const getInternshipById = async (id) => {
  const response = await axios.get(`${API_URL}/public/internships/${id}`);
  return response.data;
};

export const searchInternships = async (keyword) => {
  const response = await axios.get(`${API_URL}/public/internships/search?q=${keyword}`);
  return response.data;
};

export const postInternship = async (recruiterId, internshipData) => {
  const response = await axios.post(`${API_URL}/${recruiterId}/internships`, internshipData);
  return response.data;
};

export const deleteInternship = async (recruiterId, internshipId) => {
  const response = await axios.delete(`${API_URL}/${recruiterId}/internships/${internshipId}`);
  return response.data;
};
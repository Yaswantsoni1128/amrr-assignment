import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API endpoints
export const itemsAPI = {
  // Get all items
  getAll: () => api.get('/items'),
  
  // Get single item by ID
  getById: (id) => api.get(`/items/${id}`),
  
  // Create new item with form data (for file upload)
  create: (formData) => {
    return api.post('/items', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Update item
  update: (id, formData) => {
    return api.put(`/items/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Delete item
  delete: (id) => api.delete(`/items/${id}`),
  
  // Send enquiry
  sendEnquiry: (id, enquiryData) => {
    return api.post(`/enquiry/${id}`, enquiryData);
  },
  
  // Seed database (for development)
  seed: () => api.post('/seed'),
};

// Utility function to get image URL
export const getImageUrl = (filename) => {
  if (!filename) return '/placeholder-image.svg';
  return `${API_BASE_URL.replace('/api', '')}/uploads/${filename}`;
};

// Health check
export const healthCheck = () => api.get('/health');

export default api; 
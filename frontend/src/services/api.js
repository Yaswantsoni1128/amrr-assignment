import axios from 'axios';

const API_BASE_URL = import.meta.env.API_URL || 'https://amrr-assignment-1.onrender.com/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Enhanced error handler with async/await
const handleApiCall = async (apiCall) => {
  try {
    const response = await apiCall;
    return response;
  } catch (error) {
    console.error('API Error:', error);
    
    if (error.message === 'Request timeout') {
      throw new Error('Request timed out. Please check your connection and try again.');
    }
    
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 'An error occurred';
      throw new Error(message);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Unable to connect to server. Please check your connection.');
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

// API endpoints with async/await
export const itemsAPI = {
  // Get all items
  getAll: async () => {
    return await handleApiCall(api.get('/items'));
  },
  
  // Get single item by ID
  getById: async (id) => {
    if (!id) throw new Error('Item ID is required');
    return await handleApiCall(api.get(`/items/${id}`));
  },
  
  // Create new item with form data (for file upload)
  create: async (formData) => {
    if (!formData) throw new Error('Form data is required');
    
    return await handleApiCall(
      api.post('/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    );
  },
  
  // Update item
  update: async (id, formData) => {
    if (!id) throw new Error('Item ID is required');
    if (!formData) throw new Error('Form data is required');
    
    return await handleApiCall(
      api.put(`/items/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    );
  },
  
  // Delete item
  delete: async (id) => {
    if (!id) throw new Error('Item ID is required');
    return await handleApiCall(api.delete(`/items/${id}`));
  },
  
  // Send enquiry
  sendEnquiry: async (id, enquiryData) => {
    if (!id) throw new Error('Item ID is required');
    if (!enquiryData) throw new Error('Enquiry data is required');
    
    return await handleApiCall(api.post(`/enquiry/${id}`, enquiryData));
  },
  
  // Seed database (for development)
  seed: async () => {
    return await handleApiCall(api.post('/seed'));
  },
};

// Utility function to get image URL
export const getImageUrl = (filename) => {
  if (!filename) return '/placeholder-image.svg';
  return `${API_BASE_URL.replace('/api', '')}/uploads/${filename}`;
};

// Health check with async/await
export const healthCheck = async () => {
  return await handleApiCall(api.get('/health'));
};

// Test API connection
export const testConnection = async () => {
  try {
    await healthCheck();
    return { success: true, message: 'Connected to API successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export default api; 
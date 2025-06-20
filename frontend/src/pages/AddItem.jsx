import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { itemsAPI } from '../services/api';
import Toast from '../components/Toast';

const AddItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    coverImage: null,
    additionalImages: []
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [formProgress, setFormProgress] = useState(0);

  const itemTypes = ['Shirt', 'Pant', 'Shoes', 'Sports Gear', 'Other'];

  // Calculate form progress
  useState(() => {
    const fields = [formData.name, formData.type, formData.description, formData.coverImage];
    const filledFields = fields.filter(field => field).length;
    setFormProgress((filledFields / fields.length) * 100);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({
        ...prev,
        coverImage: file
      }));
    } else if (file) {
      showToast('Please select a valid image file', 'error');
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      showToast('Some files were skipped. Please select only image files.', 'warning');
    }

    if (imageFiles.length + formData.additionalImages.length > 5) {
      showToast('Maximum 5 additional images allowed', 'error');
      return;
    }

    setFormData(prev => ({
      ...prev,
      additionalImages: [...prev.additionalImages, ...imageFiles]
    }));
  };

  const removeAdditionalImage = (index) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index)
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      showToast('Please drop image files only', 'error');
      return;
    }

    if (!formData.coverImage && imageFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        coverImage: imageFiles[0],
        additionalImages: [...prev.additionalImages, ...imageFiles.slice(1, 6)]
      }));
    } else {
      const remainingSlots = 5 - formData.additionalImages.length;
      const filesToAdd = imageFiles.slice(0, remainingSlots);
      
      setFormData(prev => ({
        ...prev,
        additionalImages: [...prev.additionalImages, ...filesToAdd]
      }));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showToast('Item name is required', 'error');
      return false;
    }
    if (!formData.type) {
      showToast('Item type is required', 'error');
      return false;
    }
    if (!formData.description.trim()) {
      showToast('Item description is required', 'error');
      return false;
    }
    if (!formData.coverImage) {
      showToast('Cover image is required', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name.trim());
      submitData.append('type', formData.type);
      submitData.append('description', formData.description.trim());
      submitData.append('coverImage', formData.coverImage);
      
      formData.additionalImages.forEach((file) => {
        submitData.append('additionalImages', file);
      });

      await itemsAPI.create(submitData);
      
      showToast('Item successfully added!', 'success');
      
      // Reset form
      setFormData({
        name: '',
        type: '',
        description: '',
        coverImage: null,
        additionalImages: []
      });

      // Redirect to view items after a short delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error('Failed to add item:', error);
      const errorMessage = error.response?.data?.message || 'Failed to add item. Please try again.';
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  };

  const closeToast = () => {
    setToast(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
          Add New Item
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Fill in the details below to add a new item to your collection
        </p>
        
        {/* Progress Bar */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(formProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${formProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8 border border-gray-200/50">
        {/* Item Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="flex items-center text-sm font-semibold text-gray-700">
            <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Item Name <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
            placeholder="Enter a catchy item name"
            required
          />
        </div>

        {/* Item Type */}
        <div className="space-y-2">
          <label htmlFor="type" className="flex items-center text-sm font-semibold text-gray-700">
            <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Item Type <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
            required
          >
            <option value="">Choose item category</option>
            {itemTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Item Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-700">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Item Description <span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none bg-white/50"
            placeholder="Describe your item in detail - what makes it special?"
            required
          />
          <div className="text-xs text-gray-500 text-right">
            {formData.description.length}/500 characters
          </div>
        </div>

        {/* Cover Image */}
        <div className="space-y-4">
          <label className="flex items-center text-sm font-semibold text-gray-700">
            <svg className="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Cover Image <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
              className="hidden"
              id="cover-image"
              required={!formData.coverImage}
            />
            <label
              htmlFor="cover-image"
              className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer group"
            >
              <div className="text-center">
                <svg className="w-12 h-12 text-gray-400 group-hover:text-blue-500 mx-auto mb-4 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <p className="text-gray-600 group-hover:text-blue-600 font-medium transition-colors duration-200">
                  {formData.coverImage ? 'Change cover image' : 'Upload cover image'}
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
              </div>
            </label>
            
            {formData.coverImage && (
              <div className="relative inline-block group">
                <img
                  src={URL.createObjectURL(formData.coverImage)}
                  alt="Cover preview"
                  className="w-40 h-40 object-cover rounded-xl border-4 border-white shadow-lg"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, coverImage: null }))}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Images */}
        <div className="space-y-4">
          <label className="flex items-center text-sm font-semibold text-gray-700">
            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Additional Images <span className="text-gray-500 text-xs">(Optional - Max 5)</span>
          </label>
          
          {/* Drag and Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              dragActive
                ? 'border-blue-500 bg-blue-50 scale-105'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <svg className={`w-16 h-16 mx-auto mb-4 transition-colors duration-300 ${
              dragActive ? 'text-blue-500' : 'text-gray-400'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-gray-600 mb-2 font-medium">
              {dragActive ? 'Drop images here!' : 'Drag and drop images here'}
            </p>
            <p className="text-gray-400 text-sm mb-4">or</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleAdditionalImagesChange}
              className="hidden"
              id="additional-images"
            />
            <label
              htmlFor="additional-images"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Choose Files
            </label>
          </div>

          {/* Image Previews */}
          {formData.additionalImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {formData.additionalImages.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Additional ${index + 1}`}
                    className="w-full h-24 object-cover rounded-xl border-4 border-white shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(index)}
                    className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                  >
                    ×
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Image {index + 1}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Section */}
        <div className="flex gap-4 pt-8 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 rounded-full animate-spin border-t-white mr-2"></div>
                Adding Item...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Item
              </>
            )}
          </button>
        </div>
      </form>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
};

export default AddItem; 
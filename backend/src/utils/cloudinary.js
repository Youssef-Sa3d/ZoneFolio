const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image to Cloudinary
 * @param {string} imageData - Base64 image data or file path
 * @param {string} folder - Cloudinary folder name
 * @param {string} publicId - Optional public ID for the image
 * @returns {Promise<string>} - Cloudinary image URL
 */
const uploadImage = async (imageData, folder = 'zonefolio', publicId = null) => {
  try {
    const uploadOptions = {
      folder: folder,
      resource_type: 'image',
      quality: 'auto',
      fetch_format: 'auto',
    };

    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    const result = await cloudinary.uploader.upload(imageData, uploadOptions);
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Public ID of the image to delete
 * @returns {Promise<boolean>} - Success status
 */
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
};

/**
 * Upload multiple images to Cloudinary
 * @param {Array} images - Array of image data objects {data, folder, publicId}
 * @returns {Promise<Array>} - Array of Cloudinary image URLs
 */
const uploadMultipleImages = async (images) => {
  try {
    const uploadPromises = images.map(({ data, folder, publicId }) => 
      uploadImage(data, folder, publicId)
    );
    
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Multiple images upload error:', error);
    throw new Error('Failed to upload multiple images to Cloudinary');
  }
};

module.exports = {
  uploadImage,
  deleteImage,
  uploadMultipleImages,
  cloudinary
};
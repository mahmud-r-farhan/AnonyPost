import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
  },
  url: {
    secure: true
  }
});

export const getOptimizedImageUrl = (imageUrl, width = 800) => {
  if (!imageUrl) return null;
  
  // Check if it's already a Cloudinary URL
  if (imageUrl.includes('cloudinary.com')) {
    return imageUrl;
  }
  
  return cld.image(imageUrl)
    .format('auto')
    .quality('auto')
    .resize({
      width: width,
      crop: 'scale'
    })
    .toURL();
};

export const getImagePublicId = (imageUrl) => {
  if (!imageUrl) return null;
  const parts = imageUrl.split('/');
  const filename = parts[parts.length - 1];
  return filename.split('.')[0];
};


import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = () => {
  return {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
  };
};

cloudinary.config(cloudinaryConfig());
export default cloudinary;

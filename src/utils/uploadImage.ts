import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
export async function uploadImage(image: string) {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.COUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Upload an image

  try {
    const uploadResult = await cloudinary.uploader.upload(image);
    const { url } = uploadResult as UploadApiResponse;
    return { url, error: null };
  } catch (error) {
    return { url: null, error: (error as Error).message };
  }
}

import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.COUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Upload an image

  try {
    const { image } = await request.json();
    if (!image) throw new Error("Please provide a valid image");

    const uploadResult = await cloudinary.uploader.upload(image);
    const { url } = uploadResult as UploadApiResponse;
    return NextResponse.json({ url, error: null });
  } catch (error) {
    return NextResponse.json(
      { url: null, error: (error as Error).message },
      { status: 400 }
    );
  }
}

import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";


cloudinary.config({
  cloud_name: "di9cgiman",
  api_key: "366438782383459",
  api_secret: "tUxt0VXSRhEbTBCgRkSROrAyhDQ",
});

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded." }, { status: 400 });
    }

    const uploads = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "portfolio_uploads", resource_type: "auto" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          uploadStream.end(buffer);
        });

        return result.secure_url;
      })
    );

    return NextResponse.json({ message: "Files uploaded to Cloudinary", urls: uploads });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

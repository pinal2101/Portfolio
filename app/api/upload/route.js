
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: 'di9cgiman',
     api_key: '366438782383459',
     api_secret: 'tUxt0VXSRhEbTBCgRkSROrAyhDQ',
});

export async function POST(req) {
  try {
    const { file } = await req.json();

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
    }

    const base64Data = file.replace(/^data:.*;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "portfolio_uploads", resource_type: "auto" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    return new Response(JSON.stringify({ url: uploadResult.secure_url }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

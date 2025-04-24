import { NextResponse } from "next/server";
 import connectMongoDB from "../../../editTopic/[id]/libs/mongodb";
 import Topic from "../../../editTopic/[id]/libs/models/topic";
 import cloudinary from "../../../editTopic/[id]/libs/cloudinary";
 
 // Optional: Upload helper if you want to upload new invoices
 async function uploadToCloudinary(file) {
   const arrayBuffer = await file.arrayBuffer();
   const buffer = Buffer.from(arrayBuffer);
 
   return new Promise((resolve, reject) => {
     cloudinary.uploader.upload_stream({ folder: "client_invoices" }, (error, result) => {
       if (error) return reject(error);
       resolve(result.secure_url);
     }).end(buffer);
   });
 }
 
 //  PUT - Update topic
 export async function PUT(request, context ) {
  //  const { params } = context;
  //    const { id } = params;
  const { id } = context.params;
   try {
     await connectMongoDB();
    //  const { params } = context;
    //  const { id } = params;
 
     const {
       projectname,
       websitelink,
       technology,
       description,
       pagebuilder,
       clientname,
       clientinvoices, // This should be array of URLs (already uploaded or new)
       bidplatform,
       bidplatformURL,
       invoiceamount,
       projectstartdate,
       completiondate,
       testimonials
     } = await request.json();
 
     const updatedTopic = await Topic.findByIdAndUpdate(
       id,
       {
         projectname,
         websitelink,
         technology,
         description,
         pagebuilder,
         clientname,
         clientinvoices, // Should be an array of Cloudinary URLs
         bidplatform,
         bidplatformURL,
         invoiceamount,
         projectstartdate,
         completiondate,
         testimonials,
       },
       { new: true, runValidators: true }
     );
 
     if (!updatedTopic) {
       return NextResponse.json({ error: "Topic not found" }, { status: 404 });
     }
 
     return NextResponse.json({ message: "Topic updated", topic: updatedTopic }, { status: 200 });
   } catch (error) {
     console.error("Update error:", error);
     return NextResponse.json({ error: "Failed to update topic", details: error.message }, { status: 500 });
   }
 }
 
 //  GET - Fetch topic by ID
 export async function GET (request, context ) {
  // const { params } = context;
  //    const { id } = params;
  const { id } = context.params;
   try {
     await connectMongoDB();
 
     const topic = await Topic.findById(id);
 
     if (!topic) {
       return NextResponse.json({ error: "Topic not found" }, { status: 404 });
     }
 
     return NextResponse.json({ topic }, { status: 200 });
   } catch (error) {
     console.error("Fetch error:", error);
     return NextResponse.json({ error: "Failed to fetch topic", details: error.message }, { status: 500 });
   }
 }

 //  DELETE - Delete topic by ID
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await connectMongoDB();

    const deletedTopic = await Topic.findByIdAndDelete(id);

    if (!deletedTopic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete topic", details: error.message }, { status: 500 });
  }
}
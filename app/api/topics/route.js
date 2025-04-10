import { NextResponse } from "next/server";
 import connectMongoDB from "../../../app/editTopic/[id]/libs/mongodb";
 import Topic from "../../../app/editTopic/[id]/libs/models/topic";
 import cloudinary from "../../editTopic/[id]/libs/cloudinary";
 
 // Helper function to upload file to Cloudinary
 async function uploadToCloudinary(file) {
   const arrayBuffer = await file.arrayBuffer();
   const buffer = Buffer.from(arrayBuffer);
 
   const result = await new Promise((resolve, reject) => {
     cloudinary.uploader.upload_stream({ folder: "client_invoices" }, (error, result) => {
       if (error) return reject(error);
       resolve(result);
     }).end(buffer);
   });
 
   return result.secure_url;
 }
 
 // ✅ POST - Create Topic with Cloudinary uploads
 export async function POST(req) {
   try {
     await connectMongoDB();
 
     const formData = await req.formData();
     const projectname = formData.get("projectname");
 
     if (!projectname) {
       return NextResponse.json({ error: "Project Name is required" }, { status: 400 });
     }
 
     // Upload all invoices to Cloudinary
     const clientInvoices = formData.getAll("clientinvoices");
     const uploadedUrls = [];
 
     for (const file of clientInvoices) {
       if (file && typeof file === "object") {
         const url = await uploadToCloudinary(file);
         uploadedUrls.push(url);
       }
     }
 
     const topic = await Topic.create({
       projectname,
       websitelink: formData.get("websitelink"),
       technology: formData.get("technology"),
       description: formData.get("description"),
       pagebuilder: formData.get("pagebuilder"),
       clientname: formData.get("clientname"),
       bidplatform: formData.get("bidplatform"),
       bidplatformURL: formData.get("bidplatformURL"),
       invoiceamount: formData.get("invoiceamount"),
       projectstartdate: formData.get("projectstartdate"),
       completiondate: formData.get("completiondate"),
       testimonials: formData.get("testimonials"),
       clientinvoices: uploadedUrls, // Cloudinary URLs
     });
 
     return NextResponse.json({ message: "Topic Created", topic }, { status: 201 });
   } catch (error) {
     console.error("API Error:", error);
     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
   }
 }
 
 // ✅ GET - Get all topics
 export async function GET() {
   try {
     await connectMongoDB();
     const topics = await Topic.find();
     return NextResponse.json({ topics }, { status: 200 });
   } catch (error) {
     return NextResponse.json({ message: "Server error", error }, { status: 500 });
   }
 }
 
 // ✅ DELETE - Delete topic
 export async function DELETE(req) {
   try {
     await connectMongoDB();
     const id = req.nextUrl.searchParams.get("id");
 
     if (!id) {
       return NextResponse.json({ message: "Missing project ID" }, { status: 400 });
     }
 
     await Topic.findByIdAndDelete(id);
     return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
   } catch (error) {
     return NextResponse.json({ message: "Server error", error }, { status: 500 });
   }
 }
 
 // ✅ PUT - Update topic
 export async function PUT(req) {
   try {
     await connectMongoDB();
     const id = req.nextUrl.searchParams.get("id");
     const updatedData = await req.json();
 
     if (!id) {
       return NextResponse.json({ message: "Missing project ID" }, { status: 400 });
     }
 
     const updatedTopic = await Topic.findByIdAndUpdate(id, updatedData, { new: true });
 
     if (!updatedTopic) {
       return NextResponse.json({ message: "Topic not found" }, { status: 404 });
     }
 
     return NextResponse.json({ message: "Topic Updated", topic: updatedTopic }, { status: 200 });
   } catch (error) {
     return NextResponse.json({ message: "Error updating project", error }, { status: 500 });
   }
 }
 
 
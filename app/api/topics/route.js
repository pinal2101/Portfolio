import { NextResponse } from "next/server";
import connectMongoDB from "../../../app/editTopic/[id]/libs/mongodb";
import Topic from "../../../app/editTopic/[id]/libs/models/topic";
import multer from "multer";
import { writeFile } from "fs/promises";
import path from "path";

// Configure Multer for file uploads
const upload = multer({ dest: "public/uploads/" });

export async function POST(req) {
  try {
    await connectMongoDB();

    const formData = await req.formData();
    const projectname = formData.get("projectname");

    if (!projectname) {
      return NextResponse.json({ error: "Project Name is required" }, { status: 400 });
    }

    // Handle file uploads
    const clientInvoices = formData.getAll("clientinvoices");
    const savedFiles = [];

    for (const file of clientInvoices) {
      const filePath = path.join(process.cwd(), "public/uploads", file.name);
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      await writeFile(filePath, fileBuffer);
      savedFiles.push(`/uploads/${file.name}`);
    }

    // Store data in MongoDB
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
      clientinvoices: savedFiles, // Save file paths in DB
    });

    return NextResponse.json({ message: "Topic Created", topic }, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ GET Request - Fetch all topics
export async function GET() {
  try {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({ topics }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}

// ✅ DELETE Request - Remove a topic
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

// ✅ PUT Request - Update a topic
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





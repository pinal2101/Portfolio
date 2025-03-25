import Topic from "@/app/editTopic/[id]/libs/models/topic";
import connectMongoDB from "@/app/editTopic/[id]/libs/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { projectname, websitelink, technology, description, pagebuilder, clientname, clientinvoices, bidplatform, bidplatformURL, invoiceamount, projectstartdate, completiondate, testimonials } = await request.json();

    await connectMongoDB();
    await Topic.create({ projectname, websitelink, technology, description, pagebuilder, clientname, clientinvoices, bidplatform, bidplatformURL, invoiceamount, projectstartdate, completiondate, testimonials });
    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

export async function GET(request) {  
    await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id"); // Get 'id' from query parameters

    try {
        if (id) {
            const topic = await Topic.findById(id);
            if (!topic) {
                return NextResponse.json({ message: "Topic not found" }, { status: 404 });
            }
            return NextResponse.json(topic, { status: 200 });
        } else {
            const topics = await Topic.find();
            return NextResponse.json({ topics }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Server error", error }, { status: 500 });
    }
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}

export async function PUT(request) {
  await connectMongoDB();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id"); // Get 'id' from query parameters
  const updatedData = await request.json(); // Parse request body

  if (!id) {
      return NextResponse.json({ message: "Missing project ID" }, { status: 400 });
  }

  try {
      const updatedTopic = await Topic.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

      if (!updatedTopic) {
          return NextResponse.json({ message: "Topic not found" }, { status: 404 });
      }

      return NextResponse.json({ message: "Topic Updated", topic: updatedTopic }, { status: 200 });
  } catch (error) {
      return NextResponse.json({ message: "Error updating project", error }, { status: 500 });
  }
}






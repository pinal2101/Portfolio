import { NextResponse } from "next/server";
import connectMongoDB from "../../../editTopic/[id]/libs/mongodb";
import Topic from "../../../editTopic/[id]/libs/models/topic";

// GET - Fetch all projects
export async function GET() {
  await connectMongoDB();
  const projects = await Topic.find();
  return NextResponse.json({ projects }, { status: 200 });
}

// POST - Create a new project
export async function POST(request) {
  const body = await request.json();
  await connectMongoDB();
  const newProject = await Project.create(body);
  return NextResponse.json({ message: "Project created", project: newProject }, { status: 201 });
}

// PUT - Update a project by ID (passed in body)
export async function PUT(request) {
  const { _id, ...rest } = await request.json();
  await connectMongoDB();
  const updated = await Project.findByIdAndUpdate(_id, rest, { new: true });
  return NextResponse.json({ message: "Project updated", project: updated }, { status: 200 });
}

// DELETE - Delete a project by ID (passed as query param)
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await connectMongoDB();
  await Project.findByIdAndDelete(id);
  return NextResponse.json({ message: "Project deleted" }, { status: 200 });
}

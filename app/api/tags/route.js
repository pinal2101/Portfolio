import { NextResponse } from "next/server";
import { connectMongoDB } from '../../libs/mongodb';
import Tag from "../../libs/models/tag"; // Use capital 'Tag' for model name

// GET all tags
export async function GET() {
  try {
    await connectMongoDB();
    const tags = await Tag.find();
    return NextResponse.json(tags);
  } catch (error) {
    console.error("GET /api/tags error:", error);
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
  }
}

// POST a new tag
export async function POST(req) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Tag name is required" }, { status: 400 });
    }

    await connectMongoDB();
    const newTag = await Tag.create({ name });
    return NextResponse.json(newTag, { status: 201 });
  } catch (error) {
    console.error("POST /api/tags error:", error);
    return NextResponse.json({ error: "Failed to create tag" }, { status: 500 });
  }
}

// PUT (update a tag)
export async function PUT(req) {
  try {
    const { id, name } = await req.json();
    if (!id || !name) {
      return NextResponse.json({ error: "Missing id or name" }, { status: 400 });
    }

    await connectMongoDB();
    const updatedTag = await Tag.findByIdAndUpdate(id, { name }, { new: true });
    return NextResponse.json(updatedTag);
  } catch (error) {
    console.error("PUT /api/tags error:", error);
    return NextResponse.json({ error: "Failed to update tag" }, { status: 500 });
  }
}

// DELETE a tag
export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Tag ID required" }, { status: 400 });
    }

    await connectMongoDB();
    await Tag.findByIdAndDelete(id);
    return NextResponse.json({ message: "Tag deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/tags error:", error);
    return NextResponse.json({ error: "Failed to delete tag" }, { status: 500 });
  }
}

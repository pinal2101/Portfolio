import { NextResponse } from "next/server";
import connectMongoDB from "../../editTopic/[id]/libs/mongodb";
 import Topic from "../../../editTopic/[id]/libs/models/topic"; // or correct path to your Topic model

export async function POST(request) {
  try {
    await connectMongoDB();
    const data = await request.json(); // expecting array of project objects

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: "Invalid data format. Expected an array." },
        { status: 400 }
      );
    }

    const inserted = await Topic.insertMany(data); // Assuming 'Topic' model
    return NextResponse.json(
      { message: "Data imported successfully", inserted },
      { status: 201 }
    );

  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json(
      { error: "Failed to import data", details: error.message },
      { status: 500 }
    );
  }
}

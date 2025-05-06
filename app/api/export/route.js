import { NextResponse } from "next/server";
import { connectMongoDB } from '../../libs/mongodb';
import Topic from '../../libs/models/topic';

// GET - Export data as JSON
export async function GET() {
  try {
    await connectMongoDB();
    const projects = await Project.find({});

    return new Response(JSON.stringify(projects, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": "attachment; filename=portfolio-export.json",
      },
    });

  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Failed to export data", details: error.message }, { status: 500 });
  }
}

import connectDB from "../../editTopic/[id]/libs/mongodb";
import Technology from "../../editTopic/[id]/libs/models/technology";

export async function GET() {
  await connectDB();
  const techs = await Technology.find();
  return Response.json(techs);
}

export async function POST(req) {
  await connectDB();
  const { name } = await req.json();
  const newTech = await Technology.create({ name });
  return Response.json(newTech);
}

export async function PUT(req) {
  await connectDB();
  const { id, name } = await req.json();
  const updated = await Technology.findByIdAndUpdate(id, { name }, { new: true });
  return Response.json(updated);
}

export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  await Technology.findByIdAndDelete(id);
  return new Response('Technology deleted', { status: 200 });
}

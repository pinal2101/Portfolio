import { connectDB } from '../../libs/mongodb';
import Category from "../../editTopic/[id]/libs/models/category";

export async function GET() {
  await connectDB();
  const categories = await Category.find();
  return Response.json(categories);
}

export async function POST(req) {
  await connectDB();
  const { name } = await req.json();
  const newCategory = await Category.create({ name });
  return Response.json(newCategory);
}

export async function PUT(req) {
  await connectDB();
  const { id, name } = await req.json();
  const updated = await Category.findByIdAndUpdate(id, { name }, { new: true });
  return Response.json(updated);
}

export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  await Category.findByIdAndDelete(id);
  return new Response('Category deleted', { status: 200 });
}

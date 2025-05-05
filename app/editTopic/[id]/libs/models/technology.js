import mongoose from "mongoose";

const technologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
}, { timestamps: true });

export default mongoose.models.Technology || mongoose.model("Technology", technologySchema);

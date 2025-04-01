import mongoose from "mongoose";
//import bcrypt from "bcrypt";
const TopicSchema = new mongoose.Schema({
  // name: { type: String, required: true },
  // username: { type: String, required: true, unique: true },
  // password: { type: String, required: true },

  projectname: String,
  websitelink: String,
  technology: String,
  description: String,
  pagebuilder: String,
  clientname: String,
  clientinvoices: [String], // Store file paths
  bidplatform: String,
  bidplatformURL: String,
  invoiceamount: Number,
  projectstartdate: Date,
  completiondate: Date,
  testimonials: String,
});

const Topic = mongoose.models.Topic || mongoose.model("Topic", TopicSchema);
export default Topic;

// import mongoose from "mongoose";

// const TopicSchema = new mongoose.Schema({
//   projectname: { type: String, required: true },
//   websitelink: { type: String, required: true },
//   technology: { type: [String], required: true },
//   description: { type: String, required: true },
//   pagebuilder: { type: [String], required: true },
//   clientname: { type: String, required: true },
//   bidplatform: { type: String, required: true },
//   bidplatformURL: { type: String, required: true },
//   invoiceamount: { type: Number, required: true },
//   projectstartdate: { type: Date, required: true },
//   completiondate: { type: Date, required: true },
//   testimonials: { type: String, required: false },

//   // 🔹 FIX: Make `name`, `username`, `password` optional (if not needed)
//   name: { type: String, required: false },
//   username: { type: String, required: false },
//   password: { type: String, required: false },
// });

// const Topic = mongoose.models.Topic || mongoose.model("Topic", TopicSchema);
// export default Topic;

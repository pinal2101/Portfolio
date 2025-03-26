// import mongoose from "mongoose";

// const TopicSchema = new mongoose.Schema({
//   projectname: { type: String, required: true },
//   websitelink: { type: String },
//   technology: { type: String },
//   description: { type: String },
//   pagebuilder: { type: String },
//   clientname: { type: String },
//   clientinvoices: { type: [String] }, // ✅ Changed from String to Array of Strings
//   bidplatform: { type: String },
//   bidplatformURL: { type: String },
//   invoiceamount: { type: Number },
//   projectstartdate: { type: Date },
//   completiondate: { type: Date },
//   testimonials: { type: String },
// }, { timestamps: true });

// const Topic = mongoose.models.Topic || mongoose.model("Topic", TopicSchema);

// export default Topic;


import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
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
